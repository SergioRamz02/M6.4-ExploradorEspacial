import React , {useEffect} from "react";

export default function Planeta({ planeta, onEliminar, index }) {
  useEffect(() => {
    console.log(`¡El planeta ${planeta.nombre} ha aparecido!`);
    return () => {
      console.log(`¡El planeta ${planeta.nombre} ha desaparecido!`);
    };
  }, [planeta.nombre]);

  return (
    <li>
      <h3>{planeta.nombre}</h3>
      <p>{planeta.descripcion}</p>
      {planeta.imagen && <img src={planeta.imagen} alt={planeta.nombre} />}
      <button onClick={() => onEliminar(index)}>Eliminar</button>
    </li>
  );
}