import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';
import {ENDPOINT} from '../../config';
import {Link as RouterLink} from "react-router-dom";
import FormList from '../shared/FormList';
import Layout from '../layout/Layout';
import {Fab, CircularProgress, Typography} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

class FormListPage extends React.Component {

  componentDidMount() {
    if (!this.props.forms) {
      axios.get(ENDPOINT + "forms/list")
        .then(response => {
          this.props.onFormsLoaded(response.data);
        });
    }
  }

  render() {
    let content = <CircularProgress />;
    if (this.props.forms) {
      content = this.props.forms.length ? <FormList forms={this.props.forms} /> : <Typography >You have no forms yet</Typography >
    }
    return (
      <Layout withLink action={<Fab to="/constructor" component={RouterLink} color="secondary" aria-label="add">
        <AddIcon /></Fab>}>
        {content}
      </Layout>
    );
  }
}


const mapStateToProps = state => {
  return {
    forms: state.forms.formsList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFormsLoaded: (data) => dispatch({type: actionTypes.ADD_FORM_LIST, list: data}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormListPage);
