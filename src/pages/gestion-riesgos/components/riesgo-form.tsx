import React, { FormEvent } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Impacto } from "../../../utils/types";
import { impactos, probabilidades } from "../../../utils/constants";

type RiesgoFormProps = {
  onSubmit: (event: FormEvent) => void;
  gestionImpactos: Impacto[];
  validated: boolean;
};

const RiesgoForm = ({
  gestionImpactos,
  onSubmit,
  validated,
}: RiesgoFormProps) => (
  <Form noValidate validated={validated} onSubmit={onSubmit}>
    <Row xs={6}>
      <Col>
        <Form.Group className="mb-3" controlId="riesgo">
          <Form.Label>Riesgo</Form.Label>
          <InputGroup hasValidation>
            <Form.Control required type="text" placeholder="Digite el riesgo" />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el riesgo
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Col>
      <Col xs={2}>
        <Form.Group className="mb-3" controlId="impacto">
          <Form.Label>Impacto</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              as="select"
              type="select"
              aria-label="Impacto"
              required
            >
              <option value="">Escoga una opcion</option>
              {gestionImpactos.map((impacto) => (
                <option value={impacto.value}>{impacto.label}</option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Por favor, escoga el impacto del Riesgo
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Col>
      <Col xs={2}>
        <Form.Group className="mb-3" controlId="probabilidad">
          <Form.Label>Probabilidad</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              as="select"
              type="select"
              required
              aria-label="Impacto"
            >
              <option value="">Escoga una opcion</option>
              {probabilidades.map((probabilidad) => (
                <option value={probabilidad}>{probabilidad}%</option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Por favor, escoga la posibilidad del riesgo
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Col>
      <Col xs={1} className="centerItem">
        <Button type="submit" variant="test" className="btn-test">
          Agregar
        </Button>
      </Col>
    </Row>
  </Form>
);

export default RiesgoForm;
