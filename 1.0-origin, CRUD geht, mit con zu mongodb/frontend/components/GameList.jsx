import { useState, useEffect } from 'react';

function GameList() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('http://localhost:1312/api/games/')
            .then(response => response.json())
            .then(data => setGames(data))
            .catch(error => console.error('Error fetching games:', error));
    }, []);

    return (
        <div>
            <h2>Game List</h2>
            <ul>
                {games.map(game => (
                    <li key={game._id}>
                        <strong>{game.title}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GameList;