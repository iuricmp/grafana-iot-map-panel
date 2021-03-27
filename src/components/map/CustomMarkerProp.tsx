import { DateTime } from '@grafana/data';

export interface CustomMarkerProp {
  label: string;
  latitude: number;
  longitude: number;
  datetime: DateTime;
}
