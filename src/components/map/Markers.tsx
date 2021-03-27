import * as React from 'react';
import { Marker } from 'react-map-gl';
import { Tooltip } from '@grafana/ui';
import { CustomMarkerProp } from './CustomMarkerProp';
import { dateTime } from '@grafana/data';

interface Props {
  data: Array<CustomMarkerProp>,
  onClick: Function
}

const formatTooltip = (item: CustomMarkerProp) => {
  return `${item.label} - ${dateTime(item.datetime).fromNow()}`;
};

// Important for perf: the markers never change, avoid rerender when the map viewport changes
function Markers(props: Props) {
  const { data, onClick } = props;

  return data.map((item, index) => (
    <Marker offsetLeft={-10} offsetTop={-20} key={`marker-${index}`} longitude={item.longitude} latitude={item.latitude}>
      <Tooltip content={formatTooltip(item)}>
        <i class="fa fa-truck" onClick={() => onClick(item)}></i>
      </Tooltip>
    </Marker>
  ));
}

export default React.memo(Markers);