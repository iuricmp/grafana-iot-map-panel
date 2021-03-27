import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  return builder
    .addTextInput({
      path: 'mapboxStyleUrl',
      name: 'Mapbox Style Url',
      description: 'A complete style URL, like mapbox://styles/mapbox/streets-v11',
      defaultValue: 'mapbox://styles/mapbox/dark-v10',
    })
    .addTextInput({
      path: 'mapboxToken',
      name: 'Mapbox Access token',
      description: 'Your Mapbox access tokens are on your Mapbox Account page',
      defaultValue: '',
    })
    .addBooleanSwitch({
      path: 'vpDefined',
      name: 'Set initial location',
      defaultValue: true,
    })
    .addTextInput({
      path: 'vpLat',
      name: 'Initial Default Latitude',
      defaultValue: '37.776021',
      showIf: config => config.vpDefined
    })
    .addTextInput({
      path: 'vpLng',
      name: 'Initial Default Longitude',
      defaultValue: '-122.4171949',
      showIf: config => config.vpDefined
    })
    .addTextInput({
      path: 'vpZoom',
      name: 'Initial Default Zoom',
      defaultValue: '14',
      showIf: config => config.vpDefined
    })
    .addRadio({
      path: 'seriesCountSize',
      defaultValue: 'sm',
      name: 'Series counter size',
      settings: {
        options: [
          {
            value: 'sm',
            label: 'Small',
          },
          {
            value: 'md',
            label: 'Medium',
          },
          {
            value: 'lg',
            label: 'Large',
          },
        ],
      },//showSeriesCount
      showIf: config => config.vpDefined, 
    });
});
