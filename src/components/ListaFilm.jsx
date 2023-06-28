import { Col, Container, Row } from "react-bootstrap";
import Film from "./Film";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFilmsAction } from "../redux/actions";

const ListFilm = () => {
  const dispatch = useDispatch();
  const url = `http://localhost:3001/films?nome=`;

  useEffect(() => {
    dispatch(getFilmsAction(url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const films = useSelector(state => state.home.films);
  const user = useSelector(state => state.home.user);
  return (
    <Container className="my-4">
      {user !== null ? (
        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-4 row-gap-3">
          <>
            {films.map(film => (
              <Col key={film.id}>
                <Film film={film} />
              </Col>
            ))}
          </>
        </Row>
      ) : (
        <p className="display-3 text-center">Loggati o registrati per visualizzare i film!</p>
      )}
    </Container>
  );
};

export default ListFilm;
