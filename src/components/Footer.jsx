const Footer = () => {
  return (
    <footer className="mt-auto py-4 px-4 bg-gray-200 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-300">
        <div className="mb-2 md:mb-0">
          <p>&copy; 2024 Mi Aplicación React. Todos los derechos reservados.</p>
        </div>
        <div className="flex gap-4">
          <span>Desarrollado por Diego</span>
          <span>•</span>
          <span>Construcción de Software</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
