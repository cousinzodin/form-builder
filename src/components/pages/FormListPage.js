import React from 'react';
import axios from 'axios';
import {ENDPOINT} from '../../config';
import {Link as RouterLink} from "react-router-dom";
import FormList from '../shared/FormList';
import Layout from '../layout/Layout';
import {Fab, CircularProgress, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export default class FormListPage extends React.Component {
  state = {
    forms: null,
  }
  componentDidMount() {
    axios.get(ENDPOINT + "forms/list")
      .then(response => {
        this.setState({forms: response.data});
      });
  }

  render() {
    let content = <CircularProgress />;
    if (this.state.forms) {
      content = this.state.forms.length ? <FormList forms={this.state.forms} /> : <Typography >You have no forms yet</Typography >
    }
    return (
      <Layout withLink action={<Fab to="/constructor" component={RouterLink} color="secondary" aria-label="add">
        <AddIcon /></Fab>}>
        {content}
      </Layout>
    );
  }
}
