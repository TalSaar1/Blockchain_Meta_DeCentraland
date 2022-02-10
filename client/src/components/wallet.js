import React, { useState, useEffect } from 'react';

function Wallet({ contract, address }) {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const init = async () => {
            console.log(contract);
            /*const response = await contract.methods.balaceOf(address).send({ from: address });
            setBalance(response);*/
        }
        init();
    }, [contract, address]);

    return (
        <>
            Address: {address}<br />
            Balance: {balance}
        </>
    )
}

export default Wallet;