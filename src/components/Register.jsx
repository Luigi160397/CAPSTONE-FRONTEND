import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
    nome: "",
    cognome: ""
  });

  const navigate = useNavigate();

  const sendRegister = async e => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/auth/register`, {
        method: "POST",
        body: JSON.stringify(register),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        setRegister({
          username: "",
          email: "",
          password: "",
          nome: "",
          cognome: ""
        });

        navigate("/login");
      }
    } catch (error) {
      alert(error);
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
        <Form className=" rounded p-5 form-register" onSubmit={sendRegister}>
          <p className="text-center text-light fs-5">Registrati a FilmVerse</p>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              className="bg-dark text-light input-login"
              placeholder="Inserisci il tuo username"
              value={register.username}
              onChange={e => setRegister({ ...register, username: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              className="bg-dark text-light input-login"
              placeholder="Inserisci la tua email"
              value={register.email}
              onChange={e => setRegister({ ...register, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              className="bg-dark text-light input-login"
              placeholder="Inserisci la tua password"
              value={register.password}
              onChange={e => setRegister({ ...register, password: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              required
              type="text"
              className="bg-dark text-light input-login"
              placeholder="Inserisci il tuo nome"
              value={register.nome}
              onChange={e => setRegister({ ...register, nome: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              required
              type="text"
              className="bg-dark text-light input-login"
              placeholder="Inserisci il tuo cognome"
              value={register.cognome}
              onChange={e => setRegister({ ...register, cognome: e.target.value })}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="border-0 bottoni" type="submit">
              Registrati
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};
export default Register;
