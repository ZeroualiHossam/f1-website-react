import React, { useEffect, useState } from 'react';
import './team-stand.css';
import { fetchTeamsData } from '../../api/api';

function TeamStandings() {
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTeams() {
            try {
                const data = await fetchTeamsData();
                const sortedTeams = data.sort((a, b) => b.points - a.points);
                setTeams(sortedTeams);
            } catch (error) {
                setError(error);
            }
        }

        fetchTeams();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='team-stand-container'>
            <h1>Team Standings</h1>
            <ul className='team-container'>
                {teams.map((team, index) => (
                    <li key={index} className='team-content' style={{ backgroundColor: `#${team.team_colour}` }}>
                        <img className='team_image' src={team.headshot_url} alt="" />
                        <div className='team-name-container'>
                            <h2 className='team_name'>{team.team_name}</h2>
                        </div>
                        <h2 className='team_points'>{team.points}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TeamStandings;
