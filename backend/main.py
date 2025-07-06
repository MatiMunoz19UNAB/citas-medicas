from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson.objectid import ObjectId
from models import Cita, Paciente
from datetime import datetime
from dotenv import load_dotenv
import os

# Cargar variables del archivo .env
load_dotenv()

# Conexión a MongoDB
client = MongoClient(os.getenv("MONGO_URL"))
db = client[os.getenv("DB_NAME")]
citas_collection = db["citas"]
pacientes_collection = db["pacientes"]

# Crear instancia FastAPI
app = FastAPI()

# Permitir peticiones desde otros orígenes (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------
# Endpoints para pacientes
# --------------------------

@app.post("/pacientes/")
def crear_paciente(paciente: Paciente):
    result = pacientes_collection.insert_one(paciente.dict())
    return {"id": str(result.inserted_id)}

@app.get("/pacientes/")
def obtener_pacientes():
    return [
        {
            "id": str(p["_id"]),
            "rut": p["rut"],
            "nombre": p["nombre"],
            "telefono": p["telefono"]
        }
        for p in pacientes_collection.find()
    ]

# --------------------------
# Endpoints para citas
# --------------------------

@app.post("/citas/")
def agendar_cita(cita: Cita):
    if cita.fecha < datetime.now():
        raise HTTPException(status_code=400, detail="La fecha debe ser futura")

    try:
        paciente_id = ObjectId(cita.paciente_id)
    except Exception:
        raise HTTPException(status_code=400, detail="ID de paciente inválido")

    cita_dict = cita.dict(by_alias=True)
    cita_dict["paciente_id"] = paciente_id
    cita_dict["estado"] = "pendiente"

    result = citas_collection.insert_one(cita_dict)
    return {"id": str(result.inserted_id)}

@app.get("/citas/")
def listar_citas():
    citas = []
    for c in citas_collection.find():
        cita = {
            "id": str(c.get("_id", "")),
            "paciente_id": str(c.get("paciente_id", "")),
            "fecha": c.get("fecha").isoformat() if isinstance(c.get("fecha"), datetime) else "",
            "especialidad": c.get("especialidad", ""),
            "estado": c.get("estado", "pendiente")
        }
        citas.append(cita)
    return citas


@app.patch("/citas/{id}")
def modificar_cita(id: str, cambios: dict):
    if "fecha" in cambios:
        nueva_fecha = datetime.fromisoformat(cambios["fecha"])
        if nueva_fecha < datetime.now():
            raise HTTPException(status_code=400, detail="La fecha debe ser futura")
        cambios["fecha"] = nueva_fecha

    citas_collection.update_one({"_id": ObjectId(id)}, {"$set": cambios})
    return {"mensaje": "Cita modificada"}

@app.delete("/citas/{id}")
def eliminar_cita(id: str):
    try:
        object_id = ObjectId(id)
    except Exception:
        raise HTTPException(status_code=400, detail="ID inválido")

    resultado = citas_collection.delete_one({"_id": object_id})

    if resultado.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Cita no encontrada")

    return {"mensaje": "Cita eliminada correctamente"}

