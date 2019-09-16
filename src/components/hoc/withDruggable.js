import React from "react";
import {Draggable} from 'react-beautiful-dnd';

const withDraggable = WrappedComponent => ({draggableId, ...props}) => (
  <Draggable draggableId={draggableId} index={props.index}>
    {(provided, snapshot) => (
      <li ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <div style={{backgroundColor: snapshot.isDragging ? "lightblue" : "white"}} >
          <WrappedComponent {...props} />
        </div>

      </li>

    )}
  </Draggable>
);

export default withDraggable;
