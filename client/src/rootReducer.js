import { combineReducers } from "redux";

import authReducer from "./reducers/authReducer";
import alertReducer from "./reducers/alertReducer";
import contactReducer from "./reducers/contactReducer";
import contactDetailsReducer from "./reducers/contactDetailReducer";
import createContactReducer from "./reducers/createContactReducer";

export default combineReducers({
  auth: authReducer,
  alerts: alertReducer,
  contacts: contactReducer,
  details: contactDetailsReducer,
  create: createContactReducer,
});
