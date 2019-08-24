import React from 'react';
import axios from 'axios';
import {ENDPOINT} from '../../config';
import styled from '../hoc/styled';
import {Typography, Paper, CircularProgress } from '@material-ui/core/';
import Layout from '../layout/Layout';
import Table from '../shared/FlatTable';

const StyledPaper = styled(Paper)(theme => ({
  marginTop: theme.spacing(2),
  paddingBottom:theme.spacing(2),
}));

const Title = styled(Typography)(theme => ({
  padding: theme.spacing(2),
}));

export default class FormStatsPage extends React.Component {

  state = {fills: null};

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(ENDPOINT + "fills/" + id)
      .then(response => {
        this.setState({fills: response.data});
      });
  }

  render() {
    let content = <CircularProgress />;
    if (this.state.fills) {
      if (this.state.fills.length) {
        const data = this.state.fills.map((item) => {
          const id = item.id;
          return {id, ...item.fields}
        });
        content = <Table rows={data} />;
      } else {
        content = <Typography>This form had not been filled yet</Typography >
      }
    }
    return (
      <Layout>
        <StyledPaper>
          <Title variant="h6" align="left">
            Title
          </Title>
          {content}
        </StyledPaper>
      </Layout>
    );
  }

}

