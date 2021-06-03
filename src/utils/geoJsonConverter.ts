import CustomMarkerProp from '../model/CustomMarkerProp';
import geojson from 'geojson';

export const toGeoJson = (data: CustomMarkerProp[]): geojson.FeatureCollection => {
  const features: geojson.Feature[] = data.map(item => {
    const feature: geojson.Feature = {
      type: 'Feature',
      properties: { time: `${item.datetime}`, label: item.label },
      geometry: { type: 'Point', coordinates: [item.longitude, item.latitude, 0.0] },
    };
    return feature;
  });

  const collection: geojson.FeatureCollection = {
    type: 'FeatureCollection',
    features,
  };

  return collection;
};
