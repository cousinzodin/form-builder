import React from 'react';
import PropTypes from 'prop-types';
import {fieldType, errorsType} from '../../../../types';
import {makeStyles} from '@material-ui/core/styles';
import {Paper, Fab, Button, CircularProgress, Box, Typography} from '@material-ui/core/';
import FormConstructorItem from './FormConstructorItem';
import withDraggable from '../../../hoc/withDruggable';
import withDroppable from '../../../hoc/withDroppable';
import Layout from '../../../layout/Layout';
import FormInput from '../../../shared/FormInput';
import {MAX_FIELDS_PER_FORM} from '../../../../config';
import withValidation from '../../../hoc/withValidation';
import * as v from "../../../../validation";

const DraggableItem = withDraggable(FormConstructorItem);
const DroppableList = withDroppable("field-list")(Box);
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    paddingTop: 0,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,
    textAlign: 'left',
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0
  }
}));

function FormConstructorForm({order, values, onFieldChange, onNameChange, onBlur, onSubmit, onAddField, onDelete, onReorder, backError, errors, validateForm, onFocus, clearError}) {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validateForm();
    if (valid) {
      onSubmit();
    }
  }

  let content = backError ? <Typography>{backError}</Typography>  : <CircularProgress />;
  if (order) {
    const items = order.map((id, index) => {
      const field = values[id];
      return (
        <DraggableItem
          key={id}
          id={id}
          draggableId={id}
          index={index}
          onFieldChange={onFieldChange}
          onDelete={onDelete}
          values={field}
          validations={v.fieldValidator}
          formError={errors[id]}
          clearFormError={clearError}
        />);
    });
    content =
      <React.Fragment>
        <Paper className={classes.paper}>
          <FormInput onBlur={onBlur} onFocus={onFocus} onChange={onNameChange} name="formTitle" label="Form title" id="new-form-title-field" placeholder="My new form" value={values.formTitle} error={errors['formTitle']} />
        </Paper>

        <DroppableList component="ul" className={classes.list} onDragEnd={onReorder}>
          {items}
        </DroppableList>

        {order.length > MAX_FIELDS_PER_FORM ? null : <Button onClick={onAddField} variant="contained" color="primary">+ Add new field</Button>}
      </React.Fragment>;
  }
  return (
    <Layout component="form" onSubmit={handleSubmit} withLink
      action={<Fab variant="extended" color="secondary" type="submit" disabled={!order || order.length < 1}
      > Save Form </Fab>}>
      {content}
    </Layout>
  );
}

FormConstructorForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onAddField: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onReorder: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
  order: PropTypes.arrayOf(PropTypes.string),
  backError: PropTypes.string,
  values: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, fieldType])).isRequired,
  errors: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, errorsType])),
};

export default withValidation()(FormConstructorForm);
