[![Node.js CI](https://github.com/iuricmp/grafana-iot-map-panel/actions/workflows/node.js.yml/badge.svg)](https://github.com/iuricmp/grafana-iot-map-panel/actions/workflows/node.js.yml)

# Grafana IOT Map Panel

A panel for Grafana that visualizes IOT GPS points on an interactive map.

![sample](./docs/map-sample.gif)

![sample](./docs/popup.png)

## Prerequisites

- MapBox Key and Style. Both can be found in [https://studio.mapbox.com](https://studio.mapbox.com)

- Query: CSV or Table query, eg:

|latitude   |longitude   |datetime            | label  |
|-----------|------------|--------------------|--------|
|-22.945548 |-43.0601787 |2018-04-13T08:30:06Z|TRAINING|
|-22.9621505|-42.9904898 |2021-03-31T18:28:22Z|TRKU2C97|
|-22.974022 |-43.0347287 |2021-03-29T09:23:13Z|VJE0c78 |
|-22.971599 |-42.9436037 |2021-02-23T14:23:31Z|OPIX4A49|

## Development

### What is Grafana Panel Plugin?

Panels are the building blocks of Grafana. They allow you to visualize data in different ways. While Grafana has several types of panels already built-in, you can also build your own panel, to add support for other visualizations.

For more information about panels, refer to the documentation on [Panels](https://grafana.com/docs/grafana/latest/features/panels/panels/)

To compile the plugin you need:

- Grafana >=7.0
- NodeJS >=14
- yarn

### Getting started for developers

1. Install dependencies

   ```bash
   yarn install
   ```

2. Build plugin in development mode or run in watch mode

   ```bash
   yarn dev
   ```

   or (most recomended when developing)

   ```bash
   yarn watch
   ```

3. Build plugin in production mode

   ```bash
   yarn build
   ```

4. Run Docker

   ```bash
   docker-compose up --build
   ```

   [http://localhost:3000](http://localhost:3000)

   User: `admin` Password: `admin`

### Sample Data

- CSV:
  - <https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv>
  - <https://raw.githubusercontent.com/iuricmp/grafana-iot-map-panel/master/sample-data.csv>

### Learn more

- [Build a panel plugin tutorial](https://grafana.com/tutorials/build-a-panel-plugin)
- [Grafana documentation](https://grafana.com/docs/)
- [Grafana Tutorials](https://grafana.com/tutorials/) - Grafana Tutorials are step-by-step guides that help you make the most of Grafana
- [Grafana UI Library](https://developers.grafana.com/ui) - UI components to help you build interfaces using Grafana Design System

#### Inspirations

- <https://github.com/woutervh-/grafana-mapbox>
- <https://github.com/zackhsi/react-map-gl-typescript/blob/master/src/components/Map/index.tsx>
- <https://grafana.csselectronics.stellarhosted.com/d/hXdWa0VMk/css-playground?orgId=1&from=1612275590939&to=1612276723716>
- <https://www.csselectronics.com/screen/page/telematics-dashboard-open-source/language/en#void>
- <https://docs.mapbox.com/help/glossary/style-url/>
