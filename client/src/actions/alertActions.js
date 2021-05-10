import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuidv4 } from "uuid";

export const setAlert = (message) => (dispatch) => {
  const uuid = uuidv4();

  dispatch({
    type: SET_ALERT,
    payload: { msg: message, id: uuid },
  });

  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: uuid });
  }, 3000);
};
