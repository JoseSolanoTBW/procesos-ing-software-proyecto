import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
type NombreProyectoProps = {
  nombreProyecto: { nombre: string; edit: boolean };
  setNombreProyecto: (prev: any) => any;
};

const NombreProyecto = ({
  nombreProyecto,
  setNombreProyecto,
}: NombreProyectoProps) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="nombreProyecto">
        <Col sm="10">
          <Form.Control
            className="nombreProyecto"
            value={nombreProyecto.nombre}
            type="text"
            onClick={() =>
              setNombreProyecto((prev: { nombre: string; edit: boolean }) => ({
                ...prev,
                edit: true,
              }))
            }
            onBlur={() =>
              setNombreProyecto((prev: { nombre: string; edit: boolean }) => ({
                ...prev,
                edit: false,
              }))
            }
            onChange={(event) =>
              setNombreProyecto((prev: { nombre: string; edit: boolean }) => ({
                ...prev,
                nombre: event.target.value,
              }))
            }
            plaintext
            readOnly={!nombreProyecto.edit}
            defaultValue="email@example.com"
          />
        </Col>
      </Form.Group>
    </Form>
  );
};

export default NombreProyecto;
