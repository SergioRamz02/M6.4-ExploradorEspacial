import React , {useState, useEffect, useMemo} from 'react'
import './App.css'
import Planeta from './Planeta';

function App() {
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState("En órbita");
  const [planetasVisitados, setPlanetasVisitados] = useState([]);

  useEffect(() => {
    console.log("¡El panel está listo!"); // Montaje

    const intervalo = setInterval(() => { // Montaje
      setCombustible(prev => (prev > 0 ? prev - 1 : 0));
      setDistancia(prev=> prev + 1);//(simulación de vuelo)
    }, 1000);

    return () => {
      clearInterval(intervalo); // Desmontaje
      console.log("El panel se ha apagado."); // Desmontaje
    };
  }, []);

  useEffect(() => {
    console.log("¡Combustible actualizado!"); // Actualización
  }, [combustible]);

  const mensajeEstado = useMemo(() => {
    switch (estadoNave) {
      case "Aterrizando":
        return "🛬 La nave está aterrizando...";
      case "En órbita":
        return "🛰️ Nave en órbita";
      default:
        return "🔄 Estado desconocido";
    }
  }, [estadoNave]);

  // Función para aterrizar en un planeta
  const aterrizar = () => {
    setEstadoNave("Aterrizando");
    const nombrePlaneta = `Planeta-${planetasVisitados.length + 1}`;
    setPlanetasVisitados([...planetasVisitados, nombrePlaneta]);
  };


  return (
    <>
    <h1>Exploración espacial</h1>
    <div className="container">
      <h1>Panel de Control</h1>
      <p><strong>Distancia:</strong> {distancia} km</p>
      <p><strong>Combustible:</strong> {combustible}%</p>
      <p><strong>Estado:</strong> {mensajeEstado}</p>

      <button onClick={aterrizar} disabled={estadoNave === "Aterrizando"}>
        Aterrizar
      </button>

      <h2>Planetas Visitados</h2>
      <ul>
        {planetasVisitados.map((nombre, index) => (
          <Planeta key={index} nombre={nombre} />
        ))}
      </ul>
    </div>
    </>
  )
}

export default App
