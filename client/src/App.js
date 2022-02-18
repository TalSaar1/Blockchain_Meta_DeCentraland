import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import WorldContract from './contracts/World.json';
//import TokenContract from './contracts/Token.json';
import getWeb3 from './getWeb3';
import Main from './pages/main';
import Owner from './pages/owner';
import Guest from './pages/guest';

//import Snake from './games/snake';

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
  const [address, setAddress] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  //const [tokenContract, setTokenContract] = useState(undefined);
  const [owner, setOwner] = useState(undefined);
  const [map, setMap] = useState([]);
  const [page, setPage] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        //const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = WorldContract.networks[networkId];
        const contract = new web3.eth.Contract(
          WorldContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        /*const tokenDeployedNetwork = TokenContract.networks[networkId];
        const tokenContract = new web3.eth.Contract(
          TokenContract.abi,
          tokenDeployedNetwork && tokenDeployedNetwork.address,
        );*/

        setWeb3(web3);
        //setAddress(accounts[0]);
        setContract(contract);
        //setTokenContract(tokenContract);
      } catch (error) {
        // Catch any errors for any of the above operations.
        console.log('Failed to load web3, accounts, or contract.');
        console.error(error);
      }
    }
    init();
  }, []);

  const updateMap = async () => {
    const size = Math.sqrt(await contract.methods.getTokensCount().call());
    const response = await contract.methods.getMap().call();
    const owners = response[0];
    const tokens = JSON.parse(JSON.stringify(response[1]));
    const map = [];

    for (let i = 0; i < size; i++) {
      const row = [];

      for (let j = 0; j < size; j++) {
        const land = JSON.parse(tokens[i * size + j]);
        row.push({ ...land, owner: owners[i * size + j]});
      }

      map.push(row);
    }

    setMap(map);
  }

  useEffect(() => {
    if (typeof web3 !== 'undefined' && typeof contract !== 'undefined') {
      updateMap();
    }
  }, [web3, contract]);

  /*const setOwner = async (owner) => {
    setAddress(owner ? await web3.eth.getAccounts()[0] : undefined);
  }

  const renderPages = () => {
    console.log(page)
    if (typeof address !== 'undefined') {
      switch (page) {
        case MAP: return <Map map={map} updateMap={updateMap} contract={contract} address={address} setPage={setPage} />;
        case WALLET: return <Wallet web3={web3} address={address} />;
        default: return <Main setOwner={setOwner} />;
      }
    } else {
      switch (page) {
        case MAP: return <Map map={map} updateMap={updateMap} contract={contract} address={address} setPage={setPage} />;
        case 'snake': return <Snake size={350} />;
        default: return <Main setOwner={setOwner} />;
      }
    }
  }*/

  const renderPage = () => {
    if (typeof owner === 'undefined') {
      return <Main setOwner={setOwner} />;
    }

    return owner ? <Owner web3={web3} contract={contract} map={map} updateMap={updateMap} /> : <Guest contract={contract} map={map} updateMap={updateMap} />;
  }

  return (
    <>
      <GlobalStyle />
      {renderPage()}
    </>
  );
}

export default App;