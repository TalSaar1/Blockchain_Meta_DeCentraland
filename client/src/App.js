import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import WorldContract from './contracts/World.json';
import TokenContract from './contracts/Token.json';
import getWeb3 from './getWeb3';
import Navbar from './components/navbar';
import Main from './pages/main';
import Map from './pages/map';
import Wallet from './components/wallet';
import Lands from './components/lands';
import { MAP, WALLET, LANDS } from './constants/pages';

const GlobalStyle = createGlobalStyle`
  body {
    background: #505050;
    color: #ffffff;
    margin: 0;
  }

  input {
    border: 1px solid #ffffff;
    width: 400px;
    padding: 12px;
    color: #ffffff;
    font-size: 15px;
  }
`;

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState([]);
  const [tokenContract, setTokenContract] = useState([]);
  const [map, setMap] = useState([]);
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

  const renderPages = () => {
    if (typeof owner === 'undefined') {
      return <Main setOwner={setOwner} />;
    }

    if (owner) {
      switch (page) {
        case MAP: return <Map map={map} setMap={setMap} contract={contract} address={accounts[0]} owner={owner} />;
        case WALLET: return <Wallet contract={tokenContract} address={accounts[0]} />;
        case LANDS: return <Lands contract={contract} address={accounts[0]} />;
        default: return <></>;
      }
    }

    return <Map map={map} setMap={setMap} contract={contract} address={accounts[0]} owner={owner} />;
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