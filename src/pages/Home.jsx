import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import CustomButton from '../components/CustomButton.jsx';

function Home() {
  const { isLoggedIn, username } = useAuth();
  const [contador, setContador] = useState(0);
  const [mensaje, setMensaje] = useState('¡Bienvenido a la aplicación!');
  
  const actualizarContador = () => {
    setContador(contador + 1);
  };
  
  const cambiarMensaje = () => {
    const mensajes = [
      '¡Bienvenido a la aplicación!',
      'Esta es una aplicación React con Vite',
      'Con componentes personalizados y estado',
      '¡Gracias por usar esta aplicación!'
    ];
    const indiceAleatorio = Math.floor(Math.random() * mensajes.length);
    setMensaje(mensajes[indiceAleatorio]);
  };

  return (
    <div className="home max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
          Página Principal
        </h1>
        
        {isLoggedIn && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200">
              ¡Hola, <strong>{username}</strong>! Has iniciado sesión correctamente.
            </p>
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Sección del párrafo con variable */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Información Dinámica
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {mensaje}
            </p>
            <CustomButton 
              onClick={cambiarMensaje}
              variant="primary"
              size="medium"
            >
              Cambiar Mensaje
            </CustomButton>
          </div>
          
          {/* Sección del contador */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Contador
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              El valor actual del contador es: <strong className="text-blue-600 dark:text-blue-400">{contador}</strong>
            </p>
            <div className="flex gap-2">
              <CustomButton 
                onClick={actualizarContador}
                variant="success"
                size="medium"
              >
                Incrementar (+1)
              </CustomButton>
              <CustomButton 
                onClick={() => setContador(0)}
                variant="secondary"
                size="medium"
              >
                Reiniciar
              </CustomButton>
            </div>
          </div>
        </div>
        
        {/* Sección de demostración de botones personalizados */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
            Componente Botón Personalizado
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Diferentes variantes del componente botón personalizado:
          </p>
          <div className="flex flex-wrap gap-2">
            <CustomButton variant="primary">Primario</CustomButton>
            <CustomButton variant="secondary">Secundario</CustomButton>
            <CustomButton variant="success">Éxito</CustomButton>
            <CustomButton variant="warning">Advertencia</CustomButton>
            <CustomButton variant="danger">Peligro</CustomButton>
            <CustomButton variant="primary" size="small">Pequeño</CustomButton>
            <CustomButton variant="primary" size="large">Grande</CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
