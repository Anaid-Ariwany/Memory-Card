import React, { useEffect, useState } from 'react'

export default function Leaderboard() {
    const [board, setBoard] = useState([])

    useEffect(() => {
        const b = JSON.parse(localStorage.getItem('leaderboard') || '[]')
        setBoard(b)
    }, [])

    if (board.length === 0) return null

    return (
        <section className="leaderboard">
            <h2>Leaderboard</h2>
            <ol>
                {board.map((r, i) => (
                    <li key={i}>{new Date(r.date).toLocaleString()} — {r.difficulty} — Moves: {r.moves} — Time: {r.time}s</li>
                ))}
            </ol>
        </section>
    )
}
