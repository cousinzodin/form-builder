import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Paper, Fab} from '@material-ui/core/';
import Layout from '../layout/Layout';
import FormItem from '../shared/FormItem';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const form = {
  name: 'My Brand New Form',
  id: 4213,
  fields: [
    // fields can contain following field types
    {
      type: 'text',
      name: 'username', // unique over form
      label: 'enter username here',
      placeholder: 'John Doe'
    },
    {
      type: 'number',
      name: 'year', // unique over form
      label: 'enter year of birth ',
      placeholder: '2006',
    },
    {
      type: 'dropdown',
      name: 'gender', // unique over form
      label: 'Gender',
      items: [
        {
          name: "Male",
          value: "m"
        },
        {
          name: "Female",
          value: "w"
        }
      ],
      default: 0, // item index -> Male
    },
    {
      type: 'checkmark',
      name: 'news', // unique over form
      label: 'get news on email',
    }
  ]
}

function FormPage() {
  const classes = useStyles();

  const fields = form.fields.map(field => (<FormItem
    key={field.name}
    type={field.type}
    name={field.name}
    label={field.label}
    placeholder={field.placeholder}
    options={field.items}
    defaultOption={field.default} />));

  return (
    <Layout action={<Fab variant="extended" color="secondary"> Send Form</Fab>}>
        <Paper className={classes.paper}>
          {fields}
        </Paper>
    </Layout>
  );
}

export default FormPage;

