import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { useDispatch } from "react-redux";
import { getFilmDaModificareAction, getFilmsAction } from "../redux/actions";

const SingoloFilmAdmin = ({ film, handleShowEdit }) => {
  const dispatch = useDispatch();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://192.168.1.9:3001/films/${film.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        dispatch(getFilmsAction(`http://192.168.1.9:3001/films`));
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleShowConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    handleDelete();
    setShowConfirmationModal(false);
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      <p className="text-light text-truncate my-0 fs-3">{film.nome}</p>
      <div className="d-flex flex-nowrap">
        <Button onClick={handleShowConfirmationModal} type="button" variant="danger" className="text-white me-3">
          <ImBin />
        </Button>
        <Button
          onClick={() => {
            dispatch(getFilmDaModificareAction(film));
            handleShowEdit();
          }}
          type="button"
          variant="outline-secondary"
        >
          <FaPen />
        </Button>
      </div>

      {/* Modale di conferma eliminazione */}
      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal} className="text-white form-login">
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Conferma eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">Sei sicuro di voler eliminare questo film?</Modal.Body>
        <Modal.Footer className="bg-dark text-white">
          <Button variant="secondary" onClick={handleCloseConfirmationModal}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SingoloFilmAdmin;
