import { ValorGanadoActividad } from "../../utils/types";

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
    maxWidth: 1000,
    defaultFlex: 1,
    render: ({ value }: { value: number }) => {
      return value || 0;
    },
  },
];

export const baseRows = () => [
  { id: 0, actividad: "Creacion de Login" },
  { id: 1, actividad: "Validación de login" },
  { id: 2, actividad: "Creación del dashboard" },
];
