import React from 'react';
import PropTypes from 'prop-types';
import {Input, FormControl, InputLabel} from '@material-ui/core/';


export default function FormInput(props) {
  const {type, id, name, label, placeholder, value, onChange, onBlur} = props;

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input onChange={onChange} onBlur={onBlur} id={id} name={name} aria-describedby={placeholder} placeholder={placeholder} type={type} value={value}/>
    </FormControl>
  )
}

FormInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};
