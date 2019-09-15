import React from 'react';
import PropTypes from 'prop-types';
import {AppBar, Toolbar, Typography, Grid, Link} from '@material-ui/core/';
import {Link as RouterLink} from "react-router-dom";
import HideOnScroll from '../hoc/HideOnScroll';

export default function AppHeader(props) {
  return (
    <HideOnScroll>
      <AppBar>
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Typography variant="h6" component="h1" >FormBuilder</Typography>
            {props.withLink ?
              <Link component={RouterLink} size="small" color="inherit" to="/">My Forms</Link> : null}
          </Grid>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

AppHeader.propTypes = {
  withLink: PropTypes.bool,
}
