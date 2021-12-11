import React, { FormEvent, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { impactos, probabilidades } from "../../utils/constants";
import RiesgoForm from "./components/riesgo-form";
import "./gestion-riesgos.css";
const GestionRiesgos = () => {
  const [gestionImpactos, setImpactos] = useState(impactos);
  const [validated, setValidated] = useState(false);
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget as any;
    if (form.checkValidity()) {
      //add to the table
    }
    setValidated(true);
  };
  return (
    <Container fluid>
      <RiesgoForm
        validated={validated}
        gestionImpactos={gestionImpactos}
        onSubmit={onSubmit}
      />
    </Container>
  );
};

export default GestionRiesgos;
