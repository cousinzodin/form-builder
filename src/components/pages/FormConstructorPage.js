import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';
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

class FormConstructorPage extends React.Component {
  id = this.props.match.params.id
  state = this.props.match.params.id ? {name: "", fields: null} : this.props.draft;

  componentDidMount() {
    if (this.id) {
      axios.get(ENDPOINT + "fills/" + this.id)
        .then(response => {
          if (response.data.length > 0) {
            this.props.history.replace("/form/" + this.id);
            return;
          } else {
            axios.get(ENDPOINT + "forms/" + this.id)
              .then(response => {
                this.setState({name: response.data.name, fields: response.data.fields});
              });
          }
        });
    }
  }

  componentWillUnmount() {
    this.props.saveDraft(this.state);
  }

  save = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    console.log("save", this.state, id);
    if (id) {
      axios.put(ENDPOINT + "forms/" + id, this.state)
        .then(response => {
          console.log(response);
          this.props.history.push("/");
        });
    } else {
      axios.post(ENDPOINT + "forms/new", this.state)
        .then(response => {
          console.log(response);
          this.props.clearDraft();
          this.props.history.push("/");
        });
    }
  }

  addField = () => {
    const newField = {
      type: "text",
      name: "",
      label: "",
      placeholder: "",
    }
    this.setState({fields: [...this.state.fields, newField]});
  }

  deleteField = name => {
    const updatedFields = this.state.fields.filter(item => item.name !== name);
    console.log("delete", name, updatedFields);
    this.setState({fields: updatedFields});
  }

  handleFieldChange = (field, index) => {
    // console.log(field);
    const updatedFields = [...this.state.fields];
    updatedFields[index] = field;
    this.setState({fields: updatedFields});
    // console.log(updatedFields);
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value});
  }

  render() {
    let content = <CircularProgress />;
    if (this.state && this.state.fields) {
      content =
        <React.Fragment>
          <StyledPaper>
            <FormInput onChange={this.handleNameChange} label="Form title" id="new-form-title-field" placeholder="My new form" value={this.state.name} />
          </StyledPaper>
          {this.state.fields.map((field, index) => (
            <StyledPaper key={field.name + index}>
              <ButtonDelete onClick={() => this.deleteField(field.name)} />
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
      <Layout component="form" onSubmit={this.save} withLink action={<Fab variant="extended" color="secondary" type="submit" disabled={!this.state.fields}> Save Form </Fab>}>
        {content}
      </Layout>
    );
  }
}



const mapStateToProps = state => {
  return {
    draft: state.draft.draft
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveDraft: (form) => dispatch({type: actionTypes.SAVE_FORM_DRAFT, payload: form}),
    clearDraft: () => dispatch({type: actionTypes.CLEAR_FORM_DRAFT}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormConstructorPage);
