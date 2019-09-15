import React from 'react';
import FormConstructorItem from './FormConstructorItem';
import withDraggable from '../hoc/withDruggable';
import withDroppable from '../hoc/withDroppable';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
}));

const DraggableItem = withDraggable(FormConstructorItem);

const FormConstructorList = (props) => {
  const classes = useStyles();
  const {fields, onFieldChange, onDelete} = props;

  const items = fields.map((field, index) => (
    <DraggableItem
      key={field.name}
      draggableId={field.name}
      index={index}
      onFieldChange={onFieldChange}
      onDelete={onDelete}
      type={field.type}
      name={field.name}
      label={field.label}
      placeholder={field.placeholder}
      items={field.items}
      default={field.default}
    />
  ));

  return (
    <ul className={classes.root}>
      {items}
    </ul>
  );
}

export default withDroppable("field-list")(FormConstructorList);
