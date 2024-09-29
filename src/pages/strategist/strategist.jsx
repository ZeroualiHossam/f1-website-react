import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import Header from '../../components/header/header';
import './strategist.css';

const circuitMap = {
    "abu dhabi": "Abu Dhabi",
    "australia": "Australia",
    "austria": "Austria",
    "azerbaijan": "Azerbaijan",
    "bahrain": "Bahrain",
    "belgium": "Bélgica",
    "brazil": "Brasil",
    "canada": "Canadá",
    "china": "China",
    "hungary": "Hungría",
    "imola": "Imola",
    "japan": "Japón",
    "mexico": "México",
    "miami": "Miami",
    "monaco": "Mónaco",
    "monza": "Monza",
    "netherlands": "Países Bajos",
    "qatar": "Catar",
    "saudi arabia": "Arabia Saudita",
    "singapore": "Singapur",
    "spain": "España",
    "united kingdom": "Reino Unido",
    "usa - austin": "EE.UU. - Austin",
    "usa - vegas": "EE.UU. - Las Vegas"
};

const methodMap = {
    "ByCircuit": "Por Circuito",
    "ByStintsData": "Por Datos de Stints"
};

const circuits = Object.keys(circuitMap);

function Strategist() {
    const [tyreData, setTyreData] = useState({
        soft: { time: 0.3, loss: 0.1 },
        medium: { time: 0.5, loss: 0.2 },
        hard: { time: 0.7, loss: 0.27 }
    });

    const [circuit, setCircuit] = useState('');
    const [laps, setLaps] = useState(0);
    const [pitTime, setPitTime] = useState(0);
    const [tyreDataMethod, setTyreDataMethod] = useState('ByCircuit');
    const [loading, setLoading] = useState(false);
    const [responseText, setResponseText] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setResponseText('');
        try {
            const response = await fetch('https://f1-api-rfzl.onrender.com/run-strategy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tyre_data: tyreData,
                    circuit,
                    laps,
                    pit_time: pitTime,
                    tyre_data_method: tyreDataMethod
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const text = await response.text();
            setResponseText(text);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <div className="strategist-container">
                <h1>Formula 1 - Strategist</h1>
                <form onSubmit={handleSubmit}>
                    <div className="tyre-method-tabs">
                        {Object.keys(methodMap).map((methodKey) => (
                            <button
                                key={methodKey}
                                type="button"
                                className={tyreDataMethod === methodKey ? 'active' : ''}
                                onClick={() => setTyreDataMethod(methodKey)}
                            >
                                {methodMap[methodKey]} {/* Mostrar el nombre amigable */}
                            </button>
                        ))}
                    </div>
                    <div className="input-frame">
                        {tyreDataMethod === 'ByStintsData' && (
                            <>
                                <div className="input-group">
                                    <label>Soft Time: </label>
                                    <input
                                        type="number"
                                        value={tyreData.soft.time}
                                        onChange={(e) => setTyreData({ ...tyreData, soft: { ...tyreData.soft, time: parseFloat(e.target.value) } })}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Soft Loss: </label>
                                    <input
                                        type="number"
                                        value={tyreData.soft.loss}
                                        onChange={(e) => setTyreData({ ...tyreData, soft: { ...tyreData.soft, loss: parseFloat(e.target.value) } })}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Medium Time: </label>
                                    <input
                                        type="number"
                                        value={tyreData.medium.time}
                                        onChange={(e) => setTyreData({ ...tyreData, medium: { ...tyreData.medium, time: parseFloat(e.target.value) } })}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Medium Loss: </label>
                                    <input
                                        type="number"
                                        value={tyreData.medium.loss}
                                        onChange={(e) => setTyreData({ ...tyreData, medium: { ...tyreData.medium, loss: parseFloat(e.target.value) } })}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Hard Time: </label>
                                    <input
                                        type="number"
                                        value={tyreData.hard.time}
                                        onChange={(e) => setTyreData({ ...tyreData, hard: { ...tyreData.hard, time: parseFloat(e.target.value) } })}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Hard Loss: </label>
                                    <input
                                        type="number"
                                        value={tyreData.hard.loss}
                                        onChange={(e) => setTyreData({ ...tyreData, hard: { ...tyreData.hard, loss: parseFloat(e.target.value) } })}
                                    />
                                </div>
                            </>
                        )}
                        <div className="input-group">
                            <label>Circuit: </label>
                            <select
                                value={circuit}
                                onChange={(e) => setCircuit(e.target.value)}
                            >
                                <option value="">Select a circuit</option>
                                {circuits.map((circuitKey, index) => (
                                    <option key={index} value={circuitKey}>
                                        {circuitMap[circuitKey]} {/* Mostrar el nombre amigable */}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Laps: </label>
                            <input
                                type="number"
                                value={laps}
                                onChange={(e) => setLaps(parseInt(e.target.value))}
                            />
                        </div>
                        <div className="input-group">
                            <label>Pit Time (seconds): </label>
                            <input
                                type="number"
                                value={pitTime}
                                onChange={(e) => setPitTime(parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
                {loading && <p className="loading-text">Estamos calculando la estrategia...</p>}
                {responseText && (
                    <div className="response-container">
                        <h3>Response Data</h3>
                        <pre>{responseText}</pre>
                    </div>
                )}
            </div>

            <Link to="/games" className="arrow-link">
                <img src='https://api.iconify.design/prime:arrow-left.svg?color=red' alt="Arrow" className="arrow-img" />
            </Link>
        </div>
    );
}

export default Strategist;
