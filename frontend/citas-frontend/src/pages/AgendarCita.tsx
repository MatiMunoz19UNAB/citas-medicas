import { useEffect, useState } from "react";
import axios from "axios";

interface Paciente {
  id: string;
  nombre: string;
}

export default function AgendarCita() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [pacienteId, setPacienteId] = useState("");
  const [fecha, setFecha] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/pacientes/")
      .then(res => setPacientes(res.data))
      .catch(err => console.error("Error al cargar pacientes:", err));
  }, []);

  const agendar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/citas/", {
        paciente_id: pacienteId,
        fecha,
        especialidad,
      });
      setMensaje("✅ Cita agendada correctamente");
      setPacienteId("");
      setFecha("");
      setEspecialidad("");
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al agendar cita");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Agendar Cita</h2>
      <form onSubmit={agendar} className="space-y-4 bg-white shadow-md p-4 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700">Paciente</label>
          <select
            value={pacienteId}
            onChange={(e) => setPacienteId(e.target.value)}
            className="mt-1 w-full border px-3 py-2 rounded-md"
            required
          >
            <option value="">Seleccione un paciente</option>
            {pacientes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha y hora</label>
          <input
            type="datetime-local"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="mt-1 w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Especialidad</label>
          <input
            type="text"
            value={especialidad}
            onChange={(e) => setEspecialidad(e.target.value)}
            className="mt-1 w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Agendar
        </button>
        {mensaje && <p className="text-sm text-center mt-2">{mensaje}</p>}
      </form>
    </div>
  );
}
