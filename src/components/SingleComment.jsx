import { Col, Row } from "react-bootstrap";

const SingleComment = ({ comment }) => {
  return (
    <Row>
      <Col className="text-truncate" xs={12}>
        <strong>Autore:</strong> {comment.user.username}
      </Col>
      <Col xs={12}>
        <strong>Commento:</strong> {comment.contenuto}
      </Col>
      <Col xs={12}>
        <strong>Data e ora:</strong>{" "}
        {new Date(comment.dataOra).toLocaleDateString("it-IT") +
          " h " +
          new Date(comment.dataOra).toLocaleTimeString("it-IT", { hour: "numeric", minute: "numeric" })}
      </Col>
    </Row>
  );
};

export default SingleComment;
