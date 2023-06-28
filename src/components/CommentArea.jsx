import { useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCommentiAction } from "../redux/actions";

const CommentArea = ({ params }) => {
  const url = `http://localhost:3001/commenti/${params}`;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommentiAction(url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const comments = useSelector(state => state.home.commenti);
  return (
    <>
      {comments.length > 0 ? (
        <>
          <h5 className="display-6 text-white">Commenti:</h5>
          <ListGroup className="mt-3">
            {comments.map(comment => (
              <ListGroup.Item className="bg-black text-white" key={comment.id}>
                <Row>
                  <Col className="text-truncate" xs={12}>
                    <strong>Autore:</strong> {comment.user.username}
                  </Col>
                  <Col xs={12}>
                    <strong>Commento:</strong> {comment.contenuto}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : (
        <h5 className="text-center">Non ci sono commenti per questo film.</h5>
      )}
    </>
  );
};

export default CommentArea;
