import { Button, Container, ListGroup } from "react-bootstrap";
import SingoloFilmAdmin from "./SingoloFilmAdmin";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import AddFilmModal from "./AddFilmModal";
import EditFilmModal from "./EditFilmModal";

const AdminPage = () => {
  const films = useSelector(state => state.home.films);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showEdit, setShowEdit] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-baseline ">
        <p className="display-3 text-light">Gestione Film: </p>
        <Button
          onClick={() => {
            handleShow();
          }}
          className="border-0 fs-4"
          style={{
            backgroundColor: "#3f51b5"
          }}
        >
          <FaPlus />
        </Button>
        <AddFilmModal show={show} handleClose={handleClose} />
        <EditFilmModal showEdit={showEdit} handleCloseEdit={handleCloseEdit} />
      </div>
      <ListGroup className="mt-3" style={{ boxShadow: "0px 0px 13px 0px #ffffff" }}>
        {films.map(film => (
          <ListGroup.Item key={film.id} className="bg-black text-white">
            <SingoloFilmAdmin film={film} handleShowEdit={handleShowEdit} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default AdminPage;
