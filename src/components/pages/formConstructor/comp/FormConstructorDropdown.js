import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormInput from '../../../shared/FormInput';
import withValidation from '../../../hoc/withValidation';
import PropTypes from 'prop-types';
import {optionType, errorType} from '../../../../types';
import ButtonDelete from "../../../shared/ButtonDelete";
import {formatToKebabCase} from "../../../../utils";
import {Button, Paper, Typography, FormHelperText, Box} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    paddingTop: 0,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
    border: '1px solid',
    borderColor: theme.palette.text.secondary,
    textAlign: 'left',
    position: 'relative',
    backgroundColor: "inherit",
  },
  centered: {
    textAlign: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    margin: "0",
  }

}));

function FormConstructorDropdown({onChange, onBlur, onAdd, onDelete, errors, formError, id, values, onFocus}) {
  const classes = useStyles();

  const handleChange = (e, index) => {
    const {value} = e.target;
    const option = {name: value, value: formatToKebabCase(value)}
    onChange(option, index);
  }

  return (
    <Box className={classes.centered}>
      <Typography gutterBottom>Add or edit options for your dropdown </Typography>
      {formError ? <FormHelperText className={classes.centered} error={true}>{formError}</FormHelperText> : null}

      {(values && values.length) ? values.map((option, index) => {
        const i = index + 1;
        return (<Paper className={classes.paper} key={id + index} elevation={0}>
          <ButtonDelete onClick={() => onDelete(option.name)} />
          <FormInput
            onChange={(e) => handleChange(e, index)}
            onBlur={onBlur} label={"Option " + i + " name"}
            onFocus={onFocus}
            name={"option-" + index} id={id + "-option-name-field-" + i}
            placeholder="Option name"
            type="text"
            value={option.name}
            error={errors["option-" + index]} />
        </Paper>)
      }) : null}
      <Button onClick={onAdd} size="small" variant="contained" color="primary">+ Add option</Button>
    </Box>
  );
}

FormConstructorDropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(optionType).isRequired,
  formError: errorType,
  errors: PropTypes.objectOf(errorType),
};


export default withValidation()(FormConstructorDropdown);
