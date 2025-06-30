import React, { useRef, useState } from 'react';
import "../src/assets/Styles/BitacoraForm.css"

export default function BitacoraForm({ onAgregarPlaneta }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const inputImagenRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoPlaneta = {
      nombre,
      descripcion,
      imagen: imagen ? URL.createObjectURL(imagen) : null,
    };

    onAgregarPlaneta(nuevoPlaneta);

    setNombre('');
    setDescripcion('');
    setImagen(null);
    if (inputImagenRef.current) inputImagenRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del planeta"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />
      <input
        type="file"
        ref={inputImagenRef}
        onChange={(e) => setImagen(e.target.files[0])}
      />
      <button type="submit">Registrar planeta</button>
    </form>
  );
}
