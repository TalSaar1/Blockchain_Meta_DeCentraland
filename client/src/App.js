import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import WorldContract from './contracts/World.json';
import TokenContract from './contracts/Token.json';
import getWeb3 from './getWeb3';
import Navbar from './components/navbar';
import Main from './pages/main';
import Map from './pages/map';
import Wallet from './components/wallet';
import { MAP, WALLET } from './constants/pages';

import Snake from './games/snake';

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
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState([]);
  const [tokenContract, setTokenContract] = useState([]);
  const [owner, setOwner] = useState(undefined);
  const [page, setPage] = useState(MAP);

  useEffect(() => {
    const init = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = WorldContract.networks[networkId];
        const contract = new web3.eth.Contract(
          WorldContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        const tokenDeployedNetwork = TokenContract.networks[networkId];
        const tokenContract = new web3.eth.Contract(
          TokenContract.abi,
          tokenDeployedNetwork && tokenDeployedNetwork.address,
        );

        setWeb3(web3);
        setAccounts(accounts);
        setContract(contract);
        setTokenContract(tokenContract);
      } catch (error) {
        // Catch any errors for any of the above operations.
        console.log('Failed to load web3, accounts, or contract.');
        console.error(error);
      }
    }
    init();
  }, []);

  const renderPages = () => {
    if (typeof owner === 'undefined') {
      return <Main setOwner={setOwner} />;
    }

    if (owner) {
      switch (page) {
        case MAP: return <Map contract={contract} address={accounts[0]} owner={owner} setPage={setPage} />;
        case WALLET: return <Wallet web3={web3} contract={tokenContract} address={accounts[0]} />;
        default: return <></>;
      }
    } else {
      switch (page) {
        case 'snake': return <Snake size={350} />;
        default: return <Map contract={contract} address={accounts[0]} owner={owner} setPage={setPage} />;
      }
    }
  }

  return (
    <>
      <GlobalStyle />
      <Navbar owner={owner} setOwner={setOwner} setPage={setPage} />
      {renderPages()}
    </>
  );
}

export default App;