import React from 'react';
import axios from '../../axios';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';
import {ENDPOINT, ITEMS_PER_TAKE} from '../../config';
import styled from '../hoc/styled';
import {Typography, Paper, CircularProgress, Grid, Button} from '@material-ui/core/';
import Layout from '../layout/Layout';
import Table from '../shared/FlatTable';
import withErrorHandler from "../hoc/withErrorHandler";


const StyledPaper = styled(Paper)(theme => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const Title = styled(Typography)(theme => ({
  padding: theme.spacing(2),
}));

class FormStatsPage extends React.Component {

  state = {take: 0, isAllLoaded: false};

  loadData = () => {
    const id = this.props.match.params.id;
    const take = this.state.take;
    const max = ITEMS_PER_TAKE;
    axios.get(`fills/${id}?offset=${max * take}&count=${max}`)
      .then(response => {
        this.props.saveFills(response.data);
        this.setState({take: this.state.take + 1, isAllLoaded: response.data.length < max});
      })
      .catch(error => {});

  }

  componentDidMount() {
    const id = this.props.match.params.id;

    this.loadData();

    if (!this.getName()) {
      axios.get(ENDPOINT + "forms/" + id)
        .then(response => {
          this.props.saveForm(response.data);
        })
        .catch(error => {});
    }
  }

  componentWillUnmount() {
    this.props.onDestroy();
  }

  getName = () => (this.props.forms && this.props.forms[this.props.match.params.id]) ? this.props.forms[this.props.match.params.id].name : "";

  render() {
    const name = this.getName();
    let content = this.props.error ? null : <CircularProgress />;
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
        {this.props.fills && !this.state.isAllLoaded ? <Grid item xs={12}>
          <Button onClick={this.loadData} variant="outlined" size="small" color="primary">
            Load More
        </Button>
        </Grid> : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(FormStatsPage, axios));
