/* eslint-disable jsx-quotes */
import * as React from 'react';
import { Marker } from 'react-map-gl';
import { Tooltip } from '@grafana/ui';
import DataMapProp from '../../model/DataMapProp';
import { dateTime } from '@grafana/data';

interface Props {
  data: DataMapProp[];
  onClick: Function;
}

const formatTooltip = (item: DataMapProp) => {
  return `${item.label} - ${dateTime(item.datetime).fromNow()}`;
};

// Important for perf: the markers never change, avoid rerender when the map viewport changes
// function Markers(props: Props) {
function Markers(props: Props): JSX.Element {
  const { data, onClick } = props;

  const mp = data.map((item, index) => (
    <Marker offsetLeft={-10} offsetTop={-20} key={`marker-${index}`} longitude={item.longitude} latitude={item.latitude}>
      <Tooltip content={formatTooltip(item)}>
        <i className="fa fa-truck" onClick={() => onClick(item)}></i>
      </Tooltip>
    </Marker>
  ));

  return <>{mp}</>;
}

export default React.memo(Markers);
