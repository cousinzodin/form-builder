import React from 'react';
import PropTypes from 'prop-types';
import FormInput from "./FormInput";
import FormCheckbox from "./FormCheckbox";
import FormSelect from "./FormSelect";


export default function FormItem(props) {
  const {type, name, label, placeholder, options, defaultOption} = props;

  switch (type) {
    case 'text':
    case 'number':
      return (
        <FormInput label={label} id={name} placeholder={placeholder} type={type} />
      )
    case 'dropdown':
      return (options && options.length) ? <FormSelect label={label} id={name} options={options} defaultOption={options[defaultOption].value} /> : null;
    case 'checkmark':
      return (
        <FormCheckbox label={label} name={name} />
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
  placeholder: PropTypes.string,
  defaultOption: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string
  }))
};
