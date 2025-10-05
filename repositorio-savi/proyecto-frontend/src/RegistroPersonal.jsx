import React, { useState } from 'react';
import './RegistroPersonal.css';

// RegistroPersonal
// - onBack: callback para volver atrás
// Este componente maneja un formulario simple de registro personal.
// Uso: no toca la lógica global, sólo envia al endpoint y muestra mensaje.

/**
 * RegistroPersonal
 * Formulario simple para registrar usuarios individuales.
 * Envía los datos al endpoint `POST /api/users/register`.
 */
export default function RegistroPersonal({ onBack }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  // handle: actualiza el campo del formulario (nombre, email, password)
  const handle = (k, v) => setForm(p => ({ ...p, [k]: v }));

  // submit: llama al endpoint de registro de usuarios
  // submit: cuando apretás 'Registrarse' se hace el POST al backend
  // muestra mensajes de éxito/error en `msg`
  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) setMsg('Usuario registrado'); else setMsg(data.error || 'Error');
    } catch (err) {
      setMsg('Error de conexión');
    }
  };

  return (
    <div>
      <h2>Registro Personal</h2>
      <form onSubmit={submit}>
        <input placeholder="Nombre" value={form.name} onChange={e => handle('name', e.target.value)} required />
        <input placeholder="Email" value={form.email} onChange={e => handle('email', e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={form.password} onChange={e => handle('password', e.target.value)} required />
        <button type="submit">Registrar</button>
      </form>
      {msg && <p>{msg}</p>}
      <button onClick={onBack}>Volver</button>
    </div>
  );
}
