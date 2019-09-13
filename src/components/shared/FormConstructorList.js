import React from 'react';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import FormConstructorItem from './FormConstructorItem';

export default function FormConstructorList(props) {
  const {fields, onFieldChange, onDragEnd, onDelete} = props;

  const items = fields.map((field, index) => (
    <FormConstructorItem
      key={field.name}
      index={index}
      onFieldChange={onFieldChange}
      onDelete={onDelete}
      type={field.type}
      name={field.name}
      label={field.label}
      placeholder={field.placeholder}
      items={field.items}
      default={field.default} />
  ));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

