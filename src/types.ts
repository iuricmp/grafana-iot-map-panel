type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions {
  text: string;
  mapboxToken: string;
  mapboxStyleUrl: string;
  vpDefined: boolean;
  vpLat: number;
  vpLng: number;
  vpZoom: number;
  seriesCountSize: SeriesSize;
}
