import { useEffect } from "react";
import Jumbo from "./Jumbo";
import ListFilm from "./ListaFilm";
import { useDispatch } from "react-redux";
import { getFilmsAction, getUserLoggedAction } from "../redux/actions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserLoggedAction());
    dispatch(getFilmsAction("http://localhost:3001/films"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Jumbo />
      <ListFilm />
    </>
  );
};

export default Home;
