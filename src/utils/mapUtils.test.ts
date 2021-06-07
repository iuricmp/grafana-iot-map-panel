import { FeatureCollection } from 'geojson';
import { getBounds } from './mapUtils';

const EMPTY_FEATURES: FeatureCollection = {
  type: 'FeatureCollection',
  features: [],
};

const FEATURE_COLLECTION: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { id: 'ak16994521', mag: 2.3, time: 1507425650893, felt: null, tsunami: 0 },
      geometry: { type: 'Point', coordinates: [-151.5129, 63.1016, 0.0] },
    },
    {
      type: 'Feature',
      properties: { id: 'ak16994519', mag: 1.7, time: 1507425289659, felt: null, tsunami: 0 },
      geometry: { type: 'Point', coordinates: [-150.4048, 63.1224, 105.5] },
    },
    {
      type: 'Feature',
      properties: { id: 'ak16994517', mag: 1.6, time: 1507424832518, felt: null, tsunami: 0 },
      geometry: { type: 'Point', coordinates: [-151.3597, 63.0781, 0.0] },
    },
    {
      type: 'Feature',
      properties: { id: 'ci38021336', mag: 1.42, time: 1507423898710, felt: null, tsunami: 0 },
      geometry: { type: 'Point', coordinates: [-118.497, 34.299667, 7.64] },
    },
    {
      type: 'Feature',
      properties: { id: 'us2000b2nn', mag: 4.2, time: 1507422626990, felt: null, tsunami: 0 },
      geometry: { type: 'Point', coordinates: [-87.6901, 12.0623, 46.41] },
    },
  ],
};

describe('Given a GeoJson Feature Collection containing Points', () => {
  it('should extract its bounds', () => {
    const bounds = getBounds(FEATURE_COLLECTION);
    expect(bounds).not.toBeNull();
    expect(bounds).toEqual([
      [-151.5129, 12.0623],
      [-87.6901, 63.1224],
    ]);
  });
  it('should returns default values for empty Features entry', () => {
    const bounds = getBounds(EMPTY_FEATURES);
    expect(bounds).not.toBeNull();
    expect(bounds).toEqual([
      [-151.5000, 12.0000],
      [-87.6000, 63.1000],
    ]);
  });
});
