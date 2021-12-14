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
  const [calculos, setCalculos] = useState<{
    ac: number;
    pv: number;
    ev: number;
  }>({ pv: 0, ac: 0, ev: 0 });
  const [nombreProyecto, setNombreProyecto] = useState({
    nombre: "Digite el nombre del proyecto aqui",
    edit: false,
  });
  const [data, setData] = useState<any>();
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
  };

  const agregarActividad = (actividad: string) => {
    setValoresPlaneados((prev) => [...prev, { id: prev.length, actividad }]);
    setValoresReales((prev) => [...prev, { id: prev.length, actividad }]);
    setAvance((prev) => [...prev, { id: prev.length, actividad }]);
  };

  const calcularEv = () => {
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

    const ev = evArray
      .map((plan) => Number(plan.total))
      .reduce((accumulator, item) => (accumulator || 0) + (item || 0));

    setEvRows(evArray);
    setCalculos((prev) => ({ ...prev, ev }));
  };

  //hacer calculos aqui

  const calcularValorSemana = (
    semana: string,
    array: any[],
    acumulado: number
  ) => {
    let row = array
      .map((plan) => {
        return Number(plan[semana]);
      })
      .reduce((accumulator, item) => accumulator + item);
    row = row + acumulado;

    return row;
  };

  useEffect(() => {
    calcularEv();
  }, [avance]);
  useEffect(() => {
    setListaCorteSemana(semanas.slice(2, semanas.length - 1));
  }, [semanas]);

  useEffect(() => {
    let pvAcumulado = 0;
    let acAcumulado = 0;
    let evAcumulado = 0;
    let chart: any = [];
    let flag = false;
    let pv = 0;
    let ac = 0;
    let ev = 0;
    listaCorteSemana.forEach((semana) => {
      if (!flag) {
        pv = calcularValorSemana(semana.name, planeado, pvAcumulado);
        ac = calcularValorSemana(semana.name, real, acAcumulado);
        ev = calcularValorSemana(semana.name, evRows, evAcumulado);
        pvAcumulado = pv;
        acAcumulado = ac;
        evAcumulado = ev;
        if (semana.name === corteSemana) flag = true;
        chart.push({
          name: semana.header,
          valorEstimado: pv,
          valorGanado: ev,
          valorReal: ac,
        });
      }
      if (semana.name === corteSemana) {
        flag = true;
        setCalculos({ pv, ac, ev });
        setData(chart);
      }
    });
  }, [corteSemana, planeado, real, evRows]);
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
