import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';
import {ENDPOINT} from '../../config';
import styled from '../hoc/styled';
import {Typography, Paper, CircularProgress} from '@material-ui/core/';
import Layout from '../layout/Layout';
import Table from '../shared/FlatTable';

const StyledPaper = styled(Paper)(theme => ({
  marginTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const Title = styled(Typography)(theme => ({
  padding: theme.spacing(2),
}));

class FormStatsPage extends React.Component {

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(ENDPOINT + "fills/" + id)
      .then(response => {
        this.props.saveFills(response.data);
      });

    if (!this.getName()) {
      axios.get(ENDPOINT + "forms/" + id)
        .then(response => {
          this.props.saveForm(response.data);
        });
    }
  }

  componentWillUnmount() {
    this.props.onDestroy();
  }

  getName = () => (this.props.forms && this.props.forms[this.props.match.params.id]) ? this.props.forms[this.props.match.params.id].name : "";

  render() {
    const name = this.getName();
    let content = <CircularProgress />;
    if (this.props.fills) {
      if (this.props.fills.length) {
        const data = this.props.fills.map((item) => {
          const id = item.id;
          return {id, ...item.fields}
        });
        content = <Table rows={data} />;
      } else {
        content = <Typography>This form had not been filled yet</Typography >
      }
    }
    return (
      <Layout withLink>
        <StyledPaper>
          <Title variant="h6" align="left">
            {name}
          </Title>
          {content}
        </StyledPaper>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    fills: state.fills.fillsList,
    forms: state.forms.formsDict
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveFills: (data) => dispatch({type: actionTypes.ADD_FILL_LIST, list: data}),
    saveForm: (data) => dispatch({type: actionTypes.ADD_FORM, payload: data}),
    onDestroy: () => dispatch({type: actionTypes.CLEAR_FILL_LIST}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormStatsPage);
