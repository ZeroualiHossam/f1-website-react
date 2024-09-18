import React from 'react';
import './main.css';
import Header from '../../components/header/header';
import TeamStandings from '../../components/teams-standings/team-stand';

function Main() {
    return (

        <div className="main-container">
            <Header/>
            <TeamStandings/>
        </div>
    );
}

export default Main;