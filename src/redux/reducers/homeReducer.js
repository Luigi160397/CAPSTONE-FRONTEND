import { GET_COMMENTI, GET_DETTAGLIO, GET_FILMS, GET_USER_LOGGED } from "../actions";

const initialState = {
  films: [],
  user: null,
  film: null,
  commenti: []
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
    case GET_DETTAGLIO:
      return {
        ...state,
        film: action.payload
      };
    case GET_COMMENTI:
      return {
        ...state,
        commenti: action.payload
      };
    default:
      return state;
  }
};

export default homeReducer;
