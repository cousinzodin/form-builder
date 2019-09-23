import React from 'react';
import axios from '../../../axios';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import {selectName} from '../../../store/reducers/fills';
import {ITEMS_PER_TAKE} from '../../../config';
import styled from '../../hoc/styled';
import {Typography, Paper, CircularProgress, Button} from '@material-ui/core/';
import Layout from '../../layout/Layout';
import FormStatsTable from './comp/FormStatsTable';
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

  componentDidMount() {
    this.loadData();
    if (!this.props.name) {
      this.props.getForm(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.onDestroy();
  }

  loadData = () => {
    this.props.getFills(this.props.match.params.id, this.props.take, ITEMS_PER_TAKE);
    this.props.onLoadMore();
  }

  render() {
    let content = this.props.error ? <Typography>{this.props.error}</Typography> : <CircularProgress />;
    let loadMoreButton = null;
    if (this.props.fills) {
      content = <FormStatsTable fills={this.props.fills} />
      loadMoreButton = !this.props.isAllLoaded ?
        <Button onClick={this.loadData} variant="outlined" size="small" color="primary"> Load More </Button>
        : null
    }
    return (
      <Layout withLink withFooter>
        <StyledPaper>
          <Title variant="h6" align="left">
            {this.props.name}
          </Title>
          {content}
        </StyledPaper>
        {loadMoreButton}
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
