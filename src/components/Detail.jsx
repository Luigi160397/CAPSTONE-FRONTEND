import { useEffect, useState } from "react";
import { Alert, Badge, Button, Col, Container, Row, Toast, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDettagioAction, getPreferitiAction } from "../redux/actions";
import CommentArea from "./CommentArea";
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdDoneOutline } from "react-icons/md";
import { GrCircleAlert } from "react-icons/gr";
import logo from "../assets/logo.png";

const Detail = () => {
  const [showToast, setShowToast] = useState(false);
  const [testoToast, setTestoToast] = useState("");
  const [iconaToast, setIconaToast] = useState(null);

  const handleShowToast = (testo, icona) => {
    setIconaToast(icona);
    setTestoToast(testo);
    setShowToast(true);
  };

  const handleHideToast = () => {
    setShowToast(false);
  };
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const url = `http://localhost:3001/films/${params.idFilm}`;
    dispatch(getDettagioAction(url));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.idFilm]);

  const film = useSelector(state => state.home.film);
  const preferiti = useSelector(state => state.home.preferiti);

  const isPreferito = preferiti.length > 0 && preferiti.find(favourite => favourite.id === params.idFilm);

  const filmPref = { idFilm: params.idFilm };

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
        handleShowToast("Film Aggiunto ai preferiti", <MdDoneOutline />);
      }
    } catch (error) {
      Alert(error);
      handleShowToast("Errore nell'aggiunta!", <GrCircleAlert />);
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
        handleShowToast("Film rimosso dai preferiti", <MdDoneOutline />);
      }
    } catch (error) {
      alert(error);
      handleShowToast("Errore nella rimozione!", <GrCircleAlert />);
    }
  };

  return (
    <div className="position-relative container-detail" aria-live="polite" aria-atomic="true">
      {showToast && (
        <ToastContainer
          className="p-3"
          position="bottom-end"
          style={{ zIndex: 1, position: "fixed", bottom: "20px", right: "20px" }}
        >
          <Toast
            onClose={handleHideToast}
            data-aos="zoom-out"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-anchor=".container-detail"
            show={showToast}
            delay={10000}
            autohide
            className="text-light"
            style={{ zIndex: 1, border: "1px solid #3f51b5 !important", backgroundColor: "#3f51b559" }}
          >
            <Toast.Header className="custom-toast-header text-light">
              <img className="me-1" width="15px" height="15px" src={logo} alt="logo" />
              <strong className="me-auto">FilmVerse</strong>
            </Toast.Header>
            <Toast.Body>
              {iconaToast && iconaToast} {testoToast}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      <Container fluid className="text-light mt-5">
        {film !== null && (
          <>
            <iframe
              data-aos="zoom-out"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              className="mb-5"
              width="100%"
              height="500"
              src={film.urlTrailer}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <Row className="justify-content-center gy-5">
              <Col md={8} className="order-2 order-md-1">
                <Row className="justify-content-center gy-5">
                  <Col
                    data-aos="zoom-out"
                    data-aos-duration="500"
                    data-aos-easing="ease-in-out"
                    data-aos-delay="500"
                    md={10}
                    className="text-center border border-1 rounded-3 card-film-dettaglio position-relative"
                    style={{ maxWidth: "96%" }}
                  >
                    <h2 className="mt-3 display-3 px-5">{film.nome}</h2>
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
                  <Col
                    data-aos="zoom-out"
                    data-aos-duration="500"
                    data-aos-easing="ease-in-out"
                    data-aos-delay="500"
                    md={10}
                  >
                    <CommentArea params={params.idFilm} handleShowToast={handleShowToast} />
                  </Col>
                </Row>
              </Col>
              <Col
                data-aos="zoom-out"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-delay="500"
                md={4}
                className="order-1 order-md-2 d-flex justify-content-center"
              >
                <div style={{ maxWidth: "400px" }}>
                  <img
                    src={film.urlCopertina}
                    alt={film.nome}
                    width={400}
                    height={800}
                    style={{ objectFit: "cover", boxShadow: "0px 0px 13px 0px #ffffff " }}
                    className="img-fluid"
                  />
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default Detail;
