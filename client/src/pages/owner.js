import React, { useState, useEffect } from 'react';
import OwnerMap from '../components/owner-map';
import Wallet from './wallet';
import { WALLET } from '../constants/pages';

function Owner({ web3, contract, map, updateMap, ownerPage }) {
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
            {ownerPage === WALLET ? <Wallet web3={web3} address={address} /> : <OwnerMap web3={web3} address={address} contract={contract} map={map} updateMap={updateMap} />}
        </>
    )
}

export default Owner;