import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  RESET_REGISTER_SUCCESS,
} from "./types";

export const login = (value)=> async (dispatch) => {
  const body = JSON.stringify(value);
  dispatch({
    type: SET_AUTH_LOADING,
  });
  try {
    const res = await fetch("api/account/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });
    if (res.status === 200) {
        console.log(res, "res")
      dispatch({
        type: LOGIN_SUCCESS,
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  })
};

export const reset_register_succ = () => (dispatch) => {
  dispatch({
    type: RESET_REGISTER_SUCCESS,
  });
};
