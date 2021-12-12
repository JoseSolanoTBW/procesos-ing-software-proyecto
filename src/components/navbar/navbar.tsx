import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Procesos</Navbar.Brand>
        <Nav className="me-auto">
        <Nav.Link as={Link} to="/proyectos">
            Proyectos
          </Nav.Link>
          <Nav.Link as={Link} to="/">
            Gestion de Riesgos
          </Nav.Link>
          <Nav.Link as={Link} to="/valor-ganado">
            Valor Ganado
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
