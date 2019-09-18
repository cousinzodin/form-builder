import React from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from "react-router-dom";
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

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Paper className={classes.paper}>
        <Typography variant="h6" align="left">
          <RouterLink to={"./form/" + id}>{id + " : " + name}</RouterLink>
        </Typography>
        <Divider className={classes.divider} />
        <Grid container justify="space-between" alignItems="center">
          <Button component={RouterLink} to={"./constructor/" + id} size="small" color="primary">
            <EditIcon className={classes.leftIcon} />
            Edit
        </Button>

          <Button component={RouterLink} to={'./form/stats/' + id} size="small" color="default">
            Show History
        </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}

FormListItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
