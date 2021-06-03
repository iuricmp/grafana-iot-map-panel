import React from 'react';
import DataMapProp from '../../model/DataMapProp';
import { dateTime } from '@grafana/data';
import { stylesFactory, TagList } from '@grafana/ui';
import { css } from 'emotion';

export default function PopupInfo(props: DataMapProp) {
  const styles = getStyles();

  const { label, latitude, longitude, datetime: dt } = props;
  return (
    <table className={styles.table}>
      <tr>
        <td></td>
        <td>
          <TagList tags={[`${dateTime(dt).fromNow()}`]} />
        </td>
      </tr>
      <tr>
        <td>Last Position</td>
        <td>{dateTime(dt).toISOString()}</td>
      </tr>
      <tr>
        <td>Label</td>
        <td>{label}</td>
      </tr>
      <tr>
        <td>Latitude</td>
        <td>{latitude}</td>
      </tr>
      <tr>
        <td>Longitude</td>
        <td>{longitude}</td>
      </tr>
    </table>
  );
}

const getStyles = stylesFactory(() => {
  return {
    table: css`
      table-layout: fixed;
      & > tr {
        border: 5px thin;
      }
      & > tr > td {
        padding-left: 10px;
      }
    `,
  };
});
