import { CREATE_CONTACT, CREATE_CONTACT_ERROR } from "../actions/types";

const initialState = {
  createdContact: null,
  loading: true,
};

const createContactReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case CREATE_CONTACT:
      return {
        ...state,
        createdContact: payload,
        loading: false,
      };
    case CREATE_CONTACT_ERROR:
      return {
        ...state,
        createdContact: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default createContactReducer;
