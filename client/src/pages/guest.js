import React from 'react';
import Navbar from '../components/navbar';
import Map from '../components/map';

function Guest({ contract, map, updateMap }) {
    //const [page, setPage] = useState(undefined);

    return (
        <>
            <Navbar owner={false} setPage={undefined} />
            <Map address={undefined} contract={contract} map={map} updateMap={updateMap} />
        </>
    )
}

export default Guest;