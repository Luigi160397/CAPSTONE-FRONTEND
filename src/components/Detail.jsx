import { useEffect } from "react";
import { Alert, Badge, Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDettagioAction, getPreferitiAction } from "../redux/actions";
import CommentArea from "./CommentArea";
import { FaRegStar, FaStar } from "react-icons/fa";

const Detail = () => {
  const params = useParams();
  const url = `http://localhost:3001/films/${params.idFilm}`;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDettagioAction(url));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.idFilm]);

  const film = useSelector(state => state.home.film);
  const preferiti = useSelector(state => state.home.preferiti);

  const isPreferito = preferiti.length > 0 && preferiti.find(favourite => favourite.id === film.id);

  const filmPref = { idFilm: film.id };

  const token = localStorage.getItem("token");
  const addPreferito = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/me/preferiti`, {
        method: "POST",
        body: JSON.stringify(filmPref),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        dispatch(getPreferitiAction());
      }
    } catch (error) {
      Alert(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/me/preferiti/${film.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        dispatch(getPreferitiAction());
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container fluid className="text-light mt-5">
      {film !== null && (
        <>
          <iframe
            className="mb-5"
            width="100%"
            height="500"
            src={film.urlTrailer}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <Row className="justify-content-center gy-5">
            <Col md={8} className="order-2 order-md-1">
              <Row className="justify-content-center gy-5">
                <Col md={10} className="text-center border border-1 rounded-3 card-film-dettaglio position-relative">
                  <h2 className="mt-3 display-3">{film.nome}</h2>
                  <p>{film.annoUscita}</p>
                  <p>{film.categoria}</p>
                  <p>{film.durata}</p>
                  <p>
                    Ratings: <Badge className="me-1 badge-ratings">{film.voto}</Badge>
                  </p>
                  <p>{film.descrizione}</p>
                  {isPreferito ? (
                    <Button
                      onClick={handleDelete}
                      type="button"
                      className="fs-2"
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "transparent",
                        border: "0"
                      }}
                    >
                      <FaStar className="stelle" />
                    </Button>
                  ) : (
                    <Button
                      onClick={addPreferito}
                      type="button"
                      className="fs-2"
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "transparent",
                        border: "0"
                      }}
                    >
                      <FaRegStar className="stelle" />
                    </Button>
                  )}
                </Col>
                <Col md={10}>
                  <CommentArea params={params.idFilm} />
                </Col>
              </Row>
            </Col>
            <Col md={4} className="order-1 order-md-2 d-flex justify-content-center">
              <img
                src={film.urlCopertina}
                alt={film.nome}
                width={400}
                height={800}
                style={{ objectFit: "cover", boxShadow: "0px 0px 13px 0px #ffffff " }}
              />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Detail;
