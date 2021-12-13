import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GestionRiesgos from "./pages/gestion-riesgos/gestion-riesgos";
import Navigation from "./components/navbar/navbar";
import ValorGanado from "./pages/valor-ganado/valor-ganado";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<GestionRiesgos />} />
        <Route path="/valor-ganado" element={<ValorGanado />} />
      </Routes>
    </div>
  );
}

export default App;
