import React from 'react';
import PropTypes from 'prop-types';
import {modalType} from '../../types';
import Modal from './CustomModal';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

const ModalWrapper = (props) => {
  const modals = props.modals.map(item =>
    <Modal title={item.title} message={item.message} open={true} key={item.id} handleClose={() => props.closeModal(item.id)} />)
  return (
    <div className="modal-wrapper">
      {modals}
    </div>
  );
}

ModalWrapper.propTypes = {
  modals: PropTypes.arrayOf(modalType),
  closeModal: PropTypes.func
};

export default connect(
  function mapStateToProps(state) {
    return {
      modals: state.modals.modals
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      closeModal: (id) => dispatch(actions.closeModal(id))
    }
  }
)(ModalWrapper);
