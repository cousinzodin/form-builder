import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

const withErrorHandler = (axios) => (WrappedComponent) => {
  class Comp extends Component {
    constructor() {
      super();
      this.state = {
        error: null
      }
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
        this.props.showModal({title: "Something went wrong", message: error.message});
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    render() {
      return (
        <WrappedComponent error={this.state.error ? this.state.error.message : null} {...this.props} axios={axios} />
      );
    }
  }

  return connect(
    function mapStateToProps(state) {
      return {
        modals: state.modals.modals
      };
    },
    function mapDispatchToProps(dispatch) {
      return {
        showModal: (modal) => dispatch(actions.showModal(modal)),
        //closeModal: (id) => dispatch({type: actionTypes.CLOSE_MODAL, payload: id})
      }
    }
  )(Comp)
}

export default withErrorHandler;

