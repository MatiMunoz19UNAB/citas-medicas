import { useEffect, useState } from "react";
import axios from "axios";

interface Paciente {
  id: string;
  rut: string;
  nombre: string;
  telefono: string;
}

export default function VerPacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/pacientes/")
      .then((res) => setPacientes(res.data))
      .catch((err) => console.error("Error al cargar pacientes:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Pacientes Registrados</h2>
      {pacientes.length === 0 ? (
        <p>No hay pacientes registrados.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-4 py-2">RUT</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p) => (
              <tr key={p.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{p.rut}</td>
                <td className="border px-4 py-2">{p.nombre}</td>
                <td className="border px-4 py-2">{p.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
