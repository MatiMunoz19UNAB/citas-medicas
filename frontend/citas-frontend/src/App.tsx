import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import RegistrarPaciente from "./pages/RegistrarPaciente";
import AgendarCita from "./pages/AgendarCita";
import VerPacientes from "./pages/VerPacientes";
import VerCitas from "./pages/VerCitas";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registrar-paciente" element={<RegistrarPaciente />} />
            <Route path="/agendar-cita" element={<AgendarCita />} />
            <Route path="/ver-pacientes" element={<VerPacientes />} />
            <Route path="/ver-citas" element={<VerCitas />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
