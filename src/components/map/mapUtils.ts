import { maxBy, minBy } from 'lodash';
import { CustomMarkerProp } from './CustomMarkerProp';

const getMinOrMax = (markers: CustomMarkerProp[], minOrMax: 'max' | 'min', latOrLng: 'latitude' | 'longitude') => {
  if (minOrMax === 'max') {
    return (maxBy(markers, value => value[latOrLng]) as any)[latOrLng];
  } else {
    return (minBy(markers, value => value[latOrLng]) as any)[latOrLng];
  }
};

export const getBounds = (markers: CustomMarkerProp[]) => {
  const maxLat = getMinOrMax(markers, 'max', 'latitude');
  const minLat = getMinOrMax(markers, 'min', 'latitude');
  const maxLng = getMinOrMax(markers, 'max', 'longitude');
  const minLng = getMinOrMax(markers, 'min', 'longitude');

  const southWest = [minLng, minLat];
  const northEast = [maxLng, maxLat];
  return [southWest, northEast];
};
