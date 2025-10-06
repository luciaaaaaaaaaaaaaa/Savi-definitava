import React, { useState } from 'react';
import './RegistroPersonal.css';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';

// Comentarios donde explico rápido lo que hace cada parte.
// Este componente muestra el formulario para registrar un usuario personal.
// No toco la lógica del submit (la dejo igual), solo comento para que se entienda.
export default function RegistroPersonal({ onBack, onGoInicio, onGoInicioUsuario }) {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', password2: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // handleChange: guarda lo que escribe el usuario en el state "form".
  // Uso el mismo nombre de los inputs para mapear directo al objeto.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // submit: al apretar "Registrarse" se arma la petición al backend.
  // Mantengo la lógica igual: validar contraseñas, enviar POST a /api/users/register.
  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validaciones mínimas (igual que antes: no cambiar la lógica del backend, que puso el profe)
    // Validación simple en el frontend: que las dos contraseñas sean iguales.
    if (form.password !== form.password2) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: form.nombre, email: form.email, password: form.password })
      });
      const data = await res.json();
      if (res.ok) {
        // Si el backend responde OK, hago lo mismo que antes: opcionalmente redirigir
        // (el prop onGoInicioUsuario venía de donde se usa este componente).
        if (onGoInicioUsuario) onGoInicioUsuario();
      } else {
        // Si el servidor responde con error (p.ej. 'El usuario ya existe'), lo muestro.
        setError(data.error || 'Error al registrarse');
      }
    } catch (err) {
      // Si falla la conexión, mensaje claro para el usuario.
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registroPersonal">
      {/* Header: botones de navegación y título. */}
      <section className="registroPersonal__hero">
        <nav className="registroPersonal__nav">
          {/* Botón para volver al inicio general */}
          <button className="registroPersonal__btn registroPersonal__btn--primary" onClick={onGoInicio}>Inicio</button>
          {/* Botón para volver a la pantalla anterior */}
          <button className="registroPersonal__btn" onClick={onBack}>Volver atrás</button>
        </nav>
        <img
          className="registroPersonal__hero-img"
          src="https://i.imgur.com/S23StlD.png"
          alt="Cocina registro SAVI"
        />
        <h1 className="registroPersonal__title">Registrate en SAVI</h1>
      </section>

      <div className="registroPersonal__intro">Te pedimos que completes los siguientes campos para poder disfrutar de SAVI</div>

      <section className="registroPersonal__form-wrapper">
        {/* Si hay error lo muestro arriba del formulario */}
        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '20px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {/* Formulario: campos controlados usando `form` en el state */}
        <form className="registroPersonal__form" onSubmit={submit}>
          <label className="registroPersonal__label" htmlFor="rp-nombre">Nombre</label>
          <input
            id="rp-nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            required
          />

          <label className="registroPersonal__label" htmlFor="rp-email">Email</label>
          <input
            id="rp-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ejemplo@gmail.com"
            required
          />

          <label className="registroPersonal__label" htmlFor="rp-password">Contraseña</label>
          <input
            id="rp-password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            minLength="6"
            required
          />

          <label className="registroPersonal__label" htmlFor="rp-password2">Confirmar contraseña</label>
          <input
            id="rp-password2"
            name="password2"
            type="password"
            value={form.password2}
            onChange={handleChange}
            required
          />

          {/* Botón de submit: muestra estado de carga y previene doble submit */}
          <button type="submit" className="registroPersonal__submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
      </section>

      <footer className="registroPersonal__footer">
        <div className="registroPersonal__footer-left">
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
          <a href="#" aria-label="Email"><MdMailOutline /></a>
        </div>
        <div className="registroPersonal__footer-right">
          <span>Contacto: 091 222 333 — savi@gmail.com.uy</span>
        </div>
      </footer>
    </div>
  );
}
