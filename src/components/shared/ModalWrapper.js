import React from 'react';
import Modal from './CustomModal';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

const ModalWrapper = (props) => {
  const modals = props.modals.map(item =>
    <Modal title={item.title} message={item.message} open={true} key={item.id} handleClose={() => props.closeModal(item.id)} />)
  return (
    <div className="modal-wrapper">
      {modals}
    </div>
  );
}

export default connect(
  function mapStateToProps(state) {
    return {
      modals: state.modals.modals
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      closeModal: (id) => dispatch({type: actionTypes.CLOSE_MODAL, payload: id})
    }
  }
)(ModalWrapper);
