import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserLoggedAction } from "../redux/actions";
import logo from "../assets/logo.png";

const Login = () => {
  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const sendLogin = async e => {
    e.preventDefault();

    try {
      const response = await fetch(`http://192.168.1.9:3001/auth/login`, {
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
      } else {
        throw new Error("Credenziali non valide! Ritenta!");
      }
    } catch (error) {
      setError(error);
      setErrorMessage(error.message);
    }
  };
  return (
    <>
      <div
        data-aos="zoom-out"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        className="text-center text-light mt-5 mb-3 fs-3"
      >
        <img className="me-1" width="30px" height="30px" src={logo} alt="logo" />
        FilmVerse
      </div>
      <Container
        data-aos="zoom-out"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-delay="500"
        className="text-light d-flex justify-content-center align-items-center"
      >
        <Form className=" rounded p-5 form-login" onSubmit={sendLogin}>
          <p className="text-center text-light fs-5">Accedi a FilmVerse</p>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              className="bg-dark text-light input-login"
              placeholder="Inserisci il tuo username"
              value={login.username}
              onChange={e => setLogin({ ...login, username: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              className="bg-dark text-light input-login"
              placeholder="Inserisci la tua password"
              value={login.password}
              onChange={e => setLogin({ ...login, password: e.target.value })}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="border-0 bottoni" type="submit">
              Entra
            </Button>
          </div>
          {error && (
            <Alert className="mt-3" variant="danger" onClose={() => setError(null)} dismissible>
              {errorMessage}
            </Alert>
          )}
        </Form>
      </Container>
    </>
  );
};

export default Login;
