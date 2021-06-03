import DataMapProp from '../model/DataMapProp';
import * as geoJsonConverter from './geoJsonConverter';

const createRecord = (latitude: number, longitude: number, datetime: string, label: string): DataMapProp => {
  return {
    latitude,
    longitude,
    datetime,
    label,
  };
};

describe('GeoJson utility converter', () => {
  const CSV_RECORDS: DataMapProp[] = [
    createRecord(-22.945548, -43.0601787, '2018-04-13T08:30:06Z', 'TRAINING'),
    createRecord(-22.9621505, -42.9904898, '2021-03-31T18:28:22Z', 'TRKU2C97'),
    createRecord(-22.974022, -43.0347287, '2021-03-29T09:23:13Z', 'VJE0c78'),
    createRecord(-22.971599, -42.9436037, '2021-02-23T14:23:31Z', 'OPIX4A49'),
  ];

  const EXPECTED_FEATURE_COLLECTION = {
    type: 'FeatureCollection',
    features: [
      {
        geometry: { coordinates: [-43.0601787, -22.945548, 0], type: 'Point' },
        properties: { label: 'TRAINING', time: '2018-04-13T08:30:06Z' },
        type: 'Feature',
      },
      {
        geometry: { coordinates: [-42.9904898, -22.9621505, 0], type: 'Point' },
        properties: { label: 'TRKU2C97', time: '2021-03-31T18:28:22Z' },
        type: 'Feature',
      },
      {
        geometry: { coordinates: [-43.0347287, -22.974022, 0], type: 'Point' },
        properties: { label: 'VJE0c78', time: '2021-03-29T09:23:13Z' },
        type: 'Feature',
      },
      {
        geometry: { coordinates: [-42.9436037, -22.971599, 0], type: 'Point' },
        properties: { label: 'OPIX4A49', time: '2021-02-23T14:23:31Z' },
        type: 'Feature',
      },
    ],
  };

  it('should convert CSV records into GeoJson object', () => {
    const geoJson = geoJsonConverter.toGeoJson(CSV_RECORDS);
    expect(geoJson).toEqual(EXPECTED_FEATURE_COLLECTION);
  });
});
