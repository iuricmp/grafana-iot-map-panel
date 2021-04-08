import { maxBy, minBy } from 'lodash';
import { CustomMarkerProp } from './CustomMarkerProp';

const getMinOrMax = (markers: CustomMarkerProp[], minOrMax: 'max' | 'min', latOrLng: 'latitude' | 'longitude'): number => {
  if (minOrMax === 'max') {
    return (maxBy(markers, value => value[latOrLng]) as any)[latOrLng];
  } else {
    return (minBy(markers, value => value[latOrLng]) as any)[latOrLng];
  }
};

export const getBounds = (markers: CustomMarkerProp[]): [[number, number], [number, number]] => {
  const maxLat = getMinOrMax(markers, 'max', 'latitude');
  const minLat = getMinOrMax(markers, 'min', 'latitude');
  const maxLng = getMinOrMax(markers, 'max', 'longitude');
  const minLng = getMinOrMax(markers, 'min', 'longitude');

  const southWest: [number, number] = [minLng, minLat];
  const northEast: [number, number] = [maxLng, maxLat];
  return [southWest, northEast];
};
