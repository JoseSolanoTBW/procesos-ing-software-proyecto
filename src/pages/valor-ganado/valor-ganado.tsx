import ReactDataGrid from "@inovua/reactdatagrid-community";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { ValorGanadoActividad } from "../../utils/types";
import AddForm from "./components/add-form";
import NombreProyecto from "./components/nombre-proyecto";
import { baseColumns, baseRows } from "./valor-ganado-base";
import "./valor-ganado.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ValorGanado = () => {

  var data = [
    {
      name: 'Semana 1',
      valorGanado: 4000,
      valorEstimado: 2400,
      valorReal: 3400,
    },
    {
      name: 'Semana 2',
      valorGanado: 3000,
      valorEstimado: 1398,
      valorReal: 4210,
    },
    {
      name: 'Semana 3',
      valorGanado: 2000,
      valorEstimado: 9800,
      valorReal: 3290,
    },
    {
      name: 'Semana 4',
      valorGanado: 2780,
      valorEstimado: 3908,
      valorReal: 4000,
    },
    {
      name: 'Semana 5',
      valorGanado: 1890,
      valorEstimado: 4800,
      valorReal: 3181,
    },
    {
      name: 'Semana 6',
      valorGanado: 2390,
      valorEstimado: 3800,
      valorReal: 3500,
    },
    {
      name: 'Semana 7',
      valorGanado: 3490,
      valorEstimado: 4300,
      valorReal: 3100,
    },
  ];

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
      <h3>Gráfico</h3>
      <LineChart
          width={1100}
          height={400}
          data={data}
          margin={{
            top: 100,
            right: 100,
            left: 100,
            bottom: 100,
          }}
      >
        <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="valorGanado" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="valorEstimado" stroke="#82ca9d" />
          <Line type="monotone" dataKey="valorReal" stroke="#DA302B" />
        </LineChart>
    </Container>
  );
};

export default ValorGanado;
