import React, { useState } from 'react'
import Board from './components/Board'
import Scoreboard from './components/Scoreboard'
import Leaderboard from './components/Leaderboard'

export default function App() {
    const [difficulty, setDifficulty] = useState('medium') // medium => 12 cards

    return (
        <div className="app-root">
            <header className="app-header">
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
                </div>
            </header>

            <main>
                <Scoreboard />
                <Board difficulty={difficulty} />
                <Leaderboard />
            </main>

            <footer className="app-footer">Built with React • Images from PokeAPI</footer>
        </div>
    )
}
