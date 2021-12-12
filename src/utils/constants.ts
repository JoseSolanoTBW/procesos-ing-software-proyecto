export const impactos = [
  {
    label: "Alto",
    value: 9,
  },
  {
    label: "Medio",
    value: 6,
  },
  {
    label: "Bajo",
    value: 3,
  },
];

export const riesgos = [
  {
    label: "Alto",
    min: 4.5,
    color: "#A13333",
  },
  {
    label: "Medio",
    min: 2,
    max: 4.5,
    color: "#D89216",
  },
  {
    label: "Bajo",
    min: 0,
    max: 2,
    color: "#4E9F3D",
  },
];

const generarProbabilidades = () => {
  const porcentajes = [1];
  for (let index = 5; index < 100; index += 5) {
    porcentajes.push(index);
  }
  porcentajes.push(99);
  return porcentajes;
};

export const probabilidades = generarProbabilidades();

export const tablaRiesgos = [
  {
    id: 1,
    riesgo: "Fallo en la conexion a servidores",
    impacto: 6,
    probabilidad: 60,
  },
  {
    id: 2,
    riesgo: "Errores gramaticales en los textos del proyecto",
    impacto: 3,
    probabilidad: 90,
  },
  {
    id: 3,
    riesgo: "Retraso en el release del proyecto",
    impacto: 9,
    probabilidad: 30,
  },
];
