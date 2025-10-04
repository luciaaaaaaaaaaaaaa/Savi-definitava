import React from 'react';

/**
 * Perfil
 * Componente que muestra acciones básicas del perfil del usuario.
 * Props:
 * - onEditPerfil: callback para ir a la pantalla de edición.
 */
export default function Perfil({ onEditPerfil }) {
  return (
    <div>
      <h2>Perfil</h2>
      <button onClick={onEditPerfil}>Editar perfil</button>
    </div>
  );
}
