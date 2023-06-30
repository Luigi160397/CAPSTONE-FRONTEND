export const GET_FILMS = "GET_FILMS";
export const GET_USER_LOGGED = "GET_USER_LOGGED";
export const GET_DETTAGLIO = "GET_DETTAGLIO";
export const GET_COMMENTI = "GET_COMMENTI";
export const GET_PREFERITI = "GET_PREFERITI";
export const GET_FILM_DA_MODIFICARE = "GET_FILM_DA_MODIFICARE";

export const getFilmDaModificareAction = film => ({ type: GET_FILM_DA_MODIFICARE, payload: film });

export const getFilmsAction = url => {
  const token = localStorage.getItem("token");

  return async dispatch => {
    try {
      let resp = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (resp.ok) {
        let films = await resp.json();
        films.content.sort(() => Math.random() - 0.5);

        dispatch({ type: GET_FILMS, payload: films.content });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserLoggedAction = () => {
  const token = localStorage.getItem("token");
  const url = "http://localhost:3001/users/me";
  return async dispatch => {
    try {
      let resp = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (resp.ok) {
        let data = await resp.json();

        dispatch({ type: GET_USER_LOGGED, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDettagioAction = url => {
  const token = localStorage.getItem("token");

  return async dispatch => {
    try {
      let resp = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (resp.ok) {
        let film = await resp.json();

        dispatch({ type: GET_DETTAGLIO, payload: film });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCommentiAction = url => {
  const token = localStorage.getItem("token");

  return async dispatch => {
    try {
      let resp = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (resp.ok) {
        let commenti = await resp.json();

        dispatch({ type: GET_COMMENTI, payload: commenti });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPreferitiAction = () => {
  const token = localStorage.getItem("token");
  const url = "http://localhost:3001/users/me/preferiti";
  return async dispatch => {
    try {
      let resp = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (resp.ok) {
        let data = await resp.json();

        dispatch({ type: GET_PREFERITI, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
