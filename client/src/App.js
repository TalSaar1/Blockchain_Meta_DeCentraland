import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import WorldContract from './contracts/World.json';
import getWeb3 from './getWeb3';
import Main from './pages/main';
import Navbar from './components/navbar';
import Owner from './pages/owner';
import Guest from './pages/guest';
import { OWNER, GUEST, MAP } from './constants/pages';

const GlobalStyle = createGlobalStyle`
  body {
    background: #505050;
    color: #ffffff;
    margin: 0;
  }

  input,
  select {
    border: 1px solid #ffffff;
    width: 100%;
    padding: 12px;
    color: #ffffff;
    font-size: 15px;
  }

  select {
    color: #000000;
  }
`;

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [map, setMap] = useState([]);
  const [page, setPage] = useState(undefined);
  const [ownerPage, setOwnerPage] = useState(MAP);
  const [guestPage, setGuestPage] = useState(MAP);

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = WorldContract.networks[networkId];
        const contract = new web3.eth.Contract(
          WorldContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        setWeb3(web3);
        setContract(contract);
      } catch (error) {
        console.log('Failed to load web3, accounts, or contract.');
        console.error(error);
      }
    }
    init();
  }, []);

  const updateMap = async () => {
    if (typeof web3 === 'undefined' || typeof contract === 'undefined') {
      return;
    }

    const size = Math.sqrt(await contract.methods.getTokensCount().call());
    const response = await contract.methods.getMap().call();
    const owners = response[0];
    const tokens = response[1];
    const map = [];

    for (let i = 0; i < size; i++) {
      const row = [];

      for (let j = 0; j < size; j++) {
        const land = tokens[i * size + j];
        row.push({ ...land, owner: owners[i * size + j]});
      }

      map.push(row);
    }

    setMap(map);
  }

  useEffect(updateMap, [web3, contract]);

  useEffect(() => {
    setOwnerPage(MAP);
    setGuestPage(MAP);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case OWNER: 
        return (<Owner web3={web3} contract={contract} map={map} updateMap={updateMap} ownerPage={ownerPage} />);
      case GUEST: 
        return (<Guest map={map} guestPage={guestPage} setGuestPage={setGuestPage} />);
      default:
        return (<Main setPage={setPage} />);
    }
  }

  return (
    <>
      <GlobalStyle />
      <Navbar page={page} setPage={setPage} setOwnerPage={setOwnerPage} setGuestPage={setGuestPage} />
      {renderPage()}
    </>
  );
}

export default App;