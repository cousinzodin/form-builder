import React from 'react';
import axios from '../../../axios';
import {connect} from 'react-redux';
import {reorder, generateUUID} from '../../../utils';
import * as actions from '../../../store/actions';
import FormConstructorForm from './comp/FormConstructorForm';
import withErrorHandler from "../../hoc/withErrorHandler";
import * as v from "../../../validation";

class FormConstructorPage extends React.Component {

  state = this.props.match.params.id ? {id: this.props.match.params.id, ...this.props.drafts[this.props.match.params.id]} : {...this.props.drafts.new};

  componentDidMount() {
    if (this.state.id) {
      this.props.getForm(this.state.id);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const id = prevState.id;
    if (id && !prevState.fields && nextProps.drafts[id]) {
      return {id: id, ...nextProps.drafts[id]};
    } else {
      return null;
    }
  }

  componentWillUnmount() {
    if (this.state.order) {
      if (this.state.id) {
        this.props.saveDraft(this.state.id, this.state);

      } else {
        this.props.saveDraft("new", this.state);
      }
    }
  }

  save = () => {
    const fields = this.state.order.map(item => this.state.fields[item]);
    const form = {name: this.state.formTitle, fields};
    if (this.id) {
      this.props.editForm(form, this.id);
    } else {
      this.props.createForm(form);
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
    drafts: state.draft,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showModal: (modal) => dispatch(actions.showModal(modal)),
    saveDraft: (id, form) => dispatch(actions.saveFormDraft(id, form)),
    clearDraft: (id) => dispatch(actions.clearFormDraft(id)),
    getFills: (id) => dispatch(actions.fetchFillList(id, 0, 1)),
    getForm: (id) => dispatch(actions.fetchFormForEditing(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(axios)(FormConstructorPage));
