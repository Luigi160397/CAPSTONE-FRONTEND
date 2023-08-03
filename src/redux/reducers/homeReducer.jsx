import {
  GET_COMMENTI,
  GET_DETTAGLIO,
  GET_FILMS,
  GET_FILM_DA_MODIFICARE,
  GET_PREFERITI,
  GET_USER_LOGGED
} from "../actions";

const initialState = {
  films: [],
  user: null,
  film: null,
  commenti: [],
  preferiti: [],
  filmEdit: null
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
    case GET_PREFERITI:
      return {
        ...state,
        preferiti: action.payload
      };
    case GET_FILM_DA_MODIFICARE:
      return {
        ...state,
        filmEdit: action.payload
      };
    default:
      return state;
  }
};

export default homeReducer;
