type SeriesSize = 'sm' | 'md' | 'lg';

export default interface PluginOptions {
  text: string;
  mapboxToken: string;
  mapboxStyleUrl: string;
  vpFitBounds: boolean;
  vpLat: number;
  vpLng: number;
  vpZoom: number;
  seriesCountSize: SeriesSize;
}
