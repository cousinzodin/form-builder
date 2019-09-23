import React from 'react';
import PropTypes from 'prop-types';
import {Box, Container} from '@material-ui/core/';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

export default function Layout(props) {
  return (
    <Box textAlign="center" bgcolor="grey.200" minHeight="100vh" pt="80px" pb="100px" >
      <AppHeader withLink={props.withLink} />

      <Container maxWidth={props.containerWidth || "lg"}>
        {props.children}
      </Container>

      {props.withFooter ? <AppFooter> {props.action} </AppFooter> : null}
    </Box>
  );
};

Layout.propTypes = {
  withLink: PropTypes.bool,
  withFooter: PropTypes.bool,
  action: PropTypes.element,
  containerWidth: PropTypes.oneOf(["sm", "lg"]),
  onSubmit: PropTypes.func,
}
