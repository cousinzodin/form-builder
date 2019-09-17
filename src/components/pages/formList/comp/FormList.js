import React from 'react';
import {Grid} from '@material-ui/core/';
import FormListItem from './FormListItem';

export default function FormList(props) {
  const {forms} = props;

  const listItems = forms.map((form) =>
    <FormListItem key={form.id} id={form.id} name={form.name} />
  );

  return (
    <Grid container spacing={3}>
      {listItems}
    </Grid>
  );
}

