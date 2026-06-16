import React, { useEffect, useState } from 'react'

export default function Scoreboard() {
    const [best, setBest] = useState(0)

    useEffect(() => {
        setBest(Number(localStorage.getItem('bestScore') || 0))
    }, [])

    return (
        <aside className="scoreboard">
            <div><strong>Score:</strong> <span>{best}</span></div>
            <div><strong>Best Score:</strong> <span>{best}</span></div>
        </aside>
    )
}
