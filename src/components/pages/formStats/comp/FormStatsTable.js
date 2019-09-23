import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from '@material-ui/core/';
import Table from '../../../shared/FlatTable';


export default function FormStatsTable({fills}) {
  if (fills.length) {
    const data = fills.map((item) => {
      const id = item.id;
      return {id, ...item.fields}
    });
    return <Table rows={data} />;
  } else {
    return <Typography>This form had not been filled yet</Typography >
  }
}

FormStatsTable.propTypes = {
  fills: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    fields: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])),
  })),
};
