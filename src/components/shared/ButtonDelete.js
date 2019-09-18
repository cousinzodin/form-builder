import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {IconButton} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  btn: {
    position: "absolute",
    top: '2px',
    right: '2px',
    zIndex: 10,
    padding: '6px',
  },
}));


export default function ButtonDelete(props) {
  const classes = useStyles();
  return (
    <IconButton onClick={props.onClick} aria-label="delete" className={classes.btn}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  )
}

ButtonDelete.propTypes = {
  onClick: PropTypes.func.isRequired,
};
