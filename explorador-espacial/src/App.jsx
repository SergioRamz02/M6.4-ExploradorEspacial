import React , {useState, useEffect, useMemo} from 'react'
import './App.css'
import BitacoraForm from './BitacoraForm';
import ListaPlanetas from './ListaPlanetas';

function App() {
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState("En órbita");
  const [planetasVisitados, setPlanetasVisitados] = useState(() => {
    const datos = localStorage.getItem('planetas');
    return datos ? JSON.parse(datos) : [];
  });

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

  useEffect(() => {
    localStorage.setItem('planetas', JSON.stringify(planetasVisitados));
  }, [planetasVisitados]);

  const mensajeEstado = useMemo(() => {
    return estadoNave === 'Aterrizando'
      ? '🛬 La nave está aterrizando...'
      : '🛰️ Nave en órbita';
  }, [estadoNave]);

  const agregarPlaneta = (planeta) => {
    setEstadoNave('Aterrizando');
    setPlanetasVisitados([...planetasVisitados, planeta]);
  };

  const eliminarPlaneta = (index) => {
    const actualizados = [...planetasVisitados];
    actualizados.splice(index, 1);
    setPlanetasVisitados(actualizados);
  };

  return (
    <>
    <h1>Exploración espacial</h1>
    <div className="container">
      <h1>Panel de Control</h1>
      <p><strong>Distancia:</strong> {distancia} km</p>
      <p><strong>Combustible:</strong> {combustible}%</p>
      <p><strong>Estado:</strong> {mensajeEstado}</p>

      <BitacoraForm onAgregarPlaneta={agregarPlaneta} />
      
      <h2>🌌 Planetas Registrados</h2>
      <ListaPlanetas planetas={planetasVisitados} onEliminar={eliminarPlaneta} />
    </div>
    </>
  )
}

export default App
