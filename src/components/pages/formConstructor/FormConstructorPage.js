import React from 'react';
import axios from '../../../axios';
import {connect} from 'react-redux';
import {reorder, generateUUID} from '../../../utils';
import * as actionTypes from '../../../store/actions';
import FormConstructorForm from './comp/FormConstructorForm';
import withErrorHandler from "../../hoc/withErrorHandler";
import * as v from "../../../validation";

class FormConstructorPage extends React.Component {
  id = this.props.match.params.id
  state = this.props.match.params.id ? {formTitle: "", fields: {}, order: null} : {...this.props.draft};

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
                const fields = {};
                const order = [];
                const names = [];
                response.data.fields.forEach((field, index) => {
                  const id = generateUUID();
                  fields[id] = field;
                  order[index] = id;
                  names[index] = field.name;
                });
                this.setState({formTitle: response.data.name, fields, order, names});
              })
              .catch(error => {});
          }
        })
        .catch(error => {});
    }
  }

  componentWillUnmount() {
    if (this.state.order) {
      this.props.saveDraft(this.state);
    }
  }

  save = () => {
    const id = this.props.match.params.id;
    const fields = this.state.order.map(item => this.state.fields[item]);
    const form = {name: this.state.formTitle, fields};
    if (id) {
      axios.put("forms/" + id, form)
        .then(response => {
          if (response) {
            this.props.showModal({title: "Form has been saved"});
            this.props.onFormSaved();
            this.props.history.push("/");
          }
        })
        .catch(error => {});
    } else {
      axios.post("forms/new", form)
        .then(response => {
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
    const id = generateUUID();
    const newField = {
      type: "text",
      name: "",
      label: "",
      placeholder: "",
    }
    const fields = {...this.state.fields};
    fields[id] = newField;
    const order = [...this.state.order, id];
    this.setState({fields, order});
  }

  deleteField = id => {
    const order = this.state.order.filter(item => item !== id);
    const fields = {...this.state.fields};
    delete fields[id];
    this.setState({order, fields});
  }

  handleFieldChange = (field, id) => {
    const fields = {...this.state.fields};
    fields[id] = field;
    const names = this.state.order.map(item => fields[item].name);
    this.setState({fields, names});
  }

  handleNameChange = (e) => {
    this.setState({formTitle: e.target.value});
  }

  reorderFields = result => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const order = reorder(
      this.state.order,
      result.source.index,
      result.destination.index
    );

    this.setState({order});
  }

  render() {
    const validateField = v.validateField(this.state.names);
    return (
      <FormConstructorForm
        onSubmit={this.save}
        onFieldChange={this.handleFieldChange}
        onNameChange={this.handleNameChange}
        onDelete={this.deleteField}
        onAddField={this.addField}
        onReorder={this.reorderFields}
        order={this.state.order}
        values={{...this.state.fields, formTitle: this.state.formTitle}}
        backError={this.props.error}
        validations={{formTitle: v.isFilled, defaultValidation: validateField}}
      />
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
    onFormSaved: () => dispatch({type: actionTypes.CLEAR_FORM_LIST}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(FormConstructorPage, axios));
