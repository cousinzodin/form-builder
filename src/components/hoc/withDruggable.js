import React from "react";
import {Draggable} from 'react-beautiful-dnd';

const withDraggable = WrappedComponent => ({draggableId, ...props}) => (
  <Draggable draggableId={draggableId} index={props.index}>
    {(provided, snapshot) => (
      <div ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{backgroundColor: snapshot.isDragging ? "lightblue" : "white"}}
      >
        <WrappedComponent isDragging={snapshot.isDragging} {...props} />
      </div>

    )}
  </Draggable>
);

export default withDraggable;
