from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId
from pydantic import GetJsonSchemaHandler
from pydantic.json_schema import JsonSchemaValue

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, field):
        if not ObjectId.is_valid(v):
            raise ValueError("ID inválido")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, core_schema, handler: GetJsonSchemaHandler) -> JsonSchemaValue:
        return {"type": "string"}

# Modelo de paciente
class Paciente(BaseModel):
    rut: str
    nombre: str
    telefono: str

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# Modelo de cita
class Cita(BaseModel):
    paciente_id: PyObjectId = Field(..., alias="paciente_id")
    fecha: datetime
    especialidad: str
    estado: Optional[str] = "pendiente"

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        populate_by_name = True
