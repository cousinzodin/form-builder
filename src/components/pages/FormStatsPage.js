import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography, Paper} from '@material-ui/core/';
import Layout from '../layout/Layout';
import Table from '../shared/FlatTable';

const fills = [
  {
    id: 89189,
    fields: {
      username: 'John',
      year: 1994,
      gender: 'm',
      news: true,
    }
  },
  {
    id: 72384724,
    fields: {
      username: 'Jane',
      year: 1995,
      gender: 'w',
      news: false,
    }
  },
];

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
  },
  title: {
    padding: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

export default function FormStatsPage() {
  const classes = useStyles();
  const data = fills.map((item) => {
    const id = item.id;
    return {id, ...item.fields}
  });
  return (
    <Layout>
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h6" align="left">
          Title
    </Typography>
        <Table className={classes.table} rows={data} />
      </Paper>
    </Layout>
  );
}

