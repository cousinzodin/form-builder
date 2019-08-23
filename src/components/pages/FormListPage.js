import React from 'react';
import withLink from '../hoc/withLink';
import FormList from '../shared/FormList';
import AppFooter from '../layout/AppFooter';
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
  const LinkToConstructor = withLink("./constructor")(Fab);

  return (
    <Layout action={<LinkToConstructor href="" color="secondary" aria-label="add">
      <AddIcon /></LinkToConstructor>}>
      <FormList forms={forms} />
    </Layout>
  );
}
