export default class CSVRecord {
  label: string;
  latitude: number;
  longitude: number;
  datetime: Date;

  constructor(lat: number, lng: number, dt: string, label: string) {
    this.latitude = lat;
    this.longitude = lng;
    this.datetime = new Date(dt);
    this.label = label;
  }
}
