import './App.css'
import GameList from '../components/GameList'
import AddGameForm from '../components/AddGameForms'

function App() {
  return (
    <>
      <div className="App">
            <h1>Game Management App</h1>
            <AddGameForm />
            <GameList />
        </div>
    </>
  )
}

export default App