import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ImBin } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { getCommentiAction } from "../redux/actions";
import { FaPen } from "react-icons/fa";

const SingleComment = ({ comment, params }) => {
  const user = useSelector(state => state.home.user);
  const url1 = `http://localhost:3001/commenti/${params}/${comment.id}`;
  const url2 = `http://localhost:3001/commenti/${params}`;
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.contenuto);

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

  const handleEdit = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(url1, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ contenuto: editedContent })
      });

      if (response.ok) {
        setEditMode(false);
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
        {editMode ? (
          <Form.Control
            className="bg-dark text-light"
            type="text"
            value={editedContent}
            onChange={e => setEditedContent(e.target.value)}
          />
        ) : (
          <>
            <strong>Commento:</strong> {comment.contenuto}
          </>
        )}
      </Col>
      <Col xs={12}>
        <strong>Data e ora:</strong>{" "}
        {new Date(comment.dataOra).toLocaleDateString("it-IT") +
          " h " +
          new Date(comment.dataOra).toLocaleTimeString("it-IT", {
            hour: "numeric",
            minute: "numeric"
          })}
        {user !== null && user.id !== null && user.id === comment.user.id && (
          <>
            <Button type="button" variant="danger" className="text-white ms-3" onClick={handleDelete}>
              <ImBin />
            </Button>
            {editMode ? (
              <Button type="button" variant="outline-secondary" className="ms-3" onClick={handleEdit}>
                Save
              </Button>
            ) : (
              <Button type="button" variant="outline-secondary" className="ms-3" onClick={() => setEditMode(true)}>
                <FaPen />
              </Button>
            )}
          </>
        )}
      </Col>
    </Row>
  );
};

export default SingleComment;
