import { PanelPlugin } from '@grafana/data';
import PluginOptions from './model/pluginOptions';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<PluginOptions>(SimplePanel).setPanelOptions(builder => {
  return builder
    .addTextInput({
      path: 'mapboxStyleUrl',
      name: 'Style Url',
      description: 'A complete style URL, like mapbox://styles/mapbox/streets-v11',
      defaultValue: 'mapbox://styles/mapbox/dark-v10',
      category: ['Mapbox'],
    })
    .addTextInput({
      path: 'mapboxToken',
      name: 'Access Token',
      description: 'Your Mapbox access tokens are on your Mapbox Account page',
      defaultValue: 'pk.eyJ1IjoiaXVyaWNtcCIsImEiOiJjajc1OGhjYTEwZXRoMnhucmcxeWhvb3FoIn0.XIRpOfUltUn7YGoiboXTdw',
      category: ['Mapbox'],
    })
    .addBooleanSwitch({
      path: 'vpFitBounds',
      name: 'Fit Bounds',
      description: 'Automatically defines a viewport that fits around the provided markers.',
      defaultValue: true,
      category: ['Mapbox'],
    })
    .addTextInput({
      path: 'vpLat',
      name: 'Initial Default Latitude',
      defaultValue: '37.776021',
      category: ['Mapbox'],
      showIf: config => !config.vpFitBounds,
    })
    .addTextInput({
      path: 'vpLng',
      name: 'Initial Default Longitude',
      defaultValue: '-122.4171949',
      category: ['Mapbox'],
      showIf: config => !config.vpFitBounds,
    })
    .addTextInput({
      path: 'vpZoom',
      name: 'Initial Default Zoom',
      defaultValue: '14',
      category: ['Mapbox'],
      showIf: config => !config.vpFitBounds,
    });
});
