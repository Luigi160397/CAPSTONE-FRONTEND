import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getFilmsAction } from "../redux/actions";
import { MdDoneOutline } from "react-icons/md";
import { GrCircleAlert } from "react-icons/gr";

const EditFilmModal = ({ showEdit, handleCloseEdit, handleShowToast }) => {
  const dispatch = useDispatch();

  const [film, setFilm] = useState(null);
  const movie = useSelector(state => state.home.filmEdit);

  useEffect(() => {
    if (!movie) return;
    setFilm({
      nome: movie.nome,
      urlCopertina: movie.urlCopertina,
      categoria: movie.categoria,
      descrizione: movie.descrizione,
      voto: movie.voto,
      durata: movie.durata,
      annoUscita: movie.annoUscita,
      urlTrailer: movie.urlTrailer
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie]);

  const editFilm = async e => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3001/films/${movie.id}`, {
        method: "PUT",
        body: JSON.stringify(film),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        dispatch(getFilmsAction(`http://localhost:3001/films`));
        handleShowToast("Film modificato", <MdDoneOutline />);
        handleCloseEdit();
      }
    } catch (error) {
      alert(error);
      handleShowToast("Errore nella modifica!", <GrCircleAlert />);
    }
  };

  return (
    <Modal show={showEdit} onHide={handleCloseEdit} className="text-white form-login">
      <Modal.Header className="bg-dark text-white" closeButton>
        <Modal.Title>Modifica film</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        {film !== null && (
          <Form onSubmit={editFilm}>
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
              Modifica
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditFilmModal;
