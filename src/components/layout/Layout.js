import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {Box, Container} from '@material-ui/core/';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    paddingBottom: '100px',
    paddingTop: '64px',
    margin: 0,
  },
}));

export default function Layout(props) {
  const classes = useStyles();
  return (
    <Box my={2} bgcolor="grey.200" minHeight="100vh" className={classes.root} >
      <AppHeader withLink={props.withLink} />
      <Box my={2} component={props.component ? props.component : "div"} onSubmit={props.onSubmit} >
        <Container maxWidth={props.component === "form" ? "sm" : "lg"}>
          {props.children}
        </Container>
        <AppFooter>
          {props.action}
        </AppFooter>
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  withLink: PropTypes.bool,
  action: PropTypes.element,
  component: PropTypes.string,
  onSubmit: PropTypes.func,
}
