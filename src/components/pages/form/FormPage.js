import React from 'react';
import axios from '../../../axios';
import {connect} from 'react-redux';
import * as actionTypes from '../../../store/actions';
import withErrorHandler from "../../hoc/withErrorHandler";
import Form from "./comp/Form";
import * as v from "../../../validation";

class FormPage extends React.Component {
  state = {name: "", fields: null, data: {}, validationRules: {}};

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get("forms/" + id)
      .then(response => {
        this.setState(
          {
            name: response.data.name,
            fields: response.data.fields,
            data: this.createDefaultData(response.data.fields),
            validationRules: this.createValidationRules(response.data.fields)
          }
        );
      })
      .catch(error => {});
  }

  createDefaultData = (fields) => {
    const data = {};
    fields.forEach(field => {
      data[field.name] = field.type === "dropdown" && field.items && field.items.length ? field.items[field.default].value : field.type === "checkmark" ? false : "";
    });
    return data;
  }

  createValidationRules = (fields) => {
    const rules = {};
    fields.forEach(field => {
      if (field.type === "text" || field.type === "number") {
        rules[field.name] = v.isFilled;
      }
    });
    return rules;
  }


  handleChange = (e) => {
    const data = {...this.state.data};
    switch (e.target.type) {
      case 'number':
        data[e.target.name] = parseInt(e.target.value);
        break;
      case 'checkbox':
        data[e.target.value] = e.target.checked;
        break;
      default:
        data[e.target.name] = e.target.value;
    }

    this.setState({data});
  }

  send = () => {
    const id = this.props.match.params.id;
    const data = {fields: this.state.data};
    axios.post("fills/" + id, data)
      .then(response => {
        if (response.data.id) {
          this.props.showModal({title: "Form has been sent"});
          this.setState({data: this.createDefaultData(this.state.fields)});
        }
      })
      .catch(error => {});
  }

  render() {
    return (
      <Form
        onSubmit={this.send}
        onChange={this.handleChange}
        fields={this.state.fields}
        values={this.state.data}
        title={this.state.name}
        validations={this.state.validationRules}
        backError={this.props.error} />
    );
  }
}

const mapStateToProps = state => {
  return {
    forms: state.formsList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showModal: (modal) => dispatch({type: actionTypes.SHOW_MODAL, payload: modal}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(FormPage, axios));
