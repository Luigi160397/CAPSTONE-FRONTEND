import { GET_FILMS, GET_USER_LOGGED } from "../actions";

const initialState = {
  films: [],
  user: null
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FILMS:
      return {
        ...state,
        films: action.payload
      };
    case GET_USER_LOGGED:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export default homeReducer;
