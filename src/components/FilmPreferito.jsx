import { Button, Card } from "react-bootstrap";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getPreferitiAction } from "../redux/actions";

const FilmPreferito = ({ film }) => {
  const navigate = useNavigate();
  const url = `http://localhost:3001/users/me/preferiti/${film.id}`;
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(url, {
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
    <Card style={{ boxShadow: "0px 0px 5px 0px #ffffff " }}>
      <Card.Img
        width="200px"
        height="400px"
        className="image-fluid rounded-2 position-relative"
        style={{ objectFit: "cover" }}
        variant="top"
        src={film.urlCopertina}
      />
      <Button
        variant="danger"
        type="button"
        onClick={handleDelete}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px"
        }}
      >
        <ImCross />
      </Button>
      <Button
        className="bottone-more"
        type="button"
        onClick={() => {
          navigate(`/films/${film.id}`);
        }}
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          backgroundColor: "#3f51b5",
          border: "0"
        }}
      >
        More...
      </Button>
    </Card>
  );
};

export default FilmPreferito;