import './App.css';
import React, { useState, useEffect } from 'react';
import MiApi from './components/MiApi';

function App() {
  const [data, setData] = useState([]);   // data es el estado, setData es la función que actualiza el estado
  const urlApi = 'https://pokeapi.co/api/v2/pokedex/2/'; // url de la API

  useEffect(() => { // useEffect se ejecuta al montar el componente MiApi
    const fetchData = async () => {
      try {
        const response = await fetch(urlApi); // Realiza una solicitud a la URL de la API
        const data = await response.json(); // Convierte la respuesta en formato JSON
        setData(data.pokemon_entries); // Actualiza el estado con los datos obtenidos de la API
      } catch (error) {
        console.log(error);
        alert('Error al obtener los datos'); // Muestra una alerta en caso de error al obtener los datos
      }
    };
    fetchData(); // Invoca la función fetchData para obtener los datos de la API
  }, []);

  return (
  <>
    <div className="App">
      <MiApi apiData={data} /> {/* Renderiza el componente MiApi y pasa los datos de la API como prop */}
      <footer className="d-flex " >
        <p>por Pedro Gutes</p>
      </footer>
    </div>
  </>
  );
}

export default App;