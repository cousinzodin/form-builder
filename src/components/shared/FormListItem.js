import React from 'react';
import withLink from '../hoc/withLink';
import {Link} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Paper, Button, Typography, Divider} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
    fontSize: 14,
  }
}));

export default function FormListItem(props) {
  const {id, name} = props;
  const classes = useStyles();
  const LinkToConstructor = withLink("./constructor/" + id)(Button);
  const LinkToFillings = withLink("./form/stats/" + id)(Button);

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Paper className={classes.paper}>
        <Typography variant="h6" align="left">
          <Link to={"./form/" + id}>{id + " : " + name}</Link>
        </Typography>
        <Divider className={classes.divider} />
        <Grid container justify="space-between" alignItems="center">
          <LinkToConstructor size="small" color="primary">
            <EditIcon className={classes.leftIcon} />
            Edit
        </LinkToConstructor>
          <LinkToFillings size="small" color="default">
            Show History
        </LinkToFillings>
        </Grid>
      </Paper>
    </Grid>
  );
}
