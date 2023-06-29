import { useEffect, useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCommentiAction } from "../redux/actions";
import SingleComment from "./SingleComment";

const CommentArea = ({ params }) => {
  const [commento, setCommento] = useState({
    contenuto: ""
  });
  const url = `http://localhost:3001/commenti/${params}`;
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommentiAction(url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const sendCommento = async e => {
    e.preventDefault();

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(commento),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        setCommento({
          contenuto: ""
        });
        dispatch(getCommentiAction(url));
      }
    } catch (error) {
      alert(error);
    }
  };

  const comments = useSelector(state => state.home.commenti);
  return (
    <>
      {comments.length > 0 ? (
        <>
          <h5 className="display-6 text-white">Commenti:</h5>
          <ListGroup className="mt-3" style={{ boxShadow: "0px 0px 13px 0px #ffffff" }}>
            {comments.map(comment => (
              <ListGroup.Item className="bg-black text-white" key={comment.id}>
                <SingleComment comment={comment} />
              </ListGroup.Item>
            ))}
            <ListGroup.Item className="bg-black text-white">
              <Form onSubmit={sendCommento} className="d">
                <Form.Control
                  className="bg-dark text-light placeholder-white"
                  type="text"
                  rows={2}
                  placeholder="Aggiungi un commento..."
                  value={commento.contenuto}
                  onChange={e => setCommento({ ...commento, contenuto: e.target.value })}
                />
              </Form>
            </ListGroup.Item>
          </ListGroup>
        </>
      ) : (
        <h5 className="text-center">Non ci sono commenti per questo film.</h5>
      )}
    </>
  );
};

export default CommentArea;
