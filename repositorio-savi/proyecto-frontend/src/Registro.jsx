import React from 'react';
import './registro.css';

export default function Registro({ onBack, onGoRegistroPersonal, onGoRegistroEmpresa }) {
  return (
    <div className="modal-login-backdrop">
      <div className="modal-login" role="dialog" aria-modal="true">
        <button className="close-x" onClick={onBack} aria-label="Cerrar">×</button>
        <h1 className="modal-title">Registro</h1>
        <div className="modal-warning">Elige el tipo de registro</div>

        <div className="modal-login-form">
          <label className="modal-label">Acción</label>
          <div style={{ display: 'flex', gap: '0.75rem', width: '100%', justifyContent: 'center' }}>
            <button className="entrar-btn" onClick={onBack}>Volver</button>
            <button className="entrar-btn" onClick={onGoRegistroPersonal}>Registro Personal</button>
            <button className="entrar-btn" onClick={onGoRegistroEmpresa}>Registro Empresa</button>
          </div>
        </div>
      </div>
    </div>
  );
}
