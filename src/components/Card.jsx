import React from 'react'

export default function Card({ card, onClick }) {
    const { flipped, matched, image } = card
    return (
        <button className={`card ${flipped ? 'flipped' : ''} ${matched ? 'matched' : ''}`} onClick={onClick} aria-pressed={flipped}>
            <div className="card-inner">
                <div className="card-front">
                    <img src={image} alt="card" loading="lazy" />
                </div>
                <div className="card-back" aria-hidden={!flipped}></div>
            </div>
        </button>
    )
}
