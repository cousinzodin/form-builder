import React from 'react';
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
      return (
        <FormSelect label={label} id={name} options={options} defaultOption={options[defaultOption].value} />
      )
    case 'checkmark':
      return (
        <FormCheckbox label={label} name={name} />
      );
    default:
      return null;
  }

}
