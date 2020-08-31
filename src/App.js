import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Container from './component/Container';


function App() {
    const [countryResponse, setCountryResponse] = useState([]);
    useEffect(() => {
        axios.get('./assests/countries.json')
            .then(response => {
                setCountryResponse(response.data);
            })
            .catch(error => {
                throw error;
            });
    }, []);
    return (
        <div className="app">
            <div className="list">
                <Container data={countryResponse} />
            </div>
        </div>

    );
}
export default App;

