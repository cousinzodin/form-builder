import React from 'react';
import PropTypes from 'prop-types';
import {optionType, errorType} from '../../../../types';
import FormInput from "../../../shared/FormInput";
import FormCheckbox from "../../../shared/FormCheckbox";
import FormSelect from "../../../shared/FormSelect";


export default function FormItem({type, name, label, placeholder, options, defaultOption, onChange, onBlur, value, error, onFocus}) {
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
        <FormCheckbox onChange={onChange} label={label} name={name} id={name} value={name} checked={value} />
      );
    default:
      return null;
  }

}

FormItem.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: errorType,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  placeholder: PropTypes.string,
  defaultOption: PropTypes.number,
  options: PropTypes.arrayOf(optionType),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
};
