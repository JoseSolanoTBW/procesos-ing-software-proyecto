import ReactDataGrid from "@inovua/reactdatagrid-community";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { ValorGanadoActividad } from "../../utils/types";
import AddForm from "./components/add-form";
import NombreProyecto from "./components/nombre-proyecto";
import { baseColumns, baseRows } from "./valor-ganado-base";
import "./valor-ganado.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ValorGanado = () => {

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
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
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
    </Container>
  );
};

export default ValorGanado;
