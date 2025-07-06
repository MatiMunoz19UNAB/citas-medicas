export default function Footer() {
  return (
    <footer className="bg-gray-200 text-center p-4 text-sm text-gray-600 mt-auto">
      © {new Date().getFullYear()} Citas Médicas. Todos los derechos reservados.
    </footer>
  );
}
