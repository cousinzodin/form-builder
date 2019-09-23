import * as actionTypes from './actionTypes';
import axios from '../../axios';
import {showModal} from './modals';
import {clearFormDraft, createFormDraft} from './draft';
import {clearFormList} from './forms';

export const addForm = (payload) => {
  return {
    type: actionTypes.ADD_FORM,
    payload
  };
};

export const clearForm = () => {
  return {
    type: actionTypes.CLEAR_FORM,
  };
};

export const fetchForm = (id) => {
  return dispatch => {
    axios.get("forms/" + id)
      .then(response => {
        dispatch(addForm(response.data));
        // dispatch(addFormDetails(response.data));
      })
      .catch(error => {});
  };
};

export const editForm = (id, form, history) => {
  return dispatch => {
    axios.put("forms/" + id, form)
      .then(response => {
        if (response) {
          dispatch(showModal({title: "Form has been saved"}));
          dispatch(clearFormList());
          history.push("/");
        }
      })
      .catch(error => {});
  };
};

export const createForm = (form, history) => {
  return dispatch => {
    axios.post("forms/new", form)
      .then(response => {
        if (response.data.id) {
          dispatch(showModal({title: "Form has been saved"}));
          dispatch(clearFormList());
          dispatch(clearFormDraft("new"));
          history.push("/")
        }
      }).catch(error => {});
  };
};

export const fillForm = (id, data) => {
  return dispatch => {
    axios.post("fills/" + id, data)
      .then(response => {
        if (response.data.id) {
          dispatch(showModal({title: "Form has been sent"}));
        }
      })
      .catch(error => {});
  }
}

export const fetchFormForEditing = (id, history) => {
  return dispatch => {
    axios.get("fills/" + id)
      .then(response => {
        if (response.data.length > 0) {
          history.replace("/form/" + id);
          dispatch(showModal({title: "You can't edit this form", message: "This form has already been filled"}));
          return;
        } else {
          axios.get("forms/" + id)
            .then(response => {
              dispatch(createFormDraft(response.data));
            })
            .catch(error => {});
        }
      })
      .catch(error => {});
  }
}
