import React from 'react';
import PropTypes from 'prop-types';
import {Input, FormControl, InputLabel, FormHelperText} from '@material-ui/core/';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  error: {
    position: "absolute",
    bottom: "-1rem",
  },
}));

export default function FormInput({type, id, name, label, placeholder, value, onChange, onBlur, onFocus, error}) {
  const classes = useStyles();

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input error={error ? true : false} onChange={onChange} onBlur={onBlur} onFocus={onFocus} id={id} name={name} aria-describedby={placeholder} placeholder={placeholder} type={type} value={value} />
      {error ? <FormHelperText error={true} className={classes.error}>{error}</FormHelperText> : null}
    </FormControl>
  )
}

FormInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
};

FormInput.defaultProps = {
  type: 'text'
};
