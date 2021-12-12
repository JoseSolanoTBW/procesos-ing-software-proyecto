export interface Impacto {
  label: string;
  value: number;
}

export interface Riesgo {
  label: string;
  min: number;
  max?: number;
  color: string;
}

export interface TableRiesgo {
  id: number;
  riesgo: string;
  impacto: number;
  probabilidad: number;
}
