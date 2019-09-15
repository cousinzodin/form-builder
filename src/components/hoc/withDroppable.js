import React from "react";
import {Droppable} from 'react-beautiful-dnd';

const withDraggable = droppableId => WrappedComponent => ({...props}) => (
  <Droppable droppableId={droppableId}>
    {provided => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        <WrappedComponent {...props} />
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default withDraggable;
