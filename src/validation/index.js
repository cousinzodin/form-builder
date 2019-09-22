export const noLongerThan = (length) => (data, errorMsg = ('Max length is ' + length)) => (length >= data.length)
  ? null
  : errorMsg;

export const longerThan = (length) => (data, errorMsg = "Please add options") => (data && data.length > length)
  ? null
  : errorMsg;

export const isNumber = (data, errorMsg) => Number.isInteger(data) ? null : errorMsg;
export const isFilled = (data, errorMsg = 'Please fill this field') => data ? null : errorMsg;
export const isUnique = (values) => (data, errorMsg = "Value must be unique") => isFilled(data) ? isFilled(data) : values.filter(item => item === data).length > 1
  ? errorMsg
  : null;

const optionsValidator = (data, errorMsg = "All options must be named") => {
  const hasOptions = longerThan(0)(data);
  return hasOptions ? hasOptions :
    data.find(option => !option.name || !option.value) ? errorMsg : null;
}

export const fieldValidator = {
  name: isFilled,
  label: isFilled,
  option: isFilled,
  placeholder: noLongerThan(30),
  default: isNumber,
  items: optionsValidator,
}

export const validateField = (names) => (v) => {
  let error = null;
  const name = isUnique(names)(v.name);
  const label = fieldValidator.label(v.label);
  if (name) error = error ? {...error, name} : {name};
  if (label) error = error ? {...error, label} : {label};
  switch (v.type) {
    case 'text':
    case 'number':
      const placeholder = fieldValidator.placeholder(v.placeholder);
      if (placeholder) error = error ? {...error, placeholder} : {placeholder};
      break;
    case 'dropdown':
      const select = fieldValidator.items(v.items);
      if (select) error = error ? {...error, select} : {select};
      break;
    default:
      break;
  }
  return error;
}
