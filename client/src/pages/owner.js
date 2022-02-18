import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Map from '../components/map';
import Wallet from '../components/wallet';
import { WALLET } from '../constants/pages';

function Owner({ web3, contract, map, updateMap }) {
    const [page, setPage] = useState(undefined);
    const [address, setAddress] = useState(undefined);

    useEffect(() => {
        const init = async () => {
            const accounts = await web3.eth.getAccounts();
            setAddress(accounts[0]);
        }
        init();
    }, [web3]);

    return (
        <>
            <Navbar owner={true} setPage={setPage} />
            {page === WALLET ? <Wallet web3={web3} address={address} /> : <Map address={address} contract={contract} map={map} updateMap={updateMap} />}
        </>
    )
}

export default Owner;