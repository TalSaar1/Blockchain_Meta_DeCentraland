import React from 'react';
import GuestMap from '../components/guest-map';
import Game from './game';

function Guest({ map, game, setGame }) {
    return (
        <>
            {typeof game === 'undefined' ? <GuestMap map={map} setGame={setGame} /> : <Game game={game} />}
        </>
    )
}

export default Guest;