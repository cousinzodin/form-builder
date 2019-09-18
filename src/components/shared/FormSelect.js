import React from 'react';
import PropTypes from 'prop-types';
import {optionType} from '../../types'
import {FormControl, InputLabel, Select, MenuItem} from '@material-ui/core/';

export default function FormSelect({id, label, options, defaultOption, value, onChange}) {

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        onChange={onChange}
        value={value || options[defaultOption].value}
        inputProps={{
          name: id,
          id: id,
        }}
      >
        {options.map(option => (<MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>))}
      </Select>
    </FormControl>
  )
}

FormSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  defaultOption: PropTypes.number,
  options: PropTypes.arrayOf(optionType),
  onChange: PropTypes.func
};
