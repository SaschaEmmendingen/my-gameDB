import { useState, useEffect } from 'react';

function AddGameForm() {
    const [title, setTitle] = useState('');
    const [developer, setDeveloper] = useState('');
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState('');
    const [games, setGames] = useState([]);
    const [editGameId, setEditGameId] = useState(null);
    const URL = "http://localhost:1312/api/games/";
    
    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setGames(data);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const method = editGameId ? 'PUT' : 'POST';
        const url = editGameId ? `${URL}${editGameId}` : URL;
        const gameData = { title, developer, genre, rating };
        
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gameData)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Game saved:', data);
            resetForm();
            fetchGames();
        } catch (error) {
            console.error('Error saving game:', error);
        }
    };

    const resetForm = () => {
        setTitle('');
        setDeveloper('');
        setGenre('');
        setRating('');
        setEditGameId(null);
    };

    const handleEdit = (game) => {
        setTitle(game.title);
        setDeveloper(game.developer);
        setGenre(game.genre);
        setRating(game.rating);
        setEditGameId(game._id);
    };

    const handleDelete = async (id) => {
        const url = `${URL}${id}`;
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            fetchGames();
        } catch (error) {
            console.error('Error deleting game:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" placeholder="Developer" value={developer} onChange={(e) => setDeveloper(e.target.value)} required />
                <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
                <input type="text" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} required />
                <button type="submit">{editGameId ? 'Update Game' : 'Add Game'}</button>
            </form>
            <ul>
                {games.map((game) => (
                    <li key={game._id}>
                        <span>{game.title} - {game.developer} - {game.genre} - {game.rating}</span>
                        <button onClick={() => handleEdit(game)}>Edit</button>
                        <button onClick={() => handleDelete(game._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AddGameForm;