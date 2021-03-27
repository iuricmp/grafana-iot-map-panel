import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { TmsMap } from './components/map/TmsMap';
import './style.css'
import { CustomMarkerProp } from 'components/map/CustomMarkerProp';

interface Props extends PanelProps<SimpleOptions> { }

export const SimplePanel: React.FC<Props> = ({ options, data = [], width, height }) => {
  const styles = getStyles();

  const testData: Array<CustomMarkerProp> = [
    { label: 'VHE0101', latitude: 37.777912, longitude: -122.4172949, datetime: '2021-03-27 09:27:02' },
    { label: 'MAI9383', latitude: 37.776021, longitude: -122.4171949, datetime: '2020-11-23 13:27:02' },
  ]

  if (!options.mapboxToken) return <h3>A valid API access token is required to use Mapbox data</h3>

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
      <TmsMap
        vpDefined={options.vpDefined}
        vpLat={options.vpLat}
        vpLng={options.vpLng}
        vpZoom={options.vpZoom}
        token={options.mapboxToken}
        styleUrl={options.mapboxStyleUrl}
        width={width}
        height={height}
        data={testData} />
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
