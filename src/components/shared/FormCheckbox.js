import React from 'react';
import PropTypes from 'prop-types';
import {FormControl, Checkbox, FormControlLabel} from '@material-ui/core/';

export default function FormCheckbox({name, label, onChange, id, checked}) {

  return (
    <FormControl fullWidth margin="normal">
      <FormControlLabel
        control={
          <Checkbox
            onChange={onChange}
            value={name}
            name={name}
            id={id}
            color="primary"
            checked={checked}
          />
        }
        label={label}
      /></FormControl>
  );
}

FormCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
