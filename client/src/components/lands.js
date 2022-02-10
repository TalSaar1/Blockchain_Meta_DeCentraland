import React, { useState, useEffect } from 'react';

function Lands({ contract, address }) {
    const [lands, setLands] = useState(undefined);

    useEffect(() => {
        const init = async () => {
            if (typeof contract !== 'undefined') {
                const response = await contract.methods.getMyLands().call();
                setLands(response);
            }
        }
        init();
    }, [contract, address]);

    return (
        <>
        lands
        </>
    )
}

export default Lands;