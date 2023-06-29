import { Button, Col, Row } from "react-bootstrap";
import { ImBin } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { getCommentiAction } from "../redux/actions";

const SingleComment = ({ comment, params }) => {
  const user = useSelector(state => state.home.user);
  const url1 = `http://localhost:3001/commenti/${params}/${comment.id}`;
  const url2 = `http://localhost:3001/commenti/${params}`;
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(url1, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        dispatch(getCommentiAction(url2));
      }
    } catch (error) {
      alert(error);
    }
  };
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
        {user !== null && user.id !== null && user.id === comment.user.id && (
          <Button type="button" variant="danger" className="text-white ms-3" onClick={handleDelete}>
            <ImBin />
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default SingleComment;
