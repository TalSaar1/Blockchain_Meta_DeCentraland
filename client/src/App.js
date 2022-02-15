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

const GlobalStyle = createGlobalStyle`
  body {
    background: #505050;
    color: #ffffff;
    margin: 0;
  }

  input {
    border: 1px solid #ffffff;
    width: 100%;
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

        //const response = await contract.methods.getMap().call();
        //const size = Math.sqrt(response.length);
        const owner = await contract.methods.owner().call();
        const map = [];
        for (let i = 0; i < 100; i++) {
          const row = [];
          for (let j = 0; j < 100; j++) {
            row.push({
              tokenId: i * 100 + j,
              owner,
              landType: i % 17 === 15 || i % 17 === 16 || j % 17 === 15 || j % 17 === 16 ? '2' : i >= 17 && i <= 48 && j >= 17 && j <= 48 || i >= 51 && i <= 82 && j >= 51 && j <= 82 ? '1' : '0',
              price: 12,
              content: '',
              row: i,
              col: j
            });
          }
          map.push(row);
        }
        console.log(map)
        setMap(map);
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
        case WALLET: return <Wallet web3={web3} contract={tokenContract} address={accounts[0]} />;
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