import { ValorGanadoActividad } from "../../utils/types";
import {
  Button,
  Col,
  Container,
  Form,
  FormSelect,
  InputGroup,
  Row,
} from "react-bootstrap";
import { probabilidades } from "../../utils/constants";
export const baseColumns = [
  {
    name: "id",
    header: "Id",
    defaultVisible: false,
    minWidth: 300,
    type: "number",
  },
  { name: "actividad", header: "Actividad", minWidth: 50, defaultFlex: 2 },
  {
    name: "sem1",
    header: "Semana 1",
    maxWidth: 1000,
    defaultFlex: 1,
    type: "number",
    render: ({ value }: { value: number }) => value || 0,
  },
  {
    name: "sem2",
    header: "Semana 2",
    maxWidth: 1000,
    type: "number",
    defaultFlex: 1,
    render: ({ value }: { value: number }) => (value ? value : 0),
  },
  {
    name: "sem3",
    header: "Semana 3",
    maxWidth: 1000,
    type: "number",
    defaultFlex: 1,
    render: ({ value }: { value: number }) => value || 0,
  },
  {
    name: "sem4",
    header: "Semana 4",
    maxWidth: 1000,
    type: "number",
    defaultFlex: 1,
    render: ({ value }: { value: number }) => value || 0,
  },

  {
    name: "total",
    header: "Total",
    editable: false,
    maxWidth: 1000,
    defaultFlex: 1,
    render: ({ value }: { value: number }) => {
      return value || 0;
    },
  },
];

export const baseColumnsAvance = [
  {
    name: "id",
    header: "Id",
    defaultVisible: false,
    minWidth: 300,
    type: "number",
  },
  { name: "actividad", header: "Actividad", minWidth: 50, defaultFlex: 2 },
  {
    name: "sem1",
    header: "Semana 1",
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
  {
    name: "sem2",
    header: "Semana 2",
    maxWidth: 1000,
    type: "number",
    defaultFlex: 1,
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
  {
    name: "sem3",
    header: "Semana 3",
    maxWidth: 1000,
    type: "number",
    defaultFlex: 1,
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
  {
    name: "sem4",
    header: "Semana 4",
    maxWidth: 1000,
    type: "number",
    defaultFlex: 1,
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

  {
    name: "total",
    header: "Total",
    editable: false,
    maxWidth: 1000,
    defaultFlex: 1,
    render: ({ value }: { value: number }) => `${value || 0}%`,
  },
];

export const baseRows = () => [
  {
    id: 0,
    actividad: "Creacion de Login",
    sem1: 0,
    sem2: 100,
    sem3: 0,
    sem4: 0,
    total: 100,
  },
  {
    id: 1,
    actividad: "Validación de login",
    sem1: 0,
    sem2: 500,
    sem3: 500,
    sem4: 0,
    total: 1000,
  },
  {
    id: 2,
    actividad: "Creación del dashboard",
    sem1: 0,
    sem2: 1000,
    sem3: 1500,
    sem4: 0,
    total: 2500,
  },
  {
    id: 3,
    actividad: "Creación del admin",
    sem1: 0,
    sem2: 0,
    sem3: 0,
    sem4: 1500,
    total: 1500,
  },
];
export const baseRowsReal = () => [
  {
    id: 0,
    actividad: "Creacion de Login",
    sem1: 0,
    sem2: 20,
    sem3: 80,
    sem4: 0,
    total: 100,
  },
  {
    id: 1,
    actividad: "Validación de login",
    sem1: 0,
    sem2: 350,
    sem3: 400,
    sem4: 150,
    total: 900,
  },
  {
    id: 2,
    actividad: "Creación del dashboard",
    sem1: 0,
    sem2: 0,
    sem3: 950,
    sem4: 1000,
    total: 1950,
  },
  {
    id: 3,
    actividad: "Creación del admin",
    sem1: 0,
    sem2: 0,
    sem3: 0,
    sem4: 1300,
    total: 1300,
  },
];
export const baseRowsAvance = () => [
  {
    id: 0,
    actividad: "Creacion de Login",
    sem1: 0,
    sem2: 20,
    sem3: 80,
    sem4: 0,
    total: 100,
  },
  {
    id: 1,
    actividad: "Validación de login",
    sem1: 0,
    sem2: 40,
    sem3: 40,
    sem4: 20,
    total: 100,
  },
  {
    id: 2,
    actividad: "Creación del dashboard",
    sem1: 0,
    sem2: 0,
    sem3: 40,
    sem4: 50,
    total: 90,
  },
  {
    id: 3,
    actividad: "Creación del admin",
    sem1: 0,
    sem2: 0,
    sem3: 0,
    sem4: 70,
    total: 70,
  },
];

export const baseEvRows = [
  { total: 100, sem1: 0, sem2: 20, sem3: 80, sem4: 0 },
  { total: 1000, sem1: 0, sem2: 400, sem3: 400, sem4: 200 },
  { total: 2250, sem1: 0, sem2: 0, sem3: 1000, sem4: 1250 },
  { total: 1050, sem1: 0, sem2: 0, sem3: 0, sem4: 1050 },
];
