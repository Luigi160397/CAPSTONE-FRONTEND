export const GET_FILMS = "GET_FILMS";
export const GET_USER_LOGGED = "GET_USER_LOGGED";

export const getFilmsAction = () => {
  const token = localStorage.getItem("token");
  const url = "http://localhost:3001/films";
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
