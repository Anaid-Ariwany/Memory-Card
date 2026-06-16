import React, { useState } from 'react'
import Board from './components/Board'
import Scoreboard from './components/Scoreboard'
import Leaderboard from './components/Leaderboard'

export default function App() {
    const [difficulty, setDifficulty] = useState('medium') // medium => 12 cards
    const [gameKey, setGameKey] = useState(0)

    return (
        <div className="app-root">
            <header className="app-header">
                <div className="title-wrap">
                    <h1>Memory Card Game</h1>
                    <div className="controls">
                        <label>
                            Difficulty:
                            <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                                <option value="easy">Easy (8 cards)</option>
                                <option value="medium">Medium (12 cards)</option>
                                <option value="hard">Hard (16 cards)</option>
                            </select>
                        </label>
                        <button className="btn" onClick={() => setGameKey(k => k + 1)}>New Game</button>
                    </div>
                </div>
            </header>

            <main>
                <Scoreboard />
                <Board key={gameKey} difficulty={difficulty} />
                <Leaderboard />
            </main>

            <footer className="app-footer">Images from PokeAPI</footer>
        </div>
    )
}
