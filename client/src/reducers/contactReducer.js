import {
  GET_CONTACTS,
  CONTACTS_ERROR,
  TOGGLE_FAVOURITE,
  CLEAR_CONTACTS,
  SEARCH_CONTACTS,
  SORT_CONTACTS,
  PAGINATE_CONTACTS,
} from ".././actions/types";

const initialState = {
  contacts: [],
  loading: true,
  contactsPerPage: [],
};

const contactReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: payload,
        loading: false,
      };
    case TOGGLE_FAVOURITE:
      return {
        ...state,
        contactsPerPage: state.contactsPerPage.map((contact) => {
          if (contact._id === payload) {
            return { ...contact, favourite: !contact.favourite };
          }
          return contact;
        }),
        contacts: state.contacts.map((contact) => {
          if (contact._id === payload) {
            return { ...contact, favourite: !contact.favourite };
          }
          return contact;
        }),
        loading: false,
      };
    case PAGINATE_CONTACTS:
      let newContactsPerPage;
      if (payload.location === "/favourites") {
        newContactsPerPage = state.contacts
          .filter((contact) => contact.favourite === true)
          .slice(payload.page * 7, payload.page * 7 + 7);
      } else {
        newContactsPerPage = state.contacts.slice(
          payload.page * 7,
          payload.page * 7 + 7
        );
      }
      return {
        ...state,
        contactsPerPage: [...newContactsPerPage],
      };
    case SEARCH_CONTACTS:
      return {
        ...state,
        contacts: state.contacts.filter((contact) => {
          return (
            contact.name.toLowerCase().includes(payload.toLowerCase()) ||
            contact.lastname.toLowerCase().includes(payload.toLowerCase())
          );
        }),
      };
    case SORT_CONTACTS:
      let newArr;
      if (payload === "asc") {
        newArr = state.contacts.sort(function (a, b) {
          return a.lastname.localeCompare(b.lastname);
        });
      } else if (payload === "desc") {
        newArr = state.contacts.sort(function (b, a) {
          return a.lastname.localeCompare(b.lastname);
        });
      } else {
        newArr = state.contacts;
      }
      return {
        ...state,
        contacts: newArr,
      };
    case CONTACTS_ERROR:
    case CLEAR_CONTACTS:
      return {
        ...state,
        loading: false,
        contacts: [],
      };
    default:
      return state;
  }
};

export default contactReducer;
