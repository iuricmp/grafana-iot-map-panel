import React from 'react';
import { css, cx } from 'emotion';
import { PanelProps } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';
import PluginOptions from './model/pluginOptions';
import { CustomMap } from './components/map/CustomMap';
import { toDataProp } from './utils/grafanaDataConverter';
import { toGeoJson } from './utils/geoJsonConverter';
import CustomMarkerProp from 'model/CustomMarkerProp';

import './style.css';

interface Props extends PanelProps<PluginOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = getStyles();

  const mapboxData: CustomMarkerProp[] = toDataProp(data);
  const geoJsonFeatureCollection = toGeoJson(mapboxData);

  if (!options.mapboxToken) {
    return <h3>A valid API access token is required to use Mapbox data</h3>;
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <CustomMap
        vpFitBounds={options.vpFitBounds}
        vpLat={options.vpLat}
        vpLng={options.vpLng}
        vpZoom={options.vpZoom}
        token={options.mapboxToken}
        styleUrl={options.mapboxStyleUrl}
        width={width}
        height={height}
        data={geoJsonFeatureCollection}
      />
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
