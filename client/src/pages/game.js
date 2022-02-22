import React from 'react';

function Game({ game }) {
    return (
        <iframe title='html game' src={`games/${game}.html`}></iframe>
    )
}

export default Game;