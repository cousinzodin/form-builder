import React from 'react';
import {AppBar, Toolbar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
  appBar: {
    top: 'auto',
    textAlign: 'center',
    bottom: 0,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

export default function AppFooter(props) {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="default" className={classes.appBar}>
      <Toolbar>
        <div className={classes.fabButton}>
          {props.children}
        </div>
      </Toolbar>
    </AppBar>
  );
}
