import React, { useState } from 'react';
import Header from '../../components/header/header';
import './strategist.css';

const circuits = [
    "abu dhabi",
    "australia",
    "austria",
    "azerbaijan",
    "bahrain",
    "belgium",
    "brazil",
    "canada",
    "china",
    "hungary",
    "imola",
    "japan",
    "mexico",
    "miami",
    "monaco",
    "monza",
    "netherlands",
    "qatar",
    "saudi arabia",
    "singapore",
    "spain",
    "united kingdom",
    "usa - austin",
    "usa - vegas"
];

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

            console.log('Response status:', response.status);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const text = await response.text();
            console.log('Raw response text:', text);
            setResponseText(text);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-container">
            <Header />
            <form onSubmit={handleSubmit}>
                <h2>Tyre Data</h2>
                <div className={tyreDataMethod === 'ByStintsData' ? '' : 'hidden'}>
                    <label>Soft Time: </label>
                    <input
                        type="number"
                        value={tyreData.soft.time}
                        onChange={(e) => setTyreData({ ...tyreData, soft: { ...tyreData.soft, time: parseFloat(e.target.value) } })}
                    />
                </div>
                <div className={tyreDataMethod === 'ByStintsData' ? '' : 'hidden'}>
                    <label>Soft Loss: </label>
                    <input
                        type="number"
                        value={tyreData.soft.loss}
                        onChange={(e) => setTyreData({ ...tyreData, soft: { ...tyreData.soft, loss: parseFloat(e.target.value) } })}
                    />
                </div>
                <div className={tyreDataMethod === 'ByStintsData' ? '' : 'hidden'}>
                    <label>Medium Time: </label>
                    <input
                        type="number"
                        value={tyreData.medium.time}
                        onChange={(e) => setTyreData({ ...tyreData, medium: { ...tyreData.medium, time: parseFloat(e.target.value) } })}
                    />
                </div>
                <div className={tyreDataMethod === 'ByStintsData' ? '' : 'hidden'}>
                    <label>Medium Loss: </label>
                    <input
                        type="number"
                        value={tyreData.medium.loss}
                        onChange={(e) => setTyreData({ ...tyreData, medium: { ...tyreData.medium, loss: parseFloat(e.target.value) } })}
                    />
                </div>
                <div className={tyreDataMethod === 'ByStintsData' ? '' : 'hidden'}>
                    <label>Hard Time: </label>
                    <input
                        type="number"
                        value={tyreData.hard.time}
                        onChange={(e) => setTyreData({ ...tyreData, hard: { ...tyreData.hard, time: parseFloat(e.target.value) } })}
                    />
                </div>
                <div className={tyreDataMethod === 'ByStintsData' ? '' : 'hidden'}>
                    <label>Hard Loss: </label>
                    <input
                        type="number"
                        value={tyreData.hard.loss}
                        onChange={(e) => setTyreData({ ...tyreData, hard: { ...tyreData.hard, loss: parseFloat(e.target.value) } })}
                    />
                </div>
                <div>
                    <label>Circuit: </label>
                    <select
                        value={circuit}
                        onChange={(e) => setCircuit(e.target.value)}
                    >
                        <option value="">Select a circuit</option>
                        {circuits.map((circuit, index) => (
                            <option key={index} value={circuit}>{circuit}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Laps: </label>
                    <input
                        type="number"
                        value={laps}
                        onChange={(e) => setLaps(parseInt(e.target.value))}
                    />
                </div>
                <div>
                    <label>Pit Time: </label>
                    <input
                        type="number"
                        value={pitTime}
                        onChange={(e) => setPitTime(parseInt(e.target.value))}
                    />
                </div>
                <div>
                    <label>Tyre Data Method: </label>
                    <select
                        value={tyreDataMethod}
                        onChange={(e) => setTyreDataMethod(e.target.value)}
                    >
                        <option value="ByCircuit">ByCircuit</option>
                        <option value="ByStintsData">ByStintsData</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
            {loading && <p>Estamos calculando la estrategia...</p>}
            {responseText && (
                <div className="response-container">
                    <h3>Response Data</h3>
                    <pre>{responseText}</pre>
                </div>
            )}
        </div>
    );
}

export default Strategist;