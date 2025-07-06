# 🩺 Sistema de Gestión de Citas Médicas

Proyecto completo con backend en **FastAPI + MongoDB** y frontend en **React 19.1.0 + TypeScript + TailwindCSS 4.1.4**.

---

## ⚙️ Tecnologías utilizadas

### Backend
- FastAPI
- Uvicorn
- PyMongo
- Pydantic v2
- Python 3.11+
- MongoDB local
- `.env` para configuración

### Frontend
- React 19.1.0 (con Vite)
- TypeScript
- Tailwind CSS 4.1.4
- Axios
- React Router DOM

---

## 🏗️ Estructura del proyecto
citas-medicas/
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── .env
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── tailwind.config.js
│   └── ...
└── README.md

---

## 🚀 Cómo ejecutar el proyecto

### 🔹 1. Clonar el repositorio

```bash
git clone https://github.com/MatiMunoz19UNAB/citas-medicas.git
cd citas-medicas
```

### 🔹 2. Backend (FastAPI)

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 🔹 3. Frontend (React)

```bash
cd frontend/citas-frontend
npm install
npm run dev
```

---

✅ Funcionalidades:

- Registrar pacientes
- Ver lista de pacientes
- Agendar citas con fecha, especialidad y paciente
- Ver lista de citas
- Confirmar citas
- Modificar fecha de citas
- Eliminar citas
- Navegación por pestañas
- Interfaz clara y responsiva

---

Hecho por: @MatiMunoz19UNAB
