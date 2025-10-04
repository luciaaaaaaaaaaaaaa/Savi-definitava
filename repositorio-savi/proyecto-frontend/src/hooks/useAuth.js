import { useState, useEffect } from 'react';

// Hook simple para proporcionar user e isAuthenticated al resto de la app.
// Ajusta según tu lógica real (llamadas a la API, refresh tokens, etc.).
export function useAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (token) {
        setIsAuthenticated(true);
        if (storedUser) setUser(JSON.parse(storedUser));
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (e) {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  return { user, isAuthenticated };
}

// Funciones auxiliares para registro (llaman al backend)
export async function registerUser(data) {
  try {
    const res = await fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (e) {
    return { error: 'Error de conexión' };
  }
}

export async function registerCompany(data) {
  try {
    const res = await fetch('http://localhost:3000/api/users/register-company', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (e) {
    return { error: 'Error de conexión' };
  }
}
