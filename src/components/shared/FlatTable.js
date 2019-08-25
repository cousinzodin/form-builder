import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core/';


const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
}));

export default function FlatTable(props) {
  const classes = useStyles();
  const {rows} = props;
  const columns = Object.keys(rows[0]);

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          {columns.map(column => (<TableCell key={column}>{column}</TableCell>))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.id}>
            {columns.map(column => (<TableCell key={row.id + column}>
              {row[column].toString()}
            </TableCell>))}
          </TableRow>
        ))}
      </TableBody>
    </Table>);
}

FlatTable.propTypes = {
  type: PropTypes.arrayOf(PropTypes.object),
};
