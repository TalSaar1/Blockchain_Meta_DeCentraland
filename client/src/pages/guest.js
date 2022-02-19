import React from 'react';
import GuestMap from '../components/guest-map';
import Snake from '../games/snake';
import { SNAKE } from '../constants/games';

function Guest({ map, guestPage, setGuestPage }) {
    const renderGuest = () => {
        switch (guestPage) {
            case SNAKE: return <Snake size={350} />;
            default: return <GuestMap map={map} setGuestPage={setGuestPage} />
        }
    }

    return (
        <>
            {renderGuest()}
        </>
    )
}

export default Guest;