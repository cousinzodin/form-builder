import React from 'react';
import PropTypes from 'prop-types';
import {fieldType, errorsType} from '../../../../types';
import {Paper, Fab, Typography} from '@material-ui/core/';
import withValidation from "../../../hoc/withValidation";
import FormItem from './FormItem';
import {makeStyles} from '@material-ui/core/styles';
import AppFooter from '../../../layout/AppFooter';


const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
}));

function Form({fields, values, onChange, onBlur, onSubmit, onFocus, title, errors, validateForm}) {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validateForm();
    if (valid) {
      onSubmit();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Paper className={classes.paper}>
        <Typography variant="h6">{title}</Typography>
        {fields.map(field => (<FormItem
          value={values[field.name]}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          key={field.name}
          type={field.type}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          options={field.items}
          error={errors[field.name]}
          defaultOption={field.default} />))}
      </Paper>
      <AppFooter>
        <Fab variant="extended" color="secondary" type="submit" disabled={!fields}>Send form</Fab>
      </AppFooter>
    </form>
  );
}

Form.propTypes = {
  fields: PropTypes.arrayOf(fieldType),
  errors: errorsType,
  values: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])),
  title: PropTypes.string,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default withValidation()(Form);
