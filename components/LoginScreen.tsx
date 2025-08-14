
import React, { useState } from 'react';
import { LockClosedIcon } from './icons';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

const DEFAULT_PASSWORD = 'bomberos2024';
const PASSWORD_KEY = 'app_password';

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isDefaultPassword] = useState(() => {
      return localStorage.getItem(PASSWORD_KEY) === null;
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;

    if (password === storedPassword) {
      setError('');
      onLoginSuccess();
    } else {
      setError('Contraseña incorrecta. Inténtelo de nuevo.');
      setPassword('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-2xl animate-scale-in">
        <div className="text-center">
            <LockClosedIcon className="mx-auto h-12 w-12 text-blue-400" />
            <h2 className="mt-6 text-3xl font-extrabold text-white">
                Acceso Protegido
            </h2>
            <p className="mt-2 text-sm text-gray-400">
                Organizador de Servicios de Bomberos
            </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 placeholder-gray-500 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                autoFocus
              />
            </div>
          </div>

          {error && (
            <p className="text-center text-sm text-red-400 animate-fade-in">{error}</p>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors"
            >
              Ingresar
            </button>
          </div>
        </form>
         {isDefaultPassword && (
            <p className="mt-4 text-center text-xs text-gray-500">
                La contraseña por defecto es: <code className="bg-gray-700 px-1 rounded font-mono">bomberos2024</code>
            </p>
         )}
      </div>
    </div>
  );
};

export default LoginScreen;