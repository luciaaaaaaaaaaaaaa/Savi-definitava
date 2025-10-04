import { useState, useEffect } from 'react';

// useAuth
// Hook ligero que expone el usuario actual y el estado de autenticación.
// Actualmente lee token/user desde localStorage. En una app real se debería
// validar el token contra el backend o refrescarlo según sea necesario.
export function useAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      // Si hay token en localStorage, consideramos al usuario autenticado
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

// registerUser / registerCompany
// Funciones auxiliares que llaman al backend para crear usuarios o empresas.
// Devuelven el JSON de la respuesta (éxito o error). No hacen almacenamiento
// automático de token/usuario; eso se debería gestionar donde se necesite.
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
