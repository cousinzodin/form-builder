import React from 'react';
import {AppBar, Toolbar, Typography, Grid, Link} from '@material-ui/core/';
import {Link as RouterLink} from "react-router-dom";

export default function Header(props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h6" component="h1" >FormBuilder</Typography>
          <Link component={RouterLink} size="small" color="inherit" to="/">My Forms</Link>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
