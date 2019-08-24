import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Grid} from '@material-ui/core/';
import FormListItem from './FormListItem';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
}));

export default function FormList(props) {
  const classes = useStyles();
  const {forms} = props;

  const listItems = forms.map((form) =>
    <FormListItem key={form.id} id={form.id} name={form.name} />
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {listItems}
        {/* <Grid item xs={12}>
          <Button variant="outlined" size="small" color="primary">
            Load More
        </Button>
        </Grid> */}
      </Grid>

    </div>
  );
}

