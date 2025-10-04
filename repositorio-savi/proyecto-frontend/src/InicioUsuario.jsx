import React from 'react';

export default function InicioUsuario({ onBack, onGoInicio }) {
  return (
    <div>
      <h2>Inicio de Usuario</h2>
      <button onClick={() => (window.location.hash = '#registro-personal')}>Volver al registro</button>
      <button onClick={() => (window.location.hash = '#inicio')}>Ir a Inicio</button>
    </div>
  );
}
