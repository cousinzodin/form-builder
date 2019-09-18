import React from "react";
import PropTypes from 'prop-types';
import {Droppable, DragDropContext} from 'react-beautiful-dnd';

const withDraggable = droppableId => WrappedComponent => {
  function DroppableComp(props) {
    return (<DragDropContext onDragEnd={props.onDragEnd}>
      <Droppable droppableId={droppableId}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <WrappedComponent {...props} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>);
  }
  DroppableComp.propTypes = {
    onDragEnd: PropTypes.func,
  };
  return DroppableComp;
}

export default withDraggable;
