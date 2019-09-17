import React from 'react';
import PropTypes from 'prop-types';
import FormInput from "../../../shared/FormInput";
import FormCheckbox from "../../../shared/FormCheckbox";
import FormSelect from "../../../shared/FormSelect";


export default function FormItem(props) {
  const {type, name, label, placeholder, options, defaultOption, onChange, onBlur, value, error, onFocus} = props;

  switch (type) {
    case 'text':
    case 'number':
      return (
        <FormInput onChange={onChange} onBlur={onBlur} onFocus={onFocus} label={label} id={name + "-field"} name={name} placeholder={placeholder} type={type} value={value ? value.toString() : ""} error={error} />
      )
    case 'dropdown':
      return (options && options.length) ? <FormSelect onChange={onChange} label={label} id={name} options={options} value={value} defaultOption={defaultOption} /> : null;
    case 'checkmark':
      return (
        <FormCheckbox onChange={onChange} label={label} name={name} value={name} checked={value} />
      );
    default:
      return null;
  }

}

FormItem.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  checked: PropTypes.string,
  placeholder: PropTypes.string,
  defaultOption: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string
  })),
  onChange: PropTypes.func
};
