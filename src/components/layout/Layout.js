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
  },
}));

export default function Layout(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppHeader withLink={props.withLink} />
      <Container component={props.component} onSubmit={props.onSubmit} className={classes.root}>
        <Box my={2}>
          {props.children}
        </Box>

        <AppFooter>
          {props.action}
        </AppFooter>
      </Container>

    </React.Fragment>
  );
};

AppHeader.propTypes = {
  withLink: PropTypes.bool,
  action: PropTypes.element,
}