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
  state = {form: null, filling: null};

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(ENDPOINT + "forms/" + id)
      .then(response => {
        const filling = {};
        response.data.fields.forEach(field => {
          filling[field.name] = field.type === "dropdown" && field.items && field.items.length ? field.items[field.default].value : field.type === "checkmark" ? false : "";
        });
        this.setState({filling: filling});
        this.setState({form: response.data});
      });
  }

  handleChange = (e) => {
    const filling = {...this.state.filling};
    switch (e.target.type) {
      case 'number':
        filling[e.target.name] = parseInt(e.target.value);
        break;
      case 'checkbox':
        filling[e.target.value] = e.target.checked;
        break;
      default:
        filling[e.target.name] = e.target.value;
    }

    this.setState({filling: filling});
  }

  send = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const data = {fields: this.state.filling};
    axios.post(ENDPOINT + "fills/" + id, data)
      .then(response => {
        console.log(response);
      });
  }

  render() {
    let content = <CircularProgress />;
    if (this.state.form) {
      content = <StyledPaper>
        <Typography variant="h6">{this.state.form.name}</Typography>
        {this.state.form.fields.map(field => (<FormItem
          value={this.state.filling[field.name]}
          onChange={this.handleChange}
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
      <Layout component="form" onSubmit={this.send}
        action={<Fab variant="extended" color="secondary" type="submit" disabled={!this.state.form}>Send form</Fab>}>
        {content}
      </Layout>
    );
  }
}


