import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getFilmsAction } from "../redux/actions";

const AddFilmModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const url = `http://192.168.1.9:3001/films`;
  const [film, setFilm] = useState({
    nome: "",
    urlCopertina: "",
    categoria: "",
    descrizione: "",
    voto: "",
    durata: "",
    annoUscita: "",
    urlTrailer: ""
  });

  const addFilm = async e => {
    const token = localStorage.getItem("token");
    e.preventDefault();

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(film),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        setFilm({
          nome: "",
          urlCopertina: "",
          categoria: "",
          descrizione: "",
          voto: "",
          durata: "",
          annoUscita: "",
          urlTrailer: ""
        });
        dispatch(getFilmsAction(url));
        handleClose();
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Modal show={show} onHide={handleClose} className="text-white form-login">
      <Modal.Header className="bg-dark text-white" closeButton>
        <Modal.Title>Aggiungi film</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <Form onSubmit={addFilm}>
          <Form.Group className="mb-3" controlId="nome">
            <Form.Label>Nome film</Form.Label>
            <Form.Control
              className="bg-dark text-light input-login"
              type="text"
              placeholder="Es: Harry Potter"
              autoFocus
              required
              value={film.nome}
              onChange={e => setFilm({ ...film, nome: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="urlCopertina">
            <Form.Label>Url copertina</Form.Label>
            <Form.Control
              className="bg-dark text-light input-login"
              type="text"
              placeholder="Es: http://www..."
              autoFocus
              required
              value={film.urlCopertina}
              onChange={e => setFilm({ ...film, urlCopertina: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="categoria">
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              className="bg-dark text-light input-login"
              as="select"
              value={film.categoria}
              onChange={e => setFilm({ ...film, categoria: e.target.value })}
            >
              <option value="AZIONE">AZIONE</option>
              <option value="FANTASY">FANTASY</option>
              <option value="FANTASCIENZA">FANTASCIENZA</option>
              <option value="DRAMMATICO">DRAMMATICO</option>
              <option value="COMMEDIA">COMMEDIA</option>
              <option value="ANIMAZIONE">ANIMAZIONE</option>
              <option value="THRILLER">THRILLER</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="descrizione">
            <Form.Label>Descrizione</Form.Label>
            <Form.Control
              className="bg-dark text-light input-login"
              as="textarea"
              rows={3}
              placeholder="Es: Il film diretto da..."
              autoFocus
              required
              value={film.descrizione}
              onChange={e => setFilm({ ...film, descrizione: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="voto">
            <Form.Label>Voto</Form.Label>
            <Form.Control
              className="bg-dark text-light input-login"
              type="text"
              autoFocus
              placeholder="Es: 2/5"
              required
              value={film.voto}
              onChange={e => setFilm({ ...film, voto: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="durata">
            <Form.Label>Durata</Form.Label>
            <Form.Control
              className="bg-dark text-light input-login"
              type="text"
              placeholder="Es: 1h 49m"
              required
              autoFocus
              value={film.durata}
              onChange={e => setFilm({ ...film, durata: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="annoUscita">
            <Form.Label>Anno di uscita</Form.Label>
            <Form.Control
              className="bg-dark text-light input-login"
              type="text"
              placeholder="Es: 2012"
              required
              autoFocus
              value={film.annoUscita}
              onChange={e => setFilm({ ...film, annoUscita: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="urlTrailer">
            <Form.Label>Url trailer</Form.Label>
            <Form.Control
              className="bg-dark text-light input-login"
              type="text"
              placeholder="Es: http://www.youtube..."
              required
              autoFocus
              value={film.urlTrailer}
              onChange={e => setFilm({ ...film, urlTrailer: e.target.value })}
            />
          </Form.Group>
          <Button className="me-auto bottoni" type="submit">
            Salva
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default AddFilmModal;
