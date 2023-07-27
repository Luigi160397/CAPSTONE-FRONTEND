import { Button, Container, ListGroup, Toast, ToastContainer } from "react-bootstrap";
import SingoloFilmAdmin from "./SingoloFilmAdmin";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import AddFilmModal from "./AddFilmModal";
import EditFilmModal from "./EditFilmModal";
import { getFilmsAction } from "../redux/actions";
import logo from "../assets/logo.png";

const AdminPage = () => {
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
  const url = `http://localhost:3001/films`;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFilmsAction(url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const films = useSelector(state => state.home.films);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showEdit, setShowEdit] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  return (
    <div className="position-relative container-admin" aria-live="polite" aria-atomic="true">
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
            data-aos-anchor=".container-admin"
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
      <Container data-aos="zoom-out" data-aos-duration="500" data-aos-easing="ease-in-out" className="my-4">
        <div className="d-flex justify-content-between align-items-baseline ">
          <p className="display-3 text-light">Gestione Film: </p>
          <Button
            onClick={() => {
              handleShow();
            }}
            className="border-0 fs-4 bottoni"
          >
            <FaPlus />
          </Button>
          <AddFilmModal show={show} handleClose={handleClose} handleShowToast={handleShowToast} />
          <EditFilmModal showEdit={showEdit} handleCloseEdit={handleCloseEdit} handleShowToast={handleShowToast} />
        </div>
        <ListGroup
          data-aos="zoom-out"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-delay="500"
          className="mt-3"
          style={{ boxShadow: "0px 0px 13px 0px #ffffff" }}
        >
          {films.map(film => (
            <ListGroup.Item key={film.id} className="bg-black text-white">
              <SingoloFilmAdmin film={film} handleShowEdit={handleShowEdit} handleShowToast={handleShowToast} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default AdminPage;
