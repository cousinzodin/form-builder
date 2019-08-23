import React from 'react';
import {Link as RouterLink} from "react-router-dom";
import FormList from '../shared/FormList';
import Layout from '../layout/Layout';
import {Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const forms = [
  {
    id: 1,
    name: 'My Brand New Form',
    fields: 4,
  },

  {
    id: 2,
    name: 'My Brand-Brand New Form',
    fields: 10,
  }
];

export default function FormListPage() {

  return (
    <Layout action={<Fab to="/constructor" component={RouterLink} color="secondary" aria-label="add">
      <AddIcon /></Fab>}>
      <FormList forms={forms} />
    </Layout>
  );
}
