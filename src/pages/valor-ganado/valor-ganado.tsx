import ReactDataGrid from "@inovua/reactdatagrid-community";
import React, { useCallback, useEffect, useState } from "react";
import {
  Col,
  Container,
  Form,
  FormSelect,
  InputGroup,
  Row,
} from "react-bootstrap";
import { ValorGanadoActividad } from "../../utils/types";
import AddForm from "./components/add-form";
import NombreProyecto from "./components/nombre-proyecto";
import {
  baseColumns,
  baseColumnsAvance,
  baseEvRows,
  baseRows,
  baseRowsAvance,
  baseRowsReal,
} from "./valor-ganado-base";
import "./valor-ganado.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { probabilidades } from "../../utils/constants";

const ValorGanado = () => {
  var data = [
    {
      name: "Semana 1",
      valorGanado: 4000,
      valorEstimado: 2400,
      valorReal: 3400,
    },
    {
      name: "Semana 2",
      valorGanado: 3000,
      valorEstimado: 1398,
      valorReal: 4210,
    },
    {
      name: "Semana 3",
      valorGanado: 2000,
      valorEstimado: 9800,
      valorReal: 3290,
    },
    {
      name: "Semana 4",
      valorGanado: 2780,
      valorEstimado: 3908,
      valorReal: 4000,
    },
    {
      name: "Semana 5",
      valorGanado: 1890,
      valorEstimado: 4800,
      valorReal: 3181,
    },
    {
      name: "Semana 6",
      valorGanado: 2390,
      valorEstimado: 3800,
      valorReal: 3500,
    },
    {
      name: "Semana 7",
      valorGanado: 3490,
      valorEstimado: 4300,
      valorReal: 3100,
    },
  ];

  const [calculos, setCalculos] = useState<{
    ac: number;
    pv: number;
    ev: number;
  }>({ pv: 0, ac: 0, ev: 0 });
  const [nombreProyecto, setNombreProyecto] = useState({
    nombre: "Digite el nombre del proyecto aqui",
    edit: false,
  });
  const [semanas, setSemanas] = useState(baseColumns);
  const [avanceSemanas, setAvanceSemanas] = useState(baseColumnsAvance);
  const [planeado, setValoresPlaneados] = useState<ValorGanadoActividad[]>(
    baseRows()
  );
  const [listaCorteSemana, setListaCorteSemana] = useState(
    baseColumns.slice(2, baseColumns.length - 1)
  );
  const [corteSemana, setCorteSemana] = useState("sem4");
  const [real, setValoresReales] = useState<ValorGanadoActividad[]>(
    baseRowsReal()
  );
  const [avance, setAvance] = useState<ValorGanadoActividad[]>(
    baseRowsAvance()
  );
  const [evRows, setEvRows] = useState(baseEvRows);

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

    setAvanceSemanas((prev: any) => {
      const total = prev.pop();
      return [
        ...prev,
        {
          name: `sem${prev.length - 1}`,
          header: `Semana ${prev.length - 1}`,
          maxWidth: 1000,
          defaultFlex: 1,
          type: "number",
          render: ({ value }: { value: number }) => `${value || 0}%`,
          renderEditor: (editorProps: any) => {
            return (
              <FormSelect
                tabIndex={0}
                className="select-editor"
                autoFocus
                onChange={(event) => {
                  editorProps.onChange(event.target.value);
                }}
                onBlur={editorProps.onComplete}
                onKeyDown={(e) => {
                  if (e.key == "Tab") {
                    editorProps.onTabNavigation(
                      true /*complete navigation?*/,
                      e.shiftKey ? -1 : 1 /*backwards of forwards*/
                    );
                  }
                }}
                value={editorProps.value}
              >
                {probabilidades.map((probabilidad) => (
                  <option value={probabilidad}>{probabilidad}%</option>
                ))}
              </FormSelect>
            );
          },
        },
        total,
      ];
    });
    setListaCorteSemana(semanas.slice(2, semanas.length - 1));
  };

  const agregarActividad = (actividad: string) => {
    setValoresPlaneados((prev) => [...prev, { id: prev.length, actividad }]);
    setValoresReales((prev) => [...prev, { id: prev.length, actividad }]);
  };

  const calcularAC = () => {
    const evArray: any[] = [];
    avance.forEach((tarea, index) => {
      let acRow = { total: 0 };
      let total = 0;
      Object.keys(tarea).forEach((key) => {
        if (key.includes("sem")) {
          //@ts-ignore
          const value = planeado[index].total * ((tarea[key] || 0) / 100);
          //@ts-ignore
          acRow[key] = value;
          total = total + value;
        }
      });
      acRow.total = total;
      evArray.push(acRow);
    });
    console.log(evArray);

    const ev = evArray
      .map((plan) => Number(plan.total))
      .reduce((accumulator, item) => (accumulator || 0) + (item || 0));

    setEvRows(evArray);
    setCalculos((prev) => ({ ...prev, ev }));
  };
  console.log(listaCorteSemana);
  //hacer calculos aqui
  useEffect(() => {
    calcularAC();
  }, [corteSemana]);
  useEffect(() => {
    const pv = planeado
      .map((plan) => Number(plan.total))
      .reduce((accumulator, item) => (accumulator || 0) + (item || 0));
    setCalculos((prev) => ({ ...prev, pv }));
  }, [planeado]);
  useEffect(() => {
    const ac = real
      .map((plan) => Number(plan.total))
      .reduce((accumulator, item) => (accumulator || 0) + (item || 0));

    //@ts-ignore
    setCalculos((prev) => ({ ...prev, ac }));
  }, [real]);

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
    [real, corteSemana]
  );

  const onEditAvanceComplete = useCallback(
    ({ value, columnId, rowId }) => {
      //actualiza el valor
      const data = [...avance];
      data[rowId][columnId] = value;
      //calcula el total
      let total = 0;
      Object.keys(data[rowId]).forEach((key) => {
        if (key.includes("sem")) {
          total = total + (Number(data[rowId][key]) || 0);
        }
      });
      console.log(total, "avance");

      data[rowId].total = total;
      setAvance(data);
    },
    [avance, corteSemana]
  );

  const { pv, ac, ev } = calculos;

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
      <div className="table-container">
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
      </div>

      <p>PV: {calculos.pv}</p>
      <div className="table-container">
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
      </div>

      <div className="table-container">
        <h3>Avance</h3>
        <ReactDataGrid
          style={{ minHeight: 300 }}
          onEditComplete={onEditAvanceComplete}
          editable={true}
          columns={avanceSemanas}
          theme="default-dark"
          dataSource={avance}
          idProperty="id"
        />
      </div>
      <h2>Estudio de Valor Ganado</h2>
      <Form.Group className="mb-3" controlId="impacto">
        <Form.Label>Corte Semana</Form.Label>
        <InputGroup>
          <Form.Control
            className="select-editor"
            as="select"
            type="select"
            value={corteSemana}
            onChange={(event) => setCorteSemana(event.target.value)}
            aria-label="Impacto"
            required
          >
            {listaCorteSemana.map((semana) => (
              <option value={semana.name}>{semana.header}</option>
            ))}
          </Form.Control>
        </InputGroup>
      </Form.Group>
      <div className="table-container">
        <Row>
          <Col className="calculo">
            <h3>PV</h3>
            <p>{pv}</p>
          </Col>
          <Col className="calculo">
            <h3>AC</h3>
            <p>{ac}</p>
          </Col>
          <Col className="calculo">
            <h3>EV</h3>
            <p>{ev}</p>
          </Col>
        </Row>
      </div>
      <div className="table-container">
        <Row>
          <Col className="calculo-2">
            <h3>CV</h3>
            <p>{ev - ac}</p>
          </Col>
          <Col className="calculo-2">
            <h3>CPI</h3>
            <p>{(ev / ac).toFixed(2)}</p>
          </Col>
          <Col className="calculo-2">
            <h3>SV</h3>
            <p>{ev - pv}</p>
          </Col>
          <Col className="calculo-2">
            <h3>SPI</h3>
            <p>{(ev / pv).toFixed(2)}</p>
          </Col>
        </Row>
      </div>
      <div className="table-container">
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
          <Line
            type="monotone"
            dataKey="valorGanado"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="valorEstimado" stroke="#82ca9d" />
          <Line type="monotone" dataKey="valorReal" stroke="#DA302B" />
        </LineChart>
      </div>
    </Container>
  );
};

export default ValorGanado;
