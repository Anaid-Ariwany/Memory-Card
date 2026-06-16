import React, { useEffect, useState, useRef } from 'react'
import Card from './Card'
import { fetchPokemonImages } from '../utils/pokemon'

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
    }
}

export default function Board({ difficulty = 'medium' }) {
    const counts = { easy: 8, medium: 12, hard: 16 }
    const total = counts[difficulty] || 12
    const pairs = total / 2

    const [cards, setCards] = useState([])
    const [first, setFirst] = useState(null)
    const [second, setSecond] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [moves, setMoves] = useState(0)
    const [matches, setMatches] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const timerRef = useRef(null)

    useEffect(() => {
        // reset stats
        setMoves(0); setMatches(0); setSeconds(0); setFirst(null); setSecond(null)
        if (timerRef.current) clearInterval(timerRef.current)
        timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000)

        let cancelled = false
        fetchPokemonImages(pairs).then(images => {
            if (cancelled) return
            const deck = images.flatMap((img, idx) => [
                { uid: `${idx}-a`, pairId: idx, image: img, matched: false, flipped: false },
                { uid: `${idx}-b`, pairId: idx, image: img, matched: false, flipped: false }
            ])
            shuffle(deck)
            setCards(deck)
        }).catch(err => {
            console.error('Failed to load images', err)
        })

        return () => {
            cancelled = true
            clearInterval(timerRef.current)
        }
    }, [difficulty])

    useEffect(() => {
        if (first && second) {
            setDisabled(true)
            setMoves(m => m + 1)
            if (first.pairId === second.pairId) {
                // match
                setCards(prev => prev.map(c => c.pairId === first.pairId ? { ...c, matched: true } : c))
                setMatches(m => m + 1)
                resetTurn()
            } else {
                // flip back after short delay
                setTimeout(() => {
                    setCards(prev => prev.map(c => c.uid === first.uid || c.uid === second.uid ? { ...c, flipped: false } : c))
                    resetTurn()
                }, 800)
            }
        }
    }, [first, second])

    useEffect(() => {
        if (matches === pairs && pairs > 0) {
            clearInterval(timerRef.current)
            // save leaderboard and best score
            const best = Number(localStorage.getItem('bestScore') || 0)
            if (matches > best) localStorage.setItem('bestScore', String(matches))
            const board = JSON.parse(localStorage.getItem('leaderboard') || '[]')
            board.push({ date: Date.now(), moves, time: seconds, difficulty, pairs })
            board.sort((a, b) => (a.moves - b.moves) || (a.time - b.time))
            localStorage.setItem('leaderboard', JSON.stringify(board.slice(0, 10)))
        }
    }, [matches])

    function resetTurn() {
        setFirst(null); setSecond(null); setDisabled(false)
    }

    function handleClick(card) {
        if (disabled) return
        if (card.flipped || card.matched) return
        setCards(prev => prev.map(c => c.uid === card.uid ? { ...c, flipped: true } : c))
        if (!first) setFirst(card)
        else if (!second) setSecond(card)
    }

    return (
        <section className="board-root">
            <div className="game-stats">
                <div>Moves: {moves}</div>
                <div>Matches: {matches}/{pairs}</div>
                <div>Time: {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</div>
            </div>
            <div className="board" role="grid">
                {cards.map(card => (
                    <Card key={card.uid} card={card} onClick={() => handleClick(card)} />
                ))}
            </div>
        </section>
    )
}
