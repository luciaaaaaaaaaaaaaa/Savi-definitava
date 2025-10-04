import React, { useState } from 'react';

/**
 * RegistroEmpresa
 * Componente de ejemplo para el registro de empresas. Envía los datos
 * al endpoint `POST /api/users/register-company` y muestra mensajes
 * de éxito o error.
 * Parámetros:
 * - onBack: callback para volver a la pantalla anterior
 */
export default function RegistroEmpresa({ onBack }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handle = (k, v) => setForm(p => ({ ...p, [k]: v }));

  // submit: envía los datos al backend
  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch('http://localhost:3000/api/users/register-company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) setMsg('Empresa registrada'); else setMsg(data.error || 'Error');
    } catch (err) {
      setMsg('Error de conexión');
    }
  };

  return (
    <div>
      <h2>Registro Empresa</h2>
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
