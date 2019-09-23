import React from 'react';
import axios from '../../../axios';
import {connect} from 'react-redux';
import {reorder, generateUUID} from '../../../utils';
import * as actions from '../../../store/actions';
import FormConstructorForm from './comp/FormConstructorForm';
import withErrorHandler from "../../hoc/withErrorHandler";
import * as v from "../../../validation";
import Layout from '../../layout/Layout';
import {CircularProgress, Typography} from '@material-ui/core/';

class FormConstructorPage extends React.Component {

  state = this.props.match.params.id ? {id: this.props.match.params.id, ...this.props.drafts[this.props.match.params.id]} : {...this.props.drafts.new};

  componentDidMount() {
    if (this.state.id) {
      this.props.getForm(this.state.id, this.props.history);
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
    if (this.props.match.params.id) {
      this.props.editForm(this.props.match.params.id, form, this.props.history);
    } else {
      this.props.createForm(form, this.props.history);
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

    let content = this.props.error ? <Typography>{this.props.error}</Typography> : <CircularProgress />;

    if (this.state.order) {
      content =
        <FormConstructorForm
          onSubmit={this.save}
          onFieldChange={this.handleFieldChange}
          onNameChange={this.handleNameChange}
          onDelete={this.deleteField}
          onAddField={this.addField}
          onReorder={this.reorderFields}
          order={this.state.order}
          values={{...this.state.fields, formTitle: this.state.formTitle}}
          validations={{formTitle: v.isFilled, defaultValidation: validateField}}
        />
    }

    return (

      <Layout containerWidth="sm" withLink>
        {content}
      </Layout>

    );
  }
}

const mapStateToProps = state => {
  return {
    drafts: state.draft,
    redirect: state.draft.redirect,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showModal: (modal) => dispatch(actions.showModal(modal)),
    saveDraft: (id, form) => dispatch(actions.saveFormDraft(id, form)),
    clearDraft: (id) => dispatch(actions.clearFormDraft(id)),
    getFills: (id) => dispatch(actions.fetchFillList(id, 0, 1)),
    getForm: (id, history) => dispatch(actions.fetchFormForEditing(id, history)),
    editForm: (id, form, history) => dispatch(actions.editForm(id, form, history)),
    createForm: (form, history) => dispatch(actions.createForm(form, history)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(axios)(FormConstructorPage));
