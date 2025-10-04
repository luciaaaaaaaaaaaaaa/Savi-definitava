import React from 'react';

export default function Registro({ onBack, onGoRegistroPersonal, onGoRegistroEmpresa }) {
  return (
    <div>
      <h1>Registro (placeholder)</h1>
      <button onClick={onBack}>Volver</button>
      <button onClick={onGoRegistroPersonal}>Registro Personal</button>
      <button onClick={onGoRegistroEmpresa}>Registro Empresa</button>
    </div>
  );
}
