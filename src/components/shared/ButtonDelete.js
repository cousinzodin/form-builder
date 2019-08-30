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


export default function FormInput(props) {
  const classes = useStyles();
  const {onClick} = props;

  return (
    <IconButton onClick={onClick} aria-label="delete" className={classes.btn}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  )
}

FormInput.propTypes = {
  onClick: PropTypes.func,
};
