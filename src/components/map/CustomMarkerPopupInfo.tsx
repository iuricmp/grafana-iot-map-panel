import { Card, TagList } from '@grafana/ui';
import React from 'react';
import { CustomMarkerProp } from './CustomMarkerProp';
import { dateTime } from '@grafana/data';

export default function CustomMarkerPopupInfo(props: CustomMarkerProp) {
  const { label, latitude, longitude, datetime: dt } = props;
  return (
    <Card heading={label}>
      <Card.Tags>
        <TagList tags={[`${dateTime(dt).fromNow()}`]} />
      </Card.Tags>
      <Card.Meta>
        {`Datetime: ${dt}`}
        {`Latitude: ${latitude}`}
        {`Longitude: ${longitude}`}
      </Card.Meta>
      ∆
    </Card>
  );
}
