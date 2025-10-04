import React from 'react';

export default function Perfil({ onEditPerfil }) {
  return (
    <div>
      <h2>Perfil</h2>
      <button onClick={onEditPerfil}>Editar perfil</button>
    </div>
  );
}
