import { Button } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { useDispatch } from "react-redux";
import { getFilmsAction } from "../redux/actions";

const SingoloFilmAdmin = ({ film }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:3001/films/${film.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        dispatch(getFilmsAction(`http://localhost:3001/films`));
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      <p className="text-light text-truncate my-0 fs-3">{film.nome}</p>
      <div className="d-flex flex-nowrap">
        <Button onClick={handleDelete} type="button" variant="danger" className="text-white me-3">
          <ImBin />
        </Button>
        <Button type="button" variant="outline-secondary">
          <FaPen />
        </Button>
      </div>
    </div>
  );
};

export default SingoloFilmAdmin;
