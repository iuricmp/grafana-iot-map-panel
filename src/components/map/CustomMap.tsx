import * as React from 'react';
import ReactMapGL, { NavigationControl, Popup, ViewportProps } from 'react-map-gl';
import Markers from './Markers';
import VehicleInfo from './CustomMarkerPopupInfo';
import { CustomMarkerProp } from './CustomMarkerProp';
import { stylesFactory } from '@grafana/ui';
import { css } from 'emotion';

interface Props {
  token: string;
  styleUrl: string;
  width: number;
  height: number;
  vpDefined: boolean;
  vpLat: number;
  vpLng: number;
  vpZoom: number;
  data: CustomMarkerProp[];
}

const fixValue = (value: any): number => Number(parseFloat(value).toFixed(7));

export const TmsMap: React.FC<Props> = props => {
  const styles = getStyles();
  const { token, styleUrl, width, height, vpDefined, vpLat, vpLng, vpZoom, data } = props;

  const [viewport, setViewport] = React.useState<ViewportProps>({
    width,
    height,
    latitude: fixValue(vpLat),
    longitude: fixValue(vpLng),
    zoom: Number(vpZoom),
  });

  React.useEffect(
    () =>
      setViewport({
        ...viewport,
        latitude: fixValue(vpLat),
        longitude: fixValue(vpLng),
        zoom: Number(vpZoom),
        width,
        height,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [width, height, vpLat, vpLng, vpZoom]
  );

  const [popupInfo, setPopupInfo] = React.useState<CustomMarkerProp | null>(null);

  return (
    <ReactMapGL
      {...viewport}
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
