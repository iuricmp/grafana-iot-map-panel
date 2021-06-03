import * as React from 'react';
import ReactMapGL, { Layer, LinearInterpolator, MapRef, NavigationControl, Popup, Source, ViewportProps, WebMercatorViewport } from 'react-map-gl';
import VehicleInfo from './CustomMarkerPopupInfo';
import DataMapProp from '../../model/DataMapProp';
import { stylesFactory } from '@grafana/ui';
import { css } from 'emotion';
import { getBounds } from '../../utils/mapUtils';
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from './layers';
import { FeatureCollection } from 'geojson';
import vehicleIcon from './vehicle.png';

interface Props {
  token: string;
  styleUrl: string;
  width: number;
  height: number;
  vpFitBounds: boolean;
  vpLat: number;
  vpLng: number;
  vpZoom: number;
  data: FeatureCollection;
}

const getInitialValues = (fitBounds: boolean, featureCol: FeatureCollection, width: number, height: number, lat: number, lng: number, zoomDefault: number) => {
  if (fitBounds && featureCol) {
    const markerBounds = getBounds(featureCol);
    const { longitude, latitude, zoom } = new WebMercatorViewport({ width, height }).fitBounds(markerBounds, { padding: 60 });
    return { longitude, latitude, zoom };
  } else {
    return { longitude: Number(lat), latitude: Number(lng), zoom: Number(zoomDefault) };
  }
};

export const CustomMap: React.FC<Props> = props => {
  const styles = getStyles();
  const { token, styleUrl, width, height, vpLat, vpLng, vpZoom, data, vpFitBounds } = props;
  const { longitude, latitude, zoom } = getInitialValues(vpFitBounds, data, width, height, vpLat, vpLng, vpZoom);
  const [viewport, setViewport] = React.useState<ViewportProps>({ width, height, latitude, longitude, zoom });
  const [imagesLoaded, setImagesLoaded] = React.useState(false);
  const mapRef = React.useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = React.useState<DataMapProp | null>(null);

  const getMap = () => mapRef?.current?.getMap();

  React.useEffect(() => {
    const map = getMap();
    if (map) {
      map.on('load', function () {
        map.loadImage(vehicleIcon, function (error: any, image: any) {
          if (error) {
            throw error;
          }
          map.addImage('vehicle', image);
          setImagesLoaded(true);
        });
      });
    }
  }, [mapRef]);

  React.useEffect(
    () =>
      setViewport({
        ...viewport,
        longitude,
        latitude,
        zoom,
        width,
        height,
      }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [width, height, zoom, longitude, latitude]
  );

  const onClick = (event: any) => {
    if (!event || !event.features) {
      return;
    }
    const feature = event.features[0];
    const clusterId = feature.properties.cluster_id;
    console.log('event', event);
    console.log('event 2', { ...feature.properties });
    console.log('feature', feature);
    console.log('clusterId', clusterId);

    if (feature.layer.id === 'unclustered-point') {
      //setPopupInfo(toDataMapProp(feature));
    } else {
      expansionZoom(clusterId, feature);
    }
  };

  const expansionZoom = (clusterId: string, feature: any) => {
    const map = getMap();
    if (!map) {
      return;
    }
    const mapboxSource = map.getSource('earthquakes');

    mapboxSource.getClusterExpansionZoom(clusterId, (err: Error, zoom: number) => {
      if (err || !zoom) {
        return;
      }

      setViewport({
        ...viewport,
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        zoom,
        transitionDuration: 500,
      });
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      transitionInterpolator={new LinearInterpolator()}
      ref={mapRef}
      mapStyle={styleUrl}
      mapboxApiAccessToken={token}
      onViewportChange={(nextViewport: ViewportProps) => setViewport(nextViewport)}
      onClick={onClick}
    >
      {popupInfo && (
        <Popup
          className={styles.popup}
          tipSize={5}
          anchor={'top'}
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={setPopupInfo}
        >
          <VehicleInfo {...popupInfo} />
        </Popup>
      )}
      {imagesLoaded ? (
        <Source id="earthquakes" type="geojson" data={data} cluster={true} clusterMaxZoom={14} clusterRadius={50}>
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      ) : null}
      <NavigationControl style={{ position: 'absolute', right: 10, bottom: 50 }} />
    </ReactMapGL>
  );
};

const getStyles = stylesFactory(() => {
  return {
    popup: css`
      z-index: 20;
    `,
  };
});
