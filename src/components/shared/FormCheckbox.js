import React from 'react';
import PropTypes from 'prop-types';
import {FormControl, Checkbox, FormControlLabel} from '@material-ui/core/';

export default function FormCheckbox(props) {
  const {name, label, onChange} = props;

  return (
    <FormControl fullWidth margin="normal">
      <FormControlLabel
        control={
          <Checkbox
            onChange={onChange}
            value={name}
            name={name}
            id={name}
            color="primary"
          />
        }
        label={label}
      /></FormControl>
  );
}

FormCheckbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func
};
