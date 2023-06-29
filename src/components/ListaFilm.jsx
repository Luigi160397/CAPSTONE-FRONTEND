import { Col, Container, Form, Row } from "react-bootstrap";
import Film from "./Film";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFilmsAction } from "../redux/actions";

const ListFilm = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const url = `http://localhost:3001/films?nome=${query}`;

  useEffect(() => {
    dispatch(getFilmsAction(url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const films = useSelector(state => state.home.films);
  const user = useSelector(state => state.home.user);
  return (
    <Container className="my-4">
      {user !== null ? (
        <>
          <Form onSubmit={e => e.preventDefault()}>
            <Form.Group className="mb-3">
              <Form.Label className="text-light fs-3">Cerca tra i nostri film:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il nome di un film"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Row className="row-cols-1 row-cols-md-2 row-cols-lg-4 row-gap-3">
            <>
              {films.map(film => (
                <Col key={film.id}>
                  <Film film={film} />
                </Col>
              ))}
            </>
          </Row>
        </>
      ) : (
        <p className="display-3 text-center">Loggati o registrati per visualizzare i film!</p>
      )}
    </Container>
  );
};

export default ListFilm;
