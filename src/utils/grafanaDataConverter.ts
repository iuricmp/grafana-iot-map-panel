import { PanelData, DataFrame } from '@grafana/data';
import CustomMarkerProp from '../model/CustomMarkerProp';

export const toDataProp = (data: PanelData): CustomMarkerProp[] => {
  if (!data || data.series.length <= 0) {
    return [];
  }
  const series: DataFrame = data.series[0];
  const length = series.length;

  const latField = series.fields.find(field => field.name === 'latitude');
  const lngField = series.fields.find(field => field.name === 'longitude');
  const labelField = series.fields.find(field => field.name === 'label');
  const datetimeField = series.fields.find(field => field.name === 'datetime');

  if (!latField || !lngField || !labelField || !datetimeField) {
    return [];
  }

  const latValues = latField.values.toArray();
  const lngValues = lngField.values.toArray();
  const labelValues = labelField.values.toArray();
  const dateValues = datetimeField.values.toArray();

  const markers: CustomMarkerProp[] = [];

  for (let index = 0; index < length; index++) {
    markers.push({
      label: labelValues[index],
      latitude: +latValues[index],
      longitude: +lngValues[index],
      datetime: dateValues[index],
    });
  }
  return markers;
};
