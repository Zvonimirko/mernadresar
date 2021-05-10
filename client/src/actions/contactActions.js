import axios from "axios";
import {
  GET_CONTACTS,
  CONTACTS_ERROR,
  GET_CONTACT,
  CONTACT_ERROR,
  TOGGLE_FAVOURITE,
  CREATE_CONTACT,
  CREATE_CONTACT_ERROR,
  CLEAR_CONTACT,
  SEARCH_CONTACTS,
  SORT_CONTACTS,
  PAGINATE_CONTACTS,
} from "./types";

import { setAlert } from "./alertActions";
import { loadUser } from "./authActions";

// create contact

export const createContact = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };

  const data = JSON.stringify(formData);
  try {
    const res = await axios.post("/api/contacts", data, config);

    dispatch({
      type: CREATE_CONTACT,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)));
    }

    dispatch({
      type: CREATE_CONTACT_ERROR,
    });
  }
};

// get contacts

export const getContacts = (page, location) => async (dispatch) => {
  dispatch({ type: CLEAR_CONTACT });

  try {
    dispatch(loadUser());
    const res = await axios.get("/api/contacts");

    dispatch({
      type: GET_CONTACTS,
      payload: res.data,
    });
    dispatch(paginateContacts(page, location));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)));
    }

    dispatch({
      type: CONTACTS_ERROR,
    });
  }
};

// get contact

export const getContactById = (contact_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/contacts/${contact_id}`);

    dispatch({
      type: GET_CONTACT,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)));
    }

    dispatch({
      type: CONTACT_ERROR,
    });
  }
};

//toggle favourite

export const toggleFavourite = (contact_id) => async (dispatch) => {
  try {
    await axios.put(`/api/contacts/favourite/${contact_id}`);

    dispatch({
      type: TOGGLE_FAVOURITE,
      payload: contact_id,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)));
    }

    dispatch({ type: CONTACTS_ERROR });
  }
};

// search contacts

export const searchContacts = (text, page, location) => async (dispatch) => {
  await dispatch(getContacts(page, location));
  dispatch({
    type: SEARCH_CONTACTS,
    payload: text,
  });
  if (text.length === 0) {
    dispatch(getContacts(page, location));
  }
  dispatch(paginateContacts(page, location));
};

// sort contacts

export const sortContacts = (order, page, location) => (dispatch) => {
  dispatch({ type: SORT_CONTACTS, payload: order });
  dispatch(paginateContacts(page, location));
};

// delete contact

export const deleteContact = (contact_id) => async (dispatch) => {
  try {
    await axios.delete(`/api/contacts/${contact_id}`);

    dispatch(setAlert("Contact deleted"));
  } catch (err) {
    dispatch({ CONTACT_ERROR });
  }
};

// paginate contacts

export const paginateContacts = (page, location) => (dispatch) => {
  dispatch({
    type: PAGINATE_CONTACTS,
    payload: {
      page,
      location,
    },
  });
};
