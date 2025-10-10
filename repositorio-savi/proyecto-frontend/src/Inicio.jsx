import React, { useState } from "react";
import ModalLogin from "./ModalLogin";
import "./Inicio.css";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

const Inicio = ({ onGoRegistro, onGoInicioUsuario }) => {
  const [open, setOpen] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const toggle = (i) => {
    setOpen(open === i ? null : i);
  };

  return (
    <div className="inicio">

      <section className="hero">
        <div className="nav-links">
          <button onClick={() => setShowLogin(true)}>Iniciar sesión</button>
          <button onClick={onGoRegistro}>Registrarse</button>
        </div>
        <div className="logo-title">
          <img src="https://i.imgur.com/5MlZOKV.png" alt="Logo SAVI" className="logo" />
          <h1 className="logo-title__title">S A V I</h1>
        </div>
        <p>
          Conectamos a las personas con locales gastronómicos accesibles,
          calificaciones reales y un sello de certificación que impulsa la
          inclusión.
        </p>
      </section>

      <section className="opciones">
        <h2>Locales destacados:</h2>
        <div className="cards">
          <div className="opcion-card">
            <img src="https://i.imgur.com/ZifMmLa.jpeg" alt="Opción 1" />
            <div className="opcion-card-overlay">
              <p>Kinko</p>
              <p>Poctitos</p>
              <p>Rampa</p>
            </div>
          </div>
          <div className="opcion-card">
            <img src="https://i.imgur.com/ZifMmLa.jpeg" alt="Opción 2" />
            <div className="opcion-card-overlay">
              <p>EstrellaFresca</p>
              <p>Centro</p>
              <p>Baño adaptado</p>
            </div>
          </div>
          <div className="opcion-card">
            <img src="https://i.imgur.com/ZifMmLa.jpeg" alt="Opción 3" />
            <div className="opcion-card-overlay">
              <p>Geant</p>
              <p>Carrasco</p>
              <p>Caja accesible</p>
            </div>
          </div>
        </div>
        <div className="ver-todos-link">
          <button onClick={onGoInicioUsuario} className="link-button">
            ver todos los comercios
          </button>
        </div>
      </section>

      <section className="quienes-somos">
        <div className="texto">
          <h2>¿Quiénes somos?</h2>
          <p> Nuestro equipo SAVI está conformado por 9 integrantes comprometidos con la accesibilidad y la creación de entornos más inclusivos.</p>
          <div className="quienes-grid">
            <div className="quienes-card">
              <h3>Misión</h3>
              <p>Nos encargamos de facilitar el paso a información sobre locales accesibles en Montevideo, para que las personas en situación de disapacidad puedan elegir y disfrutar con libertad y confianza a través de una herramienta digital.</p>
            </div>
            <div className="quienes-card">
              <h3>Visión</h3>
              <p>Buscamos convertirnos en la plataforma líder en inclusión digital en Montevideo y Uruguay, expandiéndose a otros rubros y promoviendo una sociedad más accesible, justa y participativa.</p>
            </div>
            <div className="quienes-card">
              <h3>Valores</h3>
              <p><strong>Inclusión</strong>: participación para todos. <strong>Accesibilidad</strong>: eliminación de barreras. <strong>Innovación</strong>: tecnología para mejorar vidas. <strong>Responsabilidad social</strong>: compromiso empresarial con la accesibilidad. <strong>Transparencia</strong>: información clara y confiable.</p>
            </div>
            <div className="quienes-card">
              <h3>Colaboradores</h3>
              <p>Para colaborar puedes ponerte en contacto con nosotros a través de nuestro mail o redes sociales.</p>
            </div>
          </div>
          <div className="contacto-centrado">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSedbA9MW9OLE-KpcYjyagUL7r2RMYh987UuhBZWXo6wNRkV7A/viewform">
            <button className="contacto-btn">Contactanos</button>
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-socials">
          <span><FaInstagram /></span>
          <span><FaLinkedin /></span>
          <span><FaWhatsapp /></span>
          <span><MdMailOutline /></span>
        </div>
        <div className="footer-text">Contacto: 091 222 333 — savi@gmail.com.uy</div>
      </footer>
      <ModalLogin isOpen={showLogin} onClose={() => setShowLogin(false)} onLoginSuccess={onGoInicioUsuario} />
    </div>
  );
};

export default Inicio;