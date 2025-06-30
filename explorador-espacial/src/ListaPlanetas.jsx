import React from 'react';
import Planeta from './Planeta';
import "../src/assets/Styles/ListaPlanetas.css"

export default function ListaPlanetas({ planetas, onEliminar }) {
  return (
    <ul>
      {planetas.map((planeta, index) => (
        <Planeta
          key={index}
          planeta={planeta}
          index={index}
          onEliminar={onEliminar}
        />
      ))}
    </ul>
  );
}