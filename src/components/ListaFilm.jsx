import { Col, Container, Row } from "react-bootstrap";
import Film from "./Film";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFilmsAction } from "../redux/actions";

const ListFilm = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilmsAction());
  }, []);

  const films = useSelector(state => state.home.films);
  return (
    <Container className="my-4">
      <Row className="row-cols-1 row-cols-md-2 row-cols-lg-4 row-gap-3">
        <>
          {films.map(film => (
            <Col>
              <Film film={film} />
            </Col>
          ))}
        </>
      </Row>
    </Container>
  );
};

export default ListFilm;
