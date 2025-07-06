import { useState } from "react";
import axios from "axios";

export default function RegistrarPaciente() {
  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  const registrar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/pacientes/", {
        rut,
        nombre,
        telefono,
      });
      setMensaje("✅ Paciente registrado correctamente");
      setRut("");
      setNombre("");
      setTelefono("");
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al registrar paciente");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Registrar Paciente</h2>
      <form onSubmit={registrar} className="space-y-4 bg-white shadow-md p-4 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700">RUT</label>
          <input
            type="text"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            className="mt-1 w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="mt-1 w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Registrar
        </button>
        {mensaje && <p className="text-sm text-center mt-2">{mensaje}</p>}
      </form>
    </div>
  );
}
