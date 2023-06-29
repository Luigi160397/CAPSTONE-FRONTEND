import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Film = ({ film }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        navigate(`/films/${film.id}`);
      }}
      style={{ cursor: "pointer", boxShadow: "0px 0px 5px 0px #ffffff " }}
    >
      <Card.Img
        width="200px"
        height="400px"
        className="image-fluid rounded-2"
        style={{ objectFit: "cover" }}
        variant="top"
        src={film.urlCopertina}
      />
    </Card>
  );
};
export default Film;
