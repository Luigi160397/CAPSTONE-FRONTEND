import { Alert, Col, Container, Row } from "react-bootstrap";
import FilmPreferito from "./FilmPreferito";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPreferitiAction } from "../redux/actions";
import { Link } from "react-router-dom";

const Preferiti = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPreferitiAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const preferiti = useSelector(state => state.home.preferiti);
  return (
    <Container className="my-4">
      {preferiti.length > 0 ? (
        <>
          <p className="display-3 text-white">I tuoi preferiti:</p>
          <Row className="row-cols-1 row-cols-md-2 row-cols-lg-4 row-gap-3">
            <>
              {preferiti.map(film => (
                <Col key={film.id}>
                  <FilmPreferito film={film} />
                </Col>
              ))}
            </>
          </Row>
        </>
      ) : (
        <Alert
          className="fs-4 text-light"
          style={{ border: "1px solid #3f51b5 !important", backgroundColor: "#3f51b559" }}
        >
          Non ci sono preferiti salvati! Aggiungine qualcuno per visualizzarlo in questa sezione.{" "}
          <Link className="text-light" to={"/"}>
            Torna alla home.
          </Link>
        </Alert>
      )}
    </Container>
  );
};

export default Preferiti;
