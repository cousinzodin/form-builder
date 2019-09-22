import React from 'react';
import axios from '../../../axios';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import {selectName} from '../../../store/reducers/fills';
import {ITEMS_PER_TAKE} from '../../../config';
import styled from '../../hoc/styled';
import {Typography, Paper, CircularProgress, Grid, Button} from '@material-ui/core/';
import Layout from '../../layout/Layout';
import Table from '../../shared/FlatTable';
import withErrorHandler from "../../hoc/withErrorHandler";
import withLoadMore from "../../hoc/withLoadMore";

const StyledPaper = styled(Paper)(theme => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const Title = styled(Typography)(theme => ({
  padding: theme.spacing(2),
}));

class FormStatsPage extends React.Component {

  loadData = () => {
    const id = this.props.match.params.id;
    const max = ITEMS_PER_TAKE;
    this.props.onLoadMore();
    this.props.getFills(id, this.props.take, max);
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    this.loadData();

    if (!this.props.name) {
      this.props.getForm(id);
    }
  }

  componentWillUnmount() {
    this.props.onDestroy();
  }


  render() {
    let content = this.props.error ? <Typography>{this.props.error}</Typography> : <CircularProgress />;
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
            {this.props.name}
          </Title>
          {content}
        </StyledPaper>
        {this.props.fills && !this.props.isAllLoaded ? <Grid item xs={12}>
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
    name: selectName(state),
    isAllLoaded: state.fills.isAllLoaded,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFills: (id, take, max) => dispatch(actions.fetchFillList(id, take, max)),
    getForm: (id) => dispatch(actions.fetchForm(id)),
    onDestroy: () => dispatch(actions.clearFillList()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoadMore(withErrorHandler(axios)(FormStatsPage)));
