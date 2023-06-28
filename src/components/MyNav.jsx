import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";

const MyNav = () => {
  const location = useLocation();

  const user = useSelector(state => state.home.user);
  return (
    <Navbar className="sticky-top" bg="dark" data-bs-theme="dark">
      <Container>
        <div className="navbar-brand text-white">
          <img className="me-1" width="30px" height="30px" src={logo} alt="logo" />
          FilmVerse
        </div>

        <Nav className="me-auto">
          {location.pathname !== "/login" && location.pathname !== "/register" && (
            <Link className="nav-link text-white" to={"/home"}>
              Home
            </Link>
          )}
        </Nav>
        {location.pathname !== "/login" && location.pathname !== "/register" && (
          <Navbar.Text>Signed in as: {user !== null && <Link to="/login">{user.nome}</Link>}</Navbar.Text>
        )}
        {location.pathname === "/login" && (
          <Link className="nav-link text-white" to={"/register"}>
            Register
          </Link>
        )}
        {location.pathname === "/register" && (
          <Link className="nav-link text-white" to={"/login"}>
            Login
          </Link>
        )}
      </Container>
    </Navbar>
  );
};

export default MyNav;
