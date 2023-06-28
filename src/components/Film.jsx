import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Film = ({ film }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        navigate(`/films/${film.id}`);
      }}
      style={{ cursor: "pointer" }}
    >
      <Card.Img
        width="200px"
        height="400px"
        className="image-fluid"
        style={{ objectFit: "cover" }}
        variant="top"
        src={film.urlCopertina}
      />
    </Card>
  );
};
export default Film;
