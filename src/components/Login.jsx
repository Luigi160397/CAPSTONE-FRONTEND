import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserLoggedAction } from "../redux/actions";

const Login = () => {
  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const sendLogin = async e => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/auth/login`, {
        method: "POST",
        body: JSON.stringify(login),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("token", data.accessToken);

        setLogin({
          username: "",
          password: ""
        });
        dispatch(getUserLoggedAction());
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Container className="text-light d-flex justify-content-center align-items-center">
      <Form
        style={{
          border: "3px solid #3f51b5 !important",
          backgroundColor: "black"
        }}
        className=" rounded p-5 mt-5"
        onSubmit={sendLogin}
      >
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il tuo username"
            value={login.username}
            onChange={e => setLogin({ ...login, username: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Inserisci la tua password"
            value={login.password}
            onChange={e => setLogin({ ...login, password: e.target.value })}
          />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button
            className="border-0"
            style={{
              backgroundColor: "#3f51b5"
            }}
            type="submit"
          >
            Entra
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
