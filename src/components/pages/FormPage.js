import React from 'react';
import axios from 'axios';
import {ENDPOINT} from '../../config';
import styled from '../hoc/styled';
import {Paper, Fab, Typography, CircularProgress} from '@material-ui/core/';
import Layout from '../layout/Layout';
import FormItem from '../shared/FormItem';


const StyledPaper = styled(Paper)(theme => ({
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));


export default class FormPage extends React.Component {
  state = {form: null};

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(ENDPOINT + "forms/" + id)
      .then(response => {
        this.setState({form: response.data});
      });
  }

  render() {
    let content = <CircularProgress />;
    if (this.state.form) {
      content = <StyledPaper>
        <Typography variant="h6">{this.state.form.name}</Typography>
        {this.state.form.fields.map(field => (<FormItem
          key={field.name}
          type={field.type}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          options={field.items}
          defaultOption={field.default} />))}
      </StyledPaper>
    }
    return (
      <Layout action={<Fab variant="extended" color="secondary" disabled={!this.state.form}>Send form</Fab>}>
        {content}
      </Layout>
    );
  }
}


