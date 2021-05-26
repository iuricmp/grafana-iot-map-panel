// import CsvRecord from '../model/csvRecord';
import CustomMarkerProp from '../model/CustomMarkerProp';
// import { DateTime } from '@grafana/data';
import geojson from 'geojson';

/**
 * Convert a GeoJson Feature into a CustomMarkerProp
 * @param feature GeoJson Feature
 * eg: { "type": "Feature", "properties": { "id": "ak16991058", "mag": 2.6, "time": 1507317554328, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [ -146.3172, 63.6837, 3.7 ] } },
 * @returns CustomMarkerProp
 */
// export const toCustomMarkerProp = (feature: any): CustomMarkerProp => {
//   const label = feature.properties.id;
//   const latitude = feature.geometry.coordinates[1];
//   const longitude = feature.geometry.coordinates[0];
//   const datetime = new Date(feature.properties.time);

//   return {
//     label,
//     latitude,
//     longitude,
//     datetime,
//   };
// };

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
