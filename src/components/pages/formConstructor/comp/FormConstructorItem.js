import React from 'react';
import PropTypes from 'prop-types';
import {fieldType, errorType} from '../../../../types';
import styled from '../../../hoc/styled';
import FormInput from "../../../shared/FormInput";
import ButtonDelete from "../../../shared/ButtonDelete";
import FormSelect from "../../../shared/FormSelect";
import FormConstructorDropdown from "./FormConstructorDropdown";
import * as v from "../../../../validation";
import {formatToKebabCase, capitalise} from "../../../../utils";
import {fieldTypes} from "../../../../config";
import {Paper} from '@material-ui/core';
import withValidation from '../../../hoc/withValidation';

const StyledContainer = styled(Paper)(theme => ({
  padding: theme.spacing(2),
  paddingTop: 0,
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,
  textAlign: 'left',
  position: 'relative',
  backgroundColor: "inherit",
}));

const typeOptions = fieldTypes.map(type => ({name: capitalise(type), value: type}));

class FormConstructorItem extends React.Component {
  constructor({values}) {
    super();
    this.state = {
      type: values.type,
      name: values.name,
      placeholder: values.placeholder || "",
      label: values.label,
      items: values.items || [],
      defaultOption: values.defaultOption || 0,
      defaults: [],
    }
  }

  componentDidMount() {
    this.updateDefaults();
  }

  updateDefaults = () => {
    const updated = this.state.items.map((o, i) => ({
      name: o.name,
      value: i,
    }));
    this.setState({defaults: updated});
  }

  onChange = (e) => {
    const {name, value} = e.target;
    const updatedState = {};
    updatedState[name] = name === "name" ? formatToKebabCase(value) : value;
    this.setState(updatedState);
  }

  onOptionChange = (option, index) => {
    const items = [...this.state.items];
    items[index] = option;
    this.updateDefaults();
    const updatedState = {...this.state, items};
    this.setState({items});
    this.save(updatedState);
  }

  onDefaultChange = (e) => {
    const updatedState = {...this.state, defaultOption: e.target.value};
    this.setState(updatedState);
    this.save(updatedState);
  }

  onTypeChange = (e) => {
    const {value} = e.target;
    const updatedState = {...this.state, type: value};
    if (value === "dropdown") {
      updatedState.items = updatedState.items ? updatedState.items : [];
    } else {
      updatedState.items = undefined;
    }
    this.setState(updatedState);
    this.save(updatedState);
  }

  addOption = () => {
    this.setState({items: [...this.state.items, {name: "", value: ""}]});
  }

  deleteOption = name => {
    const items = this.state.items.filter(item => item.name !== name);
    const updatedState = {...this.state, items};
    this.setState({items});
    this.save(updatedState);
  }

  save = (state) => {
    const {type, name, label, placeholder, items, defaultOption} = state;
    switch (type) {
      case 'dropdown':
        this.props.onFieldChange({type, name, label, items, default: defaultOption}, this.props.id);
        break;
      case 'checkmark':
        this.props.onFieldChange({type, name, label}, this.props.id);
        break;
      default:
        this.props.onFieldChange({type, name, label, placeholder}, this.props.id);
    }
  }

  onBlur = (e) => {
    this.props.onBlur(e);
    this.save(this.state);
  }

  delete = () => {
    this.props.onDelete(this.props.id);
  }

  render() {
    const {type, name, label, placeholder, items, defaultOption} = this.state;
    const {id} = this.props;
    const error = this.props.formError || this.props.errors || {};

    return (
      <StyledContainer>
        <ButtonDelete onClick={this.delete} />
        <FormSelect
          onChange={this.onTypeChange}
          label="Field type"

          name={"type"}
          id={id + "-type"}
          options={typeOptions}
          value={type}
          defaultOption={defaultOption} />
        <FormInput
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.props.onFocus}
          label="Label"
          name={"label"}
          id={id + "-label"}
          placeholder="My field"
          type="text"
          value={label}
          error={error.label} />
        <FormInput
          onBlur={this.onBlur}
          onChange={this.onChange}
          onFocus={this.props.onFocus}
          label="Name" name={"name"}
          id={id + "-name"}
          placeholder="my-field"
          type="text"
          value={name}
          error={error.name} />
        {type === 'text' || type === 'number' ?
          <FormInput
            onChange={this.onChange}
            onFocus={this.props.onFocus}
            onBlur={this.onBlur}
            label="Placeholder"
            name={"placeholder"}
            id={id + "-placeholder"}
            error={error.placeholder}
            placeholder="My helper text"
            type="text"
            value={placeholder} />
          : null}
        {
          type === 'dropdown' ?
            <React.Fragment>
              <FormConstructorDropdown
                formError={error.select}
                values={items}
                id={id}
                onAdd={this.addOption}
                onDelete={this.deleteOption}
                onChange={this.onOptionChange}
                validations={{defaultValidation: v.fieldValidator.option}}
              />

              {(items && items.length > 1) ?
                <FormSelect
                  onChange={this.onDefaultChange}
                  label="Select default option"
                  value={defaultOption.toString()}
                  id={id + "-default"}
                  options={this.state.defaults}
                  defaultOption={0} /> : null}

            </React.Fragment>

            : null
        }
      </StyledContainer >

    )
  }
}

FormConstructorItem.propTypes = {
  id: PropTypes.string.isRequired,
  values: fieldType.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(errorType),
  formError: PropTypes.objectOf(errorType),
};

export default withValidation()(FormConstructorItem);
