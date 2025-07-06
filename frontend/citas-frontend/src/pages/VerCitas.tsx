import { useEffect, useState } from "react";
import axios from "axios";

interface Cita {
  id: string;
  paciente_id: string;
  fecha: string;
  especialidad: string;
  estado: string;
}

export default function VerCitas() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [nuevaFecha, setNuevaFecha] = useState("");

  const cargarCitas = () => {
    axios
      .get("http://localhost:8000/citas/")
      .then((res) => setCitas(res.data))
      .catch((err) => console.error("Error al cargar citas:", err));
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  const confirmarCita = async (id: string) => {
    try {
      await axios.patch(`http://localhost:8000/citas/${id}`, {
        estado: "confirmada",
      });
      cargarCitas();
    } catch (err) {
      console.error("Error al confirmar cita:", err);
    }
  };

  const eliminarCita = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta cita?")) return;
    try {
      await axios.delete(`http://localhost:8000/citas/${id}`);
      cargarCitas();
    } catch (err) {
      console.error("Error al eliminar cita:", err);
    }
  };

  const guardarFecha = async (id: string) => {
    try {
      await axios.patch(`http://localhost:8000/citas/${id}`, {
        fecha: nuevaFecha,
      });
      setEditandoId(null);
      setNuevaFecha("");
      cargarCitas();
    } catch (err) {
      console.error("Error al modificar fecha:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Citas Agendadas</h2>
      {citas.length === 0 ? (
        <p>No hay citas registradas.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-4 py-2">Fecha</th>
              <th className="border px-4 py-2">Especialidad</th>
              <th className="border px-4 py-2">Estado</th>
              <th className="border px-4 py-2">Paciente ID</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita) => (
              <tr key={cita.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">
                  {editandoId === cita.id ? (
                    <input
                      type="datetime-local"
                      value={nuevaFecha}
                      onChange={(e) => setNuevaFecha(e.target.value)}
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    new Date(cita.fecha).toLocaleString()
                  )}
                </td>
                <td className="border px-4 py-2">{cita.especialidad}</td>
                <td className="border px-4 py-2">{cita.estado}</td>
                <td className="border px-4 py-2">{cita.paciente_id}</td>
                <td className="border px-4 py-2 space-y-1 space-x-1">
                  {editandoId === cita.id ? (
                    <>
                      <button
                        onClick={() => guardarFecha(cita.id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditandoId(null)}
                        className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500 text-sm"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditandoId(cita.id)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-sm"
                      >
                        Modificar
                      </button>
                      {cita.estado !== "confirmada" && (
                        <button
                          onClick={() => confirmarCita(cita.id)}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-sm"
                        >
                          Confirmar
                        </button>
                      )}
                      <button
                        onClick={() => eliminarCita(cita.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
