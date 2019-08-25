import React from 'react';
import PropTypes from 'prop-types';
import {FormControl, InputLabel, Select, MenuItem} from '@material-ui/core/';

export default function FormSelect(props) {
  const {id, label, options, defaultOption} = props;

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        value={defaultOption}
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
  id: PropTypes.string,
  label: PropTypes.string,
  defaultOption: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string
  }))
};
