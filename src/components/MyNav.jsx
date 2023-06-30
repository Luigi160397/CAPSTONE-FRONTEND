import { Container, DropdownButton, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";

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
            <Link className="nav-link text-white" to={"/"}>
              Home
            </Link>
          )}
        </Nav>
        {location.pathname !== "/login" && location.pathname !== "/register" && (
          <>
            {user !== null && (
              <DropdownButton
                className="border-0"
                id="drop-nav"
                title={
                  <>
                    <FaRegUser /> {user.nome}
                  </>
                }
              >
                <Link className="dropdown-item" to="/login">
                  Cambia Utente
                </Link>
                <Link className="dropdown-item" to="/register">
                  Registra nuovo Utente
                </Link>

                <Link className="dropdown-item" to={`/${user.id}/preferiti`}>
                  Lista preferiti
                </Link>
                {user.role !== null && user.role === "ADMIN" && (
                  <Link className="dropdown-item" to={`/admin`}>
                    Back-office
                  </Link>
                )}
              </DropdownButton>
            )}
          </>
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
