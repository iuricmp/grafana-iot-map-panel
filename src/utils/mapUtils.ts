import { Feature, FeatureCollection, Point } from 'geojson';
import { maxBy, minBy } from 'lodash';

const enum LatOrLng {
  Lat = 'Lat',
  Lng = 'Lng',
}
const enum MinOrMax {
  Min = 'Min',
  Max = 'Max',
}

const getLatOrLng = (point: Point, latOrLng: LatOrLng): number => {
  const index = latOrLng === LatOrLng.Lng ? 0 : 1;
  return point.coordinates[index];
};

const getMinOrMaxFeature = (features: Feature[], minOrMax: MinOrMax, latOrLng: LatOrLng): Feature => {
  if (minOrMax === MinOrMax.Max) {
    return maxBy(features, value => getLatOrLng(value.geometry as Point, latOrLng)) as Feature;
  } else {
    return minBy(features, value => getLatOrLng(value.geometry as Point, latOrLng)) as Feature;
  }
};

const getMinOrMax = (features: Feature[], minOrMax: MinOrMax, latOrLng: LatOrLng): number => {
  const feature = getMinOrMaxFeature(features, minOrMax, latOrLng);
  return getLatOrLng(feature.geometry as Point, latOrLng);
};

export const getBounds = (collection: FeatureCollection): [[number, number], [number, number]] => {
  const features = collection.features;

  const maxLat = getMinOrMax(features, MinOrMax.Max, LatOrLng.Lat);
  const minLat = getMinOrMax(features, MinOrMax.Min, LatOrLng.Lat);
  const maxLng = getMinOrMax(features, MinOrMax.Max, LatOrLng.Lng);
  const minLng = getMinOrMax(features, MinOrMax.Min, LatOrLng.Lng);

  const southWest: [number, number] = [minLng, minLat];
  const northEast: [number, number] = [maxLng, maxLat];
  return [southWest, northEast];
};
