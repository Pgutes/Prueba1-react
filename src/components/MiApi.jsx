import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownUpAcrossLine } from '@fortawesome/free-solid-svg-icons'
import '../assets/css/style.css'; 

const MiApi = ({ apiData }) => {        
    
    const [data, setData] = useState([]);// Estado para almacenar los datos originales
    const [search, setSearch] = useState('');// Estado para almacenar el valor de búsqueda
    const [filteredData, setFilteredData] = useState([]);// Estado para almacenar los datos filtrados
    const [sortAsc, setSortAsc] = useState(true);// Estado para controlar el orden ascendente o descendente de la clasificación

    useEffect(() => { // Efecto para actualizar los datos y los datos filtrados cuando llega nueva data desde las props
    setData(apiData);
    setFilteredData(apiData);
    }, [apiData]);

    useEffect(() => { // Efecto para filtrar los datos según el valor de búsqueda
    const searchData = data.filter((pokemon) => {
        const nameMatch = pokemon.pokemon_species.name.toLowerCase().includes(search.toLowerCase());
        const idMatch = String(pokemon.entry_number).includes(search);
        return nameMatch || idMatch;
    });
    setFilteredData(searchData);
    }, [data, search]);

    const handleSearchChange = (value) => { // Función para manejar el cambio en el valor de búsqueda
    setSearch(value);
    };

    const sortById = () => { // Función para ordenar los datos por ID
    const sortedData = [...filteredData].sort((a, b) => {
        return sortAsc ? a.entry_number - b.entry_number : b.entry_number - a.entry_number;
    });
    setFilteredData(sortedData);
    setSortAsc(!sortAsc);
    };

    const inputRef = useRef(null); // Referencia al input de búsqueda

    const handleChangeSearch = (e) => { // Función para manejar el cambio en el input de búsqueda
    handleSearchChange(e.target.value);
    };

    const handleSubmit = (e) => { // Función para manejar el envío del formulario de búsqueda (evita el envío por defecto)
    e.preventDefault();
    };

    const handleSearchClick = () => { // Función para manejar el clic en el botón de búsqueda
        inputRef.current.focus();
    };

    

    return (
    <>
    <div className="Main">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <img src={require("../assets/img/pokemon.jpg")} alt="Pokemon Edicion Azul Game Boy" />
                <a className="navbar-brand" href="#">
                Pokedex Primera Generacion
                </a>
                <form className="d-flex" onSubmit={handleSubmit} role="search">
                <input
                    ref={inputRef}
                    className="form-control me-2"
                    type="search"
                    placeholder="Buscar"
                    aria-label="Search"
                    onChange={handleChangeSearch}
                />
                <button className="btn btn-outline-success" type="button" onClick={handleSearchClick}>
                    Buscar
                </button>
                </form>
            </div>
        </nav>
        <div className="container">
                <button onClick={sortById} className="btn btn-primary mb-3"> <FontAwesomeIcon icon={faArrowDownUpAcrossLine} size='lg'/> Principio/Final</button>
            <table className="table table-dark table-striped table-hover table-bordered">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                </tr>
            </thead>
            <tbody>
                {filteredData &&
                filteredData.map((pokemon) => (
                    <tr key={pokemon.entry_number}>
                    <td>{pokemon.entry_number}</td>
                    <td>{pokemon.pokemon_species.name}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    </>
    );
};

export default MiApi;
