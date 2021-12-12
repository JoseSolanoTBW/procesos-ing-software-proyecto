import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import { impactos, riesgos } from "../../../utils/constants";

const TablasValores = () => {
  return (
    <Row xs={6}>
      <Col xs={4}>
        <Table striped bordered hover variant="dark">
          <caption>Rangos de Impacto</caption>
          <thead>
            <tr>
              <th>Rango</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {impactos.map((impacto) => (
              <tr>
                <td>{impacto.label}</td>
                <td>{impacto.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>

      <Col xs={4}>
        <Table striped bordered hover variant="dark">
          <caption>Rangos de Riesgo</caption>
          <thead>
            <tr>
              <th>Rango</th>
              <th>Min</th>
              <th>Max</th>
              <th>Representación</th>
            </tr>
          </thead>
          <tbody>
            {riesgos.map((riesgo) => (
              <tr>
                <td>{riesgo.label}</td>
                <td>{riesgo.min}</td>
                <td>{riesgo.max || "infinito"}</td>
                <td className="centerItem">
                  <div
                    style={{ backgroundColor: riesgo.color }}
                    className="color"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};
export default TablasValores;
