import React from 'react';
import {FormControl, Checkbox, FormControlLabel} from '@material-ui/core/';

export default function FormCheckbox(props) {
  const {name, label} = props;

  return (
    <FormControl fullWidth margin="normal">
      <FormControlLabel
        control={
          <Checkbox
            value={name}
            id={name}
            color="primary"
          />
        }
        label={label}
      /></FormControl>
  );
}
