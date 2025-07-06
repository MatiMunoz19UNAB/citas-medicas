import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">Citas Médicas</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Inicio</Link>
        <Link to="/registrar-paciente" className="hover:underline">Registrar Paciente</Link>
        <Link to="/agendar-cita" className="hover:underline">Agendar Cita</Link>
        <Link to="/ver-pacientes" className="hover:underline">Ver Pacientes</Link>
        <Link to="/ver-citas" className="hover:underline">Ver Citas</Link>
      </div>
    </nav>
  );
}
