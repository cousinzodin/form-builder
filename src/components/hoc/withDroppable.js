import React from "react";
import {Droppable, DragDropContext} from 'react-beautiful-dnd';

const withDraggable = droppableId => WrappedComponent => ({...props}) => (
  <DragDropContext onDragEnd={props.onDragEnd}>
    <Droppable droppableId={droppableId}>
      {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <WrappedComponent {...props} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

export default withDraggable;
