import React, { useState, useEffect } from 'react';
import MapContract from '../contracts/Map.json';
import getWeb3 from '../getWeb3';

import Map from './map';

function Main() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState([]);
  const [map, setMap] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
  
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = MapContract.networks[networkId];
        const contract = new web3.eth.Contract(
          MapContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
  
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setWeb3(web3);
        setAccounts(accounts);
        setContract(contract);
      } catch (error) {
        // Catch any errors for any of the above operations.
        console.log('Failed to load web3, accounts, or contract.');
        console.error(error);
      }
    }
    init();
  }, []);

  useEffect(() => {
    const load = async () => {
      if (typeof contract.methods === 'undefined')
        return;

      const response = await contract.methods.getMap().call();
      setMap(response)
    }

    if (typeof web3 !== 'undefined' 
        && typeof accounts !== 'undefined'
        && typeof contract !== 'undefined') {
      load();
    }
  }, [web3, accounts, contract])

  return (
    <>
      {typeof web3 === 'undefined' ? 'Loading Web3, accounts, and contract...' : <Map map={map} buyLand={async (row, col) => console.log(await contract.methods.buyLand(row, col).call()) } />}
    </>
  );
}

export default Main;