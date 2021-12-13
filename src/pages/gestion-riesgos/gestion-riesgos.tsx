import React, { FormEvent, useState } from "react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  impactos,
  probabilidades,
  tablaRiesgos,
  riesgos,
  proyectos,
} from "../../utils/constants";
import RiesgoForm from "./components/riesgo-form";
import TablasValores from "./components/tablas-valores";
import "./gestion-riesgos.css";
import "@inovua/reactdatagrid-enterprise/index.css";
import "@inovua/reactdatagrid-community/theme/default-dark.css";
import { TableRiesgo, Proyecto } from "../../utils/types";

const columns = [
  {
    name: "riesgo",
    header: "Riesgo",
    minWidth: 50,
    defaultFlex: 2,
  },
  {
    name: "proyecto",
    header: "Proyecto",
    minWidth: 50,
    defaultFlex: 2,
    render: ({ data }: { data: TableRiesgo }) => {
      console.log(data);
      var result = proyectos.filter((p) => p.id == data.proyectoId);
      console.log(result);
      return <span>{result[0].nombre}</span>;
    },
  },
  { name: "impacto", header: "Impacto", maxWidth: 1000, defaultFlex: 1 },
  {
    name: "probabilidad",
    header: "Probabilidad",
    maxWidth: 1000,
    defaultFlex: 1,
  },

  {
    name: "probImpact",
    header: "Probabilidad x Impacto",
    maxWidth: 1000,
    defaultFlex: 1,
    render: ({ data }: { data: TableRiesgo }) =>
      (data.impacto * (data.probabilidad / 100)).toFixed(2),
  },
  {
    name: "rango",
    header: "Rango",
    maxWidth: 1000,
    defaultFlex: 1,
    render: ({ data }: { data: TableRiesgo }) => {
      const resultado = data.impacto * (data.probabilidad / 100);
      let rango = riesgos.find((riesgo) => {
        return resultado > riesgo.min && resultado < (riesgo.max || 9000);
      });
      return <span style={{ color: rango?.color }}>{rango?.label}</span>;
    },
  },
];

const GestionRiesgos = () => {
  // Rows are stored in the state.
  const [rows, setRows] = useState<TableRiesgo[]>(tablaRiesgos);
  const [gestionImpactos, setImpactos] = useState(impactos);
  const [gestionProyectos, setProyectos] = useState(proyectos);
  const [validated, setValidated] = useState(false);
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget as any;
    if (form.checkValidity()) {
      setRows((rows) => [
        ...rows,
        {
          id: Date.now(),
          impacto: form.impacto.value,
          probabilidad: form.probabilidad.value,
          riesgo: form.riesgo.value,
          proyectoId: form.proyecto.value,
          proyecto: "",
        },
      ]);
      form.reset();
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  return (
    <Container fluid className="container">
      <TablasValores />
      <RiesgoForm
        validated={validated}
        gestionImpactos={gestionImpactos}
        onSubmit={onSubmit}
        gestionProyectos={gestionProyectos}
      />

      <ReactDataGrid
        style={{ minHeight: 400 }}
        columns={columns}
        theme="default-dark"
        dataSource={rows}
        idProperty="id"
      />
    </Container>
  );
};

export default GestionRiesgos;
