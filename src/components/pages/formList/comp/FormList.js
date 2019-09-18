import React from 'react';
import PropTypes from 'prop-types';
import {formInfoType} from '../../../../types';
import {Grid} from '@material-ui/core/';
import FormListItem from './FormListItem';

export default function FormList({forms}) {

  const listItems = forms.map((form) =>
    <FormListItem key={form.id} id={form.id} name={form.name} />
  );

  return (
    <Grid container spacing={3}>
      {listItems}
    </Grid>
  );
}

FormList.propTypes = {
  forms: PropTypes.arrayOf(formInfoType).isRequired,
};

