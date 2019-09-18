import PropTypes from 'prop-types';
import {fieldTypes} from './config';

export const optionType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
});

export const fieldType = PropTypes.shape({
  type: PropTypes.oneOf(fieldTypes).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  default: PropTypes.number,
  items: PropTypes.arrayOf(optionType),
});

export const formType = PropTypes.shape({
  name: PropTypes.string,
  fields: PropTypes.arrayOf(fieldType),
});

export const formInfoType = PropTypes.shape({
  name: PropTypes.string,
  fields: PropTypes.number,
  id: PropTypes.number,
});

export const modalType = PropTypes.shape({
  title: PropTypes.string,
  message: PropTypes.string,
  id: PropTypes.number,
});

export const errorType = PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(null)]);
