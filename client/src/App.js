import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import WorldContract from './contracts/World.json';
import world from './map.json';
import getWeb3 from './getWeb3';
import Main from './pages/main';
import Navbar from './components/navbar';
import Owner from './pages/owner';
import Guest from './pages/guest';
import { OWNER, GUEST, MAP } from './constants/pages';

const GlobalStyle = createGlobalStyle`
  body {
    background-image: linear-gradient(to right bottom, #8eb9e7, #78c0e5, #69c6dd, #67cbcf, #73cebe, #6fc2b3, #6cb6a8, #68aa9d, #588e8f, #4f727a, #47575f, #3c3f42);
    background-attachment: fixed;
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

  iframe {
    position: absolute;
    width: 100%;
    height: calc(100% - 102px);
    border: none;
  }
`;

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [map, setMap] = useState([]);
  const [page, setPage] = useState(undefined);
  const [ownerPage, setOwnerPage] = useState(MAP);
  const [game, setGame] = useState(undefined);

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

    const owner = await contract.methods.owner().call();
    const map = [];
    const size = Math.sqrt(world.length);

    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push({ ...world[i * size + j], owner });
      }
      map.push(row);
    }

    const numOfTokens = await contract.methods.getTokensCount().call();
    if (numOfTokens > 0) {
      const response = await contract.methods.getMap().call();
      const owners = response[0];
      const tokens = response[1];

      for (let i = 0; i < numOfTokens; i++) {
        map[tokens[i].row][tokens[i].col].tokenId = Number(tokens[i].tokenId);
        map[tokens[i].row][tokens[i].col].owner = owners[i];
        map[tokens[i].row][tokens[i].col].game = tokens[i].game;
        map[tokens[i].row][tokens[i].col].price = Number(tokens[i].price);
      }
    }

    setMap(map);
  }

  useEffect(updateMap, [web3, contract]);

  useEffect(() => {
    setOwnerPage(MAP);
    setGame(undefined);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case OWNER: 
        return (<Owner web3={web3} contract={contract} map={map} updateMap={updateMap} ownerPage={ownerPage} />);
      case GUEST: 
        return (<Guest map={map} game={game} setGame={setGame} />);
      default:
        return (<Main setPage={setPage} />);
    }
  }

  return (
    <>
      <GlobalStyle />
      <Navbar page={page} setPage={setPage} setOwnerPage={setOwnerPage} setGame={setGame} />
      {renderPage()}
    </>
  );
}

export default App;