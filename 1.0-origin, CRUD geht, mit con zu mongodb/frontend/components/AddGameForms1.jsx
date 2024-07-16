import { useState, useEffect } from 'react';

function AddGameForm() {
    const [title, setTitle] = useState('');
    const [developer, setDeveloper] = useState('');
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState('');
    const [games, setGames] = useState([]);
    const [editGameId, setEditGameId] = useState(null);

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const response = await fetch('http://localhost:1312/api/games/');
            const data = await response.json();
            console.log(data);
            setGames(data);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const method = editGameId ? 'PUT' : 'POST';
        const url = editGameId ? `/api/games/${editGameId}` : '/api/games';
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, developer, genre, rating })
            });
            const data = await response.json();
            console.log('Game saved:', data);
            setTitle('');
            setDeveloper('');
            setGenre('');
            setRating('');
            setEditGameId(null);
            fetchGames();
        } catch (error) {
            console.error('Error saving game:', error);
        }
    };

    const handleEdit = (game) => {
        setTitle(game.title);
        setDeveloper(game.developer);
        setGenre(game.genre);
        setRating(game.rating);
        setEditGameId(game.id);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/games/${id}`, {
                method: 'DELETE'
            });
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
            {/* <h2>Games List</h2> */}
            <ul>
                {games.map((game) => (
                    <li key={game.id}>
                        <span>{game.title} - {game.developer} - {game.genre} - {game.rating}</span>
                        <button onClick={() => handleEdit(game)}>Edit</button>
                        <button onClick={() => handleDelete(game.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AddGameForm;