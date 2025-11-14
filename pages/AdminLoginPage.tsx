
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
    if (!success) {
      setError('Mot de passe incorrect.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-xl text-center">
        <div className="flex justify-center mb-6">
            <TelyaLogo className="text-4xl font-extrabold text-brand-green-700" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Accès Administrateur</h2>
        <p className="text-gray-600 mb-6">Veuillez entrer le mot de passe pour accéder au mode d'édition.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Mot de passe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-brand-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-brand-green-700 transition-transform duration-300 hover:scale-105"
          >
            Se Connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
