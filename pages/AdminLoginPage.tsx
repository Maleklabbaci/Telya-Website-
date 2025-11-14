
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TelyaLogo } from '../components/Logo';

const AdminLoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      window.location.href = '/'; // Redirect to homepage
    } else {
      setError('Mot de passe incorrect.');
      setPassword('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-xl">
        <div className="text-center">
            <a href="/">
                <TelyaLogo className="text-4xl font-extrabold text-brand-green-700 mx-auto" />
            </a>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
                Accès Administrateur
            </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="password-admin" className="sr-only">Mot de passe</label>
              <input
                id="password-admin"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-green-500 focus:border-brand-green-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
           {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-green-600 hover:bg-brand-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-500 transition-colors"
            >
              Se Connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
