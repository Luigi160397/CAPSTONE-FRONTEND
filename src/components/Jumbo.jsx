import { Container } from "react-bootstrap";

const Jumbo = () => {
  return (
    <Container fluid className="px-0 d-flex justify-content-center jumbo">
      <div className="text-center mt-4 mx-2">
        <h1 className="display-1 text-white">FilmVerse</h1>
        <p className="display-6 text-white align-bottom">Il portale per gli amanti del cinema</p>
      </div>
    </Container>
  );
};

export default Jumbo;
