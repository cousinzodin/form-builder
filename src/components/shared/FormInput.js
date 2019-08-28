import React from 'react';
import PropTypes from 'prop-types';
import {Input, FormControl, InputLabel} from '@material-ui/core/';


export default function FormInput(props) {
  const {type, id, label, placeholder, value, onChange} = props;

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input onChange={onChange} id={id} name={id} aria-describedby={placeholder} placeholder={placeholder} type={type} value={value}/>
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
  onChange: PropTypes.func
};
