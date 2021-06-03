import { toDataProp } from './grafanaDataConverter';

const grafanaSeries = [
  {
    fields: [
      {
        name: 'latitude',
        type: 'string',
        values: {
          toArray: () => ['-22.945548', '-22.9621505', '-22.974022', '-22.971599'],
        },
      },
      {
        name: 'longitude',
        type: 'string',
        values: { toArray: () => ['-43.0601787', '-42.9904898', '-43.0347287', '-42.9436037'] },
      },
      {
        name: 'datetime',
        type: 'string',
        values: { toArray: () => ['2018-04-13T08:30:06Z', '2021-03-31T18:28:22Z', '2021-03-29T09:23:13Z', '2021-02-23T14:23:31Z'] },
      },
      {
        name: 'label',
        type: 'string',
        values: { toArray: () => ['TRAINING', 'TRKU2C97', 'VJE0c78', 'OPIX4A49'] },
      },
    ],
    length: 4,
    refId: 'A',
    name: 'sample-data.csv',
  },
];

describe('Given a grafana data', () => {
  const panelData = {
    series: grafanaSeries,
  };

  it('should convert it to a human format', () => {
    // @ts-ignore
    const humanFormat = toDataProp(panelData);
    expect(humanFormat).toMatchObject([
      { datetime: '2018-04-13T08:30:06Z', label: 'TRAINING', latitude: -22.945548, longitude: -43.0601787 },
      { datetime: '2021-03-31T18:28:22Z', label: 'TRKU2C97', latitude: -22.9621505, longitude: -42.9904898 },
      { datetime: '2021-03-29T09:23:13Z', label: 'VJE0c78', latitude: -22.974022, longitude: -43.0347287 },
      { datetime: '2021-02-23T14:23:31Z', label: 'OPIX4A49', latitude: -22.971599, longitude: -42.9436037 },
    ]);
  });
});
