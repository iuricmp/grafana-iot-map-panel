import * as React from 'react';
import ReactMapGL, { NavigationControl, Popup, ViewportProps, WebMercatorViewport } from 'react-map-gl';
import Markers from './Markers';
import VehicleInfo from './CustomMarkerPopupInfo';
import { CustomMarkerProp } from './CustomMarkerProp';
import { stylesFactory } from '@grafana/ui';
import { css } from 'emotion';
import { getBounds } from './mapUtils';

interface Props {
  token: string;
  styleUrl: string;
  width: number;
  height: number;
  vpFitBounds: boolean;
  vpLat: number;
  vpLng: number;
  vpZoom: number;
  data: CustomMarkerProp[];
}

const getInitialValues = (fitBounds: boolean, markers: CustomMarkerProp[], width: number, height: number, lat: number, lng: number, zoomDefault: number) => {
  if (fitBounds && markers.length > 0) {
    const markerBounds = getBounds(markers);
    const { longitude, latitude, zoom } = new WebMercatorViewport({ width, height }).fitBounds(markerBounds, { padding: 40 });
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

  const [popupInfo, setPopupInfo] = React.useState<CustomMarkerProp | null>(null);

  return (
    <ReactMapGL
      {...viewport}
      // visibilityConstraints={MARKERS_BOUNDS}
      mapStyle={styleUrl}
      mapboxApiAccessToken={token}
      onViewportChange={(nextViewport: ViewportProps) => setViewport(nextViewport)}
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
      <Markers data={data} onClick={setPopupInfo} />
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
