import React from "react";
import PropTypes from 'prop-types';
import {Draggable} from 'react-beautiful-dnd';

const withDraggable = WrappedComponent => {
  function DruggableComp({draggableId, index, ...props}) {
    return (
      <Draggable draggableId={draggableId} index={index}>
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
    )
  };

  DruggableComp.propTypes = {
    draggableId: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  };

  return DruggableComp;
};

export default withDraggable;
