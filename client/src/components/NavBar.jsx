import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaMessage } from "react-icons/fa6";

export default function NavBar() {
  const { user, logoutUser } = useContext(AuthContext);
  // console.log(user);
  return (
    <>
      <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
        <Container>
          <h2>
            <Link className="text-light text-decoration-none" to="/">
              ChatApp
            </Link>
          </h2>
          {user?.email && (
            <span className="text-warning">Logged in as {user?.name}</span>
          )}
          <Nav>
            <Stack direction="horizontal" gap={3}>
              {!user && (
                <>
                  <Link className="text-light text-decoration-none" to="/login">
                    Login
                  </Link>
                  <Link
                    className="text-light text-decoration-none"
                    to="/register"
                  >
                    Register
                  </Link>
                </>
              )}
              {user && (
                <>
                  <FaMessage onClick={()=>alert('Hello World')}/>
                  <Link
                    onClick={() => logoutUser()}
                    className="text-light text-decoration-none"
                    to="/"
                  >
                    Logout
                  </Link>
                </>
              )}
            </Stack>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
