import { Card } from "react-bootstrap";

const Film = ({ film }) => {
  return (
    <Card>
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
