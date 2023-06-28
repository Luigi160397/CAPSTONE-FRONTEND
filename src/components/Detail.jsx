import { useEffect } from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDettagioAction } from "../redux/actions";
import CommentArea from "./CommentArea";

const Detail = () => {
  const params = useParams();
  const url = `http://localhost:3001/films/${params.idFilm}`;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDettagioAction(url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.idFilm]);

  const film = useSelector(state => state.home.film);

  return (
    <Container fluid className="text-light mt-5">
      {film !== null && (
        <Row className="justify-content-center gy-5">
          <Col md={8} className="order-2 order-md-1">
            <Row className="justify-content-center gy-5">
              <Col md={10} className="text-center ">
                <h2 className="mt-3 display-3">{film.nome}</h2>
                <p>{film.annoUscita}</p>
                <p>{film.categoria}</p>
                <p>{film.durata}</p>
                <p>
                  Ratings:{" "}
                  <Badge bg="danger" className="me-1">
                    {film.voto}
                  </Badge>
                </p>
                <p>{film.descrizione}</p>
              </Col>
              <Col md={10}>
                <CommentArea params={params.idFilm} />
              </Col>
            </Row>
          </Col>
          <Col md={4} className="order-1 order-md-2 d-flex justify-content-center">
            <img src={film.urlCopertina} alt={film.nome} width={400} height={800} style={{ objectFit: "cover" }} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Detail;
