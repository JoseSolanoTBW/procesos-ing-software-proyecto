import React, { FormEvent, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

type AddFormProps = {
  agregarSemanas: () => void;
  agregarActividad: (actividad: string) => void;
};
const AddForm = ({ agregarSemanas, agregarActividad }: AddFormProps) => {
  const [validated, setValidated] = useState(false);
  const onSubmitActividad = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget as any;
    if (form.checkValidity()) {
      agregarActividad(form.actividad.value);
      form.reset();
      setValidated(false);
    } else {
      setValidated(true);
    }
  };
  return (
    <Row>
      <Col>
        <Form noValidate validated={validated} onSubmit={onSubmitActividad}>
          <Row style={{ justifyContent: "space-around" }}>
            <Col xs={8}>
              <Form.Group className="mb-3" controlId="actividad">
                <Form.Label>Actividad</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Digite la Actividad"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, digite la actividad
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
      </Col>
      <Col className="centerItem">
        <Button onClick={agregarSemanas} variant="test" className="btn-test">
          Agregar Semanas
        </Button>
      </Col>
    </Row>
  );
};

export default AddForm;
