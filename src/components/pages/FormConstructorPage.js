import React from 'react';
import axios from 'axios';
import {ENDPOINT} from '../../config';
import {Paper, Fab, Button, CircularProgress} from '@material-ui/core/';
import styled from '../hoc/styled';
import Layout from '../layout/Layout';
//import FormItem from '../shared/FormItem';
import FormConstructorItem from '../shared/FormConstructorItem';
import FormInput from '../shared/FormInput';
import ButtonDelete from "../shared/ButtonDelete";



const StyledPaper = styled(Paper)(theme => ({
  padding: theme.spacing(2),
  paddingTop: 0,
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,
  textAlign: 'left',
  position: 'relative'
}));

export default class FormConstructorPage extends React.Component {

  state = {form: null};

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      axios.get(ENDPOINT + "forms/" + id)
        .then(response => {
          this.setState({form: response.data});
        });
    } else {
      this.setState({form: {name: "My new form", fields: []}});
    }
  }

  save = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    console.log("save", this.state.form, id);
    // if (id) {
    //   axios.put(ENDPOINT + "forms/" + id, this.state.form)
    //     .then(response => {
    //       console.log(response);
    //     });
    // } else {
    //   axios.post(ENDPOINT + "forms/new", this.state.form)
    //     .then(response => {
    //       console.log(response);
    //     });
    // }
  }

  addField = () => {
    const newField = {
      type: "text",
      name: "",
      label: "",
      placeholder: "",
    }
    const updatedForm = {name: this.state.form.name, fields: [...this.state.form.fields, newField]};
    this.setState({form: updatedForm});
  }

  deleteField = name => {
    const updatedFields = this.state.form.fields.filter(item => item.name !== name);
     console.log("delete", name, updatedFields);
    this.setState({form: {name: this.state.form.name, fields: updatedFields}});
  }

  handleFieldChange = (field, index) => {
    console.log(field);
    const updatedFields = [...this.state.form.fields];
    updatedFields[index] = field;
    this.setState({form: {name: this.state.form.name, fields: updatedFields}});
    // console.log(updatedFields);
  }

  handleNameChange = (e) => {
    this.setState({form: {name: e.target.value, fields: this.state.form.fields}});
  }

  render() {
    let content = <CircularProgress />;
    if (this.state.form) {
      content =
        <React.Fragment>
          <StyledPaper>
            <FormInput onChange={this.handleNameChange} label="Form title" id="new-form-title-field" placeholder="My new form" value={this.state.form.name} />
          </StyledPaper>
          {this.state.form.fields.map((field, index) => (
            <StyledPaper key={field.name + index}>
              <ButtonDelete onClick={() => this.deleteField(field.name)}/>
              <FormConstructorItem
                onFieldChange={(field) => this.handleFieldChange(field, index)}
                type={field.type}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                items={field.items}
                default={field.default} />
            </StyledPaper>
          ))}
          <Button onClick={this.addField} variant="contained" color="primary">+ Add new field</Button>
        </React.Fragment>;
    }
    return (
      <Layout component="form" onSubmit={this.save} withLink action={<Fab variant="extended" color="secondary" type="submit" disabled={!this.state.form}> Save Form </Fab>}>
        {content}
      </Layout>
    );
  }
}

