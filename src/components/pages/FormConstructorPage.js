import React from 'react';
import axios from '../../axios';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';
import {Paper, Fab, Button, CircularProgress} from '@material-ui/core/';
import styled from '../hoc/styled';
import Layout from '../layout/Layout';
import FormConstructorList from '../shared/FormConstructorList';
import FormInput from '../shared/FormInput';
import withErrorHandler from "../hoc/withErrorHandler";
import {DragDropContext} from 'react-beautiful-dnd';

const StyledPaper = styled(Paper)(theme => ({
  padding: theme.spacing(2),
  paddingTop: 0,
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,
  textAlign: 'left',
}));


const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class FormConstructorPage extends React.Component {
  id = this.props.match.params.id
  state = this.props.match.params.id ? {name: "", fields: null} : this.props.draft;

  componentDidMount() {
    if (this.id) {
      axios.get("fills/" + this.id)
        .then(response => {
          if (response.data.length > 0) {
            this.props.showModal({title: "You can't edit this form", message: "This form has already been filled"});
            this.props.history.replace("/form/" + this.id);
            return;
          } else {
            axios.get("forms/" + this.id)
              .then(response => {
                this.setState({name: response.data.name, fields: response.data.fields});
              })
              .catch(error => {});
          }
        })
        .catch(error => {});
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
      axios.put("forms/" + id, this.state)
        .then(response => {
          console.log(response);
          if (response) {
            this.props.showModal({title: "Form has been saved"});
            this.props.onFormSaved();
            this.props.history.push("/");
          }
        })
        .catch(error => {});
    } else {
      axios.post("forms/new", this.state)
        .then(response => {
          console.log(response);
          if (response.data.id) {
            this.props.showModal({title: "Form has been saved"});
            this.props.onFormSaved();
            this.props.clearDraft();
            this.props.history.push("/")
          }
        }).catch(error => {});
    }
  }

  addField = () => {
    const newField = {
      type: "text",
      name: "new-name-" + this.state.fields.length,
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
    // console.log(field, index);
    const updatedFields = [...this.state.fields];
    updatedFields[index] = field;
    this.setState({fields: updatedFields});
    console.log(updatedFields);
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value});
  }

  reorderFields = result => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const fields = reorder(
      this.state.fields,
      result.source.index,
      result.destination.index
    );

    this.setState({fields});
  }

  render() {
    let content = this.props.error ? null : <CircularProgress />;
    if (this.state && this.state.fields) {
      content =
        <React.Fragment>
          <StyledPaper>
            <FormInput onChange={this.handleNameChange} label="Form title" id="new-form-title-field" placeholder="My new form" value={this.state.name} />
          </StyledPaper>
          <DragDropContext onDragEnd={this.reorderFields}>
            <FormConstructorList fields={this.state.fields} onFieldChange={this.handleFieldChange} onDelete={this.deleteField} />
          </DragDropContext>
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
    showModal: (modal) => dispatch({type: actionTypes.SHOW_MODAL, payload: modal}),
    saveDraft: (form) => dispatch({type: actionTypes.SAVE_FORM_DRAFT, payload: form}),
    clearDraft: () => dispatch({type: actionTypes.CLEAR_FORM_DRAFT}),
    onFormSaved: (data) => dispatch({type: actionTypes.CLEAR_FORM_LIST}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(FormConstructorPage, axios));
