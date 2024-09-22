import React from 'react';
import { useNavigate } from 'react-router-dom';
import './game-section.css';
import StrategistImage from '../../assets/strategist.jpg';
import GuessDriverImage from '../../assets/guess-driver.jpg';

function GameSection({ gameType }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (gameType === 'strategist') {
            navigate('/strategist');
        } else if (gameType === 'guess') {
            navigate('/guess');
        }
    };

    const imageSrc = gameType === 'strategist' ? StrategistImage : GuessDriverImage;
    const title = gameType === 'strategist' ? 'Formula 1 - Strategist' : 'Formula 1 - Guess the Driver';

    return (
        <div className="gamesection-container" onClick={handleClick}>
            <img src={imageSrc} alt={title} />
            <h1>{title}</h1>
        </div>
    );
}

export default GameSection;