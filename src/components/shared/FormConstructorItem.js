import React from 'react';
import PropTypes from 'prop-types';
import styled from '../hoc/styled';
import FormInput from "./FormInput";
import ButtonDelete from "./ButtonDelete";
import FormSelect from "./FormSelect";
import {formatToSnakeCase} from "../../utils";
import {Button, Paper, Typography} from '@material-ui/core';
import {Draggable} from 'react-beautiful-dnd';

const StyledPaperBig = styled(Paper)(theme => ({
  padding: theme.spacing(2),
  paddingTop: 0,
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,
  textAlign: 'left',
  position: 'relative'
}));

const StyledPaper = styled(Paper)(theme => ({
  padding: theme.spacing(2),
  paddingTop: 0,
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1),
  color: theme.palette.text.secondary,
  border: '1px solid',
  borderColor: theme.palette.text.secondary,
  textAlign: 'left',
  position: 'relative'
}));

const CenteredText = styled(Typography)(theme => ({
  textAlign: 'center',
  paddingTop: theme.spacing(2),
}));


export default class FormConstructorItem extends React.Component {
  constructor(props) {
    super();
    this.state = {
      type: props.type,
      name: props.name,
      placeholder: props.placeholder || "",
      label: props.label,
      items: props.items || [],
      defaultOption: props.defaultOption || 0,
      defaults: [],
    }
  }

  types = [{name: 'Text', value: 'text'}, {name: 'Number', value: 'number'}, {name: 'Dropdown', value: 'dropdown'}, {name: 'Checkmark', value: 'checkmark'}];

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
    updatedState[name] = name === "name" ? formatToSnakeCase(value) : value;
    this.setState(updatedState);
  }

  onOptionChange = (e, index) => {
    const {name, value} = e.target;
    const updatedOptions = [...this.state.items];
    updatedOptions[index][name] = name === "value" ? formatToSnakeCase(value) : value;
    this.setState({items: updatedOptions});
    this.updateDefaults();
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

  deleteOption = value => {
    const updatedOptions = this.state.items.filter(item => item.value !== value);
    this.setState({items: updatedOptions});
  }


  save = (state) => {
    const {type, name, label, placeholder, items, defaultOption} = state;
    switch (type) {
      case 'dropdown':
        this.props.onFieldChange({type, name, label, items, default: defaultOption}, this.props.index);
        break;
      case 'checkmark':
        this.props.onFieldChange({type, name, label}, this.props.index);
        break;
      default:
        this.props.onFieldChange({type, name, label, placeholder}, this.props.index);
    }
  }

  onBlur = () => {
    this.save(this.state);
  }

  delete = () => {
    this.props.onDelete(this.state.name);
  }

  render() {
    const {type, name, label, placeholder, items, defaultOption} = this.state;
    return (

      <Draggable draggableId={name} index={this.props.index}>
        {provided => (
          <div ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>

            <StyledPaperBig>
              <ButtonDelete onClick={this.delete} />
              <FormSelect onChange={this.onTypeChange} label="Field type" name={"type"} options={this.types} value={type} defaultOption={defaultOption} />
              <FormInput onChange={this.onChange} onBlur={this.onBlur} label="Label" name={"label"} placeholder="My field" type="text" value={label} />
              <FormInput onBlur={this.onBlur} onChange={this.onChange} label="Name" name={"name"} placeholder="my-field" type="text" value={name} />
              {type === 'text' || type === 'number' ? <FormInput onChange={this.onChange} onBlur={this.onBlur} label="Placeholder" name={"placeholder"} placeholder="My helper text" type="text" value={placeholder} /> : null}
              {type === 'dropdown' ?
                <React.Fragment>
                  <CenteredText>Add or edit options for your dropdown</CenteredText>
                  {(items && items.length) ? items.map((option, index) => {
                    const i = index + 1;
                    return (<StyledPaper key={index} elevation={0}>
                      <ButtonDelete onClick={() => this.deleteOption(option.value)} />
                      <FormInput onChange={(e) => this.onOptionChange(e, index)} onBlur={this.onBlur} label={"Option " + i + " name"} name="name" id={"option-name-field-" + i} placeholder="Option name" type="text" value={option.name} />
                      <FormInput onChange={(e) => this.onOptionChange(e, index)} onBlur={this.onBlur} label={"Option " + i + " value"} name="value" id={"option-value-field-" + i} placeholder="option-value" type="text" value={option.value} />
                    </StyledPaper>)
                  }) : null}
                  <CenteredText>
                    <Button onClick={this.addOption} size="small" variant="contained" color="primary">+ Add option</Button>
                  </CenteredText>
                  {(items && items.length > 1) ? <FormSelect onChange={this.onDefaultChange} label="Select default option" value={defaultOption.toString()} id={"default"} options={this.state.defaults} defaultOption={0} /> : null}
                </React.Fragment>
                : null
              }
            </StyledPaperBig >

          </div>

        )}
      </Draggable>





    )
  }
}

FormConstructorItem.propTypes = {
  inmex: PropTypes.number,
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  defaultOption: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string
  })),
  onFieldChange: PropTypes.func
};
