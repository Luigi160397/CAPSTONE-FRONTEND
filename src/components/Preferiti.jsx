import { Col, Container, Row } from "react-bootstrap";
import FilmPreferito from "./FilmPreferito";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPreferitiAction } from "../redux/actions";

const Preferiti = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPreferitiAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const preferiti = useSelector(state => state.home.preferiti);
  return (
    <Container className="my-4">
      <Row className="row-cols-1 row-cols-md-2 row-cols-lg-4 row-gap-3">
        <>
          {preferiti.map(film => (
            <Col key={film.id}>
              <FilmPreferito film={film} />
            </Col>
          ))}
        </>
      </Row>
    </Container>
  );
};

export default Preferiti;
