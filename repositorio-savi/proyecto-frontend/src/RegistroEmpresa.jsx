import React, { useState } from 'react';
import './RegistroEmpresa.css';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';

// Mantengo la lógica de submit; cambio sólo el layout para que coincida con las capturas
export default function RegistroEmpresa({ onBack }) {
  const [form, setForm] = useState({ name: '', email: '', pass: '', pass2: '' });
  const [msg, setMsg] = useState('');
  const [acc, setAcc] = useState({
    a: { pasillos: false, ramp: false, elevator: true },
    b: { pasillos: false, ramp: false, elevator: false },
    c: { pasillos: false, ramp: false, elevator: false },
    d: { pasillos: false, ramp: false, elevator: false }
  });

  const handle = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const toggle = (k, f) => setAcc(p => ({ ...p, [k]: { ...p[k], [f]: !p[k][f] } }));

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    // validación simple en frontend (confirmar contraseña)
    if (form.pass !== form.pass2) {
      setMsg('Las contraseñas no coinciden');
      return;
    }

    try {
      const payload = { name: form.name, email: form.email, password: form.pass };
      const res = await fetch('http://localhost:3000/api/users/register-company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) setMsg('Empresa registrada'); else setMsg(data.error || 'Error');
    } catch (err) {
      setMsg('Error de conexión');
    }
  };

  return (
    <div className="perfil-emp-page">
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
        <form className="pe-card form" onSubmit={submit}>
          <label>Nombre de la empresa</label>
          <input className="pe-input" placeholder="" value={form.name} name="name" onChange={e=>handle('name', e.target.value)} />

          <label>Email</label>
          <input className="pe-input" placeholder="ejemplo@gmail.com" value={form.email} name="email" onChange={e=>handle('email', e.target.value)} />

          <label>Contraseña</label>
          <input className="pe-input" type="password" value={form.pass} name="pass" onChange={e=>handle('pass', e.target.value)} />

          <label>Confirmar contraseña</label>
          <input className="pe-input" type="password" value={form.pass2} name="pass2" onChange={e=>handle('pass2', e.target.value)} />

          <button className="pe-submit" type="submit">Ingresar</button>
          {msg && <div style={{marginTop:12, color: msg.includes('conex') ? 'red' : 'green', textAlign:'center'}}>{msg}</div>}
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
