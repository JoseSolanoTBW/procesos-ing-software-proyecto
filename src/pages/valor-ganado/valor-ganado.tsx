import ReactDataGrid from "@inovua/reactdatagrid-community";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { ValorGanadoActividad } from "../../utils/types";
import AddForm from "./components/add-form";
import NombreProyecto from "./components/nombre-proyecto";
import { baseColumns, baseRows } from "./valor-ganado-base";
import "./valor-ganado.css";

const ValorGanado = () => {
  const [calculos, setCalculos] = useState({ pv: 0 });
  const [nombreProyecto, setNombreProyecto] = useState({
    nombre: "Digite el nombre del proyecto aqui",
    edit: false,
  });
  const [semanas, setSemanas] = useState(baseColumns);
  const [planeado, setValoresPlaneados] = useState<ValorGanadoActividad[]>(
    baseRows()
  );
  const [real, setValoresReales] = useState<ValorGanadoActividad[]>(baseRows());

  const agregarSemanas = () => {
    setSemanas((prev: any) => {
      const total = prev.pop();
      return [
        ...prev,
        {
          name: `sem${prev.length - 1}`,
          header: `Semana ${prev.length - 1}`,
          maxWidth: 1000,
          defaultFlex: 1,
          type: "number",
          render: ({ value }: { value: number }) => value || 0,
        },
        total,
      ];
    });
  };

  const agregarActividad = (actividad: string) => {
    setValoresPlaneados((prev) => [...prev, { id: prev.length, actividad }]);
    setValoresReales((prev) => [...prev, { id: prev.length, actividad }]);
  };
  //hacer calculos aqui
  useEffect(() => {
    const pv = planeado
      .map((plan) => plan.total)
      .reduce(
        (accumulator, item) =>
          //@ts-ignore
          (accumulator || 0) + (item || 0)
      );
    //@ts-ignore
    setCalculos({ pv });
  }, [real, planeado]);

  const onEditPlanComplete = useCallback(
    ({ value = "", columnId = "", rowId = 0 }) => {
      //actualiza el valor
      const data = [...planeado];
      data[rowId][columnId] = value;
      //calcula el total
      let total = 0;
      Object.keys(data[rowId]).forEach((key) => {
        if (key.includes("sem")) {
          total = total + (Number(data[rowId][key]) || 0);
        }
      });
      console.log(total);

      data[rowId].total = total;
      setValoresPlaneados(data);
    },
    [planeado]
  );
  const onEditRealComplete = useCallback(
    ({ value, columnId, rowId }) => {
      //actualiza el valor
      const data = [...real];
      data[rowId][columnId] = value;
      //calcula el total
      let total = 0;
      Object.keys(data[rowId]).forEach((key) => {
        if (key.includes("sem")) {
          total = total + (Number(data[rowId][key]) || 0);
        }
      });
      console.log(total);

      data[rowId].total = total;
      setValoresReales(data);
    },
    [planeado]
  );

  return (
    <Container>
      <NombreProyecto
        nombreProyecto={nombreProyecto}
        setNombreProyecto={setNombreProyecto}
      />
      <AddForm
        agregarSemanas={agregarSemanas}
        agregarActividad={agregarActividad}
      />
      <h3>Planeado</h3>
      <ReactDataGrid
        style={{ minHeight: 300 }}
        onEditComplete={onEditPlanComplete}
        editable={true}
        columns={semanas}
        theme="default-dark"
        dataSource={planeado}
        idProperty="id"
      />
      <p>PV: {calculos.pv}</p>
      <h3>Valores Reales</h3>
      <ReactDataGrid
        style={{ minHeight: 300 }}
        onEditComplete={onEditRealComplete}
        editable={true}
        columns={semanas}
        theme="default-dark"
        dataSource={real}
        idProperty="id"
      />
    </Container>
  );
};

export default ValorGanado;
