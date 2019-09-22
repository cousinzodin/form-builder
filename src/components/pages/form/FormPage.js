import React from 'react';
import axios from '../../../axios';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import withErrorHandler from "../../hoc/withErrorHandler";
import Form from "./comp/Form";
import {selectValidations, selectDefaultData} from "../../../store/reducers/form";

class FormPage extends React.Component {
  state = {data: null};

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getForm(id);
  }


  handleChange = (e) => {
    const data = this.state.data ? {...this.state.data} : {};
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
    this.props.fillForm(id, data);
    this.setState({data: null});
  }

  render() {
    return (
      <Form
        onSubmit={this.send}
        onChange={this.handleChange}
        fields={this.props.fields}
        values={this.state.data || this.props.defaultData}
        title={this.props.name}
        validations={this.props.validationRules}
        backError={this.props.error}
      />
    );
  }
}


const mapStateToProps = state => {
  return {
    name: state.form.name,
    fields: state.form.fields,
    validationRules: selectValidations(state),
    defaultData: selectDefaultData(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showModal: (modal) => dispatch(actions.showModal(modal)),
    getForm: (id) => dispatch(actions.fetchForm(id)),
    fillForm: (id, form) => dispatch(actions.fillForm(id, form)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(axios)(FormPage));
