import { useEffect } from "react";
import Jumbo from "./Jumbo";
import ListFilm from "./ListaFilm";
import { useDispatch } from "react-redux";
import { getUserLoggedAction } from "../redux/actions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserLoggedAction());
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
