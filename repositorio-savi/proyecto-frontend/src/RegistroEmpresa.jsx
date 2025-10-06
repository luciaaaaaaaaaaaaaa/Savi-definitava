import React, { useState } from 'react';
import './RegistroEmpresa.css';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';


// Este componente es el formulario para registrar empresas. Mantengo la lógica,
// solo agrego comentarios para que se entienda qué hace cada cosa.
export default function RegistroEmpresa({ onBack }) {
  const [form, setForm] = useState({ name: '', email: '', pass: '', pass2: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [acc, setAcc] = useState({
    a: { pasillos: false, ramp: false, elevator: true },
    b: { pasillos: false, ramp: false, elevator: false },
    c: { pasillos: false, ramp: false, elevator: false },
    d: { pasillos: false, ramp: false, elevator: false }
  });

  // handle: actualiza los campos del formulario (name, email, pass, ...)
  const handle = (k, v) => setForm(p => ({ ...p, [k]: v }));
  // toggle: cambia el valor de los checks de accesibilidad (a,b,c,d)
  const toggle = (k, f) => setAcc(p => ({ ...p, [k]: { ...p[k], [f]: !p[k][f] } }));

  // submit: arma el payload y hace POST al endpoint de registro de empresas.
  // Importante: no cambio la ruta ni la lógica de validación backend.
  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    // validación simple en frontend (confirmar contraseña)
    if (form.pass !== form.pass2) {
      setMsg('Las contraseñas no coinciden');
      return;
    }

    try {
      // Evito doble envío marcando loading
      setLoading(true);
      // Aquí le agrego 'accessibility' al payload para que se guarden los checks
      const payload = { name: form.name, email: form.email, password: form.pass, accessibility: acc };
      // Para debug: ver en la consola del navegador exactamente qué mando
      console.log('RegistroEmpresa payload:', payload);
      const res = await fetch('http://localhost:3000/api/users/register-company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      // Ver en consola la respuesta del servidor (status + body)
      console.log('RegistroEmpresa response:', res.status, data);
      if (res.ok) {
        setMsg('Empresa registrada');
      } else {
        // Si el backend dice 'El usuario ya existe' lo mostramos acá
        setMsg(data.error || 'Error');
      }
    } catch (err) {
      console.error('RegistroEmpresa fetch error:', err);
      setMsg('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="perfil-emp-page">
      {/* Header con nav y título */}
      <header className="pe-hero">
        <div className="nav-links">
          <button onClick={() => (window.location.hash = '#inicio')}>Inicio</button>
          <button className="btn-secondary" onClick={onBack}>Volver atrás</button>
        </div>
        <img
          className="pe-hero-img"
          src="https://i.imgur.com/9bmoDHn.png"
          alt="Bienvenida"
        />
        <h1 className="pe-title">Registra tu empresa en SAVI</h1>
      </header>

      <div className="pe-subtitle">Te pedimos que completes los siguientes campos para poder iniciarte en SAVI</div>

      <main className="pe-main">
  {/* Formulario principal para datos de la empresa */}
  <form className="pe-card form" onSubmit={submit}>
          <label>Nombre de la empresa</label>
          <input className="pe-input" placeholder="" value={form.name} name="name" onChange={e=>handle('name', e.target.value)} />

          <label>Email</label>
          <input className="pe-input" placeholder="ejemplo@gmail.com" value={form.email} name="email" onChange={e=>handle('email', e.target.value)} />

          <label>Contraseña</label>
          <input className="pe-input" type="password" value={form.pass} name="pass" onChange={e=>handle('pass', e.target.value)} />

          <label>Confirmar contraseña</label>
          <input className="pe-input" type="password" value={form.pass2} name="pass2" onChange={e=>handle('pass2', e.target.value)} />

          {/* Botón de envío y notas de ayuda */}
          <button className="pe-submit" type="submit" disabled={loading || !form.name || !form.email || form.pass !== form.pass2}>{loading ? 'Enviando...' : 'Ingresar'}</button>
          {(!form.name || !form.email) && <div style={{marginTop:8, color:'#666', textAlign:'center'}}>Completa nombre y email para continuar</div>}
          {form.pass !== form.pass2 && <div style={{marginTop:8, color:'red', textAlign:'center'}}>Las contraseñas deben coincidir</div>}
          {msg && <div style={{marginTop:12, color: msg.toLowerCase().includes('error') || msg.toLowerCase().includes('usuario') || msg.toLowerCase().includes('conex') ? 'red' : 'green', textAlign:'center'}}>{msg}</div>}
        </form>

        <section className="pe-card acc">
          <h2>¿Qué servicios de accesibilidad ofrecen?</h2>
          {Object.keys(acc).map((k) => (
            <div className="acc-row" key={k}>
              <label className={`acc-box ${acc[k].pasillos ? 'checked' : ''}`}>
                <input type="checkbox" checked={acc[k].pasillos} onChange={() => toggle(k,'pasillos')} />
                <span>Pasillos min 90cm</span>
               </label>
              <label className={`acc-box ${acc[k].ramp ? 'checked' : ''}`}>
                <input type="checkbox" checked={acc[k].ramp} onChange={() => toggle(k,'ramp')} />
                <span>Rampa</span>
              </label>
              <label className={`acc-box ${acc[k].elevator ? 'checked' : ''}`}>
                <input type="checkbox" checked={acc[k].elevator} onChange={() => toggle(k,'elevator')} />
                <span>Ascensor</span>
              </label>
            </div>
          ))}
        </section>
      </main>

      <footer className="footer">
        <div className="footer-socials">
          <span><FaInstagram /></span>
          <span><FaLinkedin /></span>
          <span><FaWhatsapp /></span>
          <span><MdMailOutline /></span>
        </div>
        <div className="footer-text">Contacto: 091 222 333 — savi@gmail.com.uy</div>
      </footer>
    </div>
  );
}
