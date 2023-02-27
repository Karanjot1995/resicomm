import { SET_IS_LOGGED } from "../actionTypes/actionTypes";

const initialState = {
  isLogged: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOGGED:
      return {
        ...state,
        isLogged: true,
      };
    default:
      return state;
  }
};