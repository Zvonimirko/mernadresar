import {
  GET_CONTACT,
  CONTACT_ERROR,
  CLEAR_CONTACT,
  DELETE_CONTACT,
} from ".././actions/types";

const initialState = {
  contact: null,
  loading: true,
};

const contactReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CONTACT:
      return {
        ...state,
        contact: payload,
        loading: false,
      };
    case CONTACT_ERROR:
    case DELETE_CONTACT:
      return {
        ...state,
        loading: false,
        contact: null,
      };
    case CLEAR_CONTACT:
      return {
        ...state,
        loading: true,
        contact: null,
      };
    default:
      return state;
  }
};

export default contactReducer;
