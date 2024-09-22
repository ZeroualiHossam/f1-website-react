import React from 'react';
import './games.css';
import Header from '../../components/header/header';
import GameSection from '../../components/game-section/game-section';

function Games() {
    return (
        <div>
            <Header/>
            <div className="games-container">
                <GameSection gameType="strategist" />
                <GameSection gameType="guess" />
            </div>
        </div>
    );
}

export default Games;