import CustomButton from '../components/CustomButton.jsx';

function About() {
  return (
    <div className="about max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Acerca de Nosotros
        </h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Esta aplicación web fue desarrollada como parte del curso de <strong>Construcción de Software</strong>
          </p>
          
          <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
            Tecnologías Utilizadas
          </h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-1">
            <li>React 18 con Hooks</li>
            <li>Vite como build tool</li>
            <li>React Router v7 para navegación</li>
            <li>Tailwind CSS para estilos</li>
            <li>Express.js como backend ligero</li>
            <li>LocalStorage para persistencia</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
            Características
          </h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-1">
            <li>Sistema de autenticación con backend</li>
            <li>Componentes reutilizables</li>
            <li>Navegación condicional</li>
            <li>Estado global con Context API</li>
            <li>Diseño responsivo</li>
            <li>Soporte para modo oscuro</li>
          </ul>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <CustomButton 
              onClick={() => window.open('https://github.com', '_blank')}
              variant="primary"
            >
              Ver en GitHub
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;