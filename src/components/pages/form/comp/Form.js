import React from 'react';
import PropTypes from 'prop-types';
import {fieldType, errorsType} from '../../../../types';
import Layout from '../../../layout/Layout';
import withValidation from "../../../hoc/withValidation";
import {Paper, Fab, Typography, CircularProgress} from '@material-ui/core/';
import FormItem from './FormItem';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
}));

function Form({fields, values, onChange, onBlur, onSubmit, onFocus, title, backError, errors, validateForm}) {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validateForm();
    if (valid) {
      onSubmit();
    }
  }

  let content = backError ? <Typography>{backError}</Typography> : <CircularProgress />;

  if (fields) {
    content = <Paper className={classes.paper}>
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
  }

  return (
    <Layout component="form" onSubmit={handleSubmit}
      action={<Fab variant="extended" color="secondary" type="submit" disabled={!fields}>Send form</Fab>}>
      {content}
    </Layout>
  );
}

Form.propTypes = {
 fields: PropTypes.arrayOf(fieldType),
 errors: errorsType,
 values: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])),
 title: PropTypes.string,
 backError: PropTypes.string,
 onFocus: PropTypes.func.isRequired,
 onBlur: PropTypes.func.isRequired,
 validateForm: PropTypes.func.isRequired,
 onSubmit: PropTypes.func.isRequired,
 onChange: PropTypes.func.isRequired,
}

export default withValidation()(Form);
