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
        const size = Math.sqrt(await contract.methods.getTokensCount().call());
        const response = await contract.methods.getMap().call();
        const owners = response[0];
        const tokens = JSON.parse(JSON.stringify(response[1]));
        const world = [];
        for (let i = 0; i < size; i++) {
          const row = [];
          for (let j = 0; j < size; j++) {
            const land = JSON.parse(tokens[i * size + j]);
            row.push({ ...land, owner: owners[i * size + j]});
          }
          world.push(row)
        }
        setMap(world);

        /*const map = [];
        for (let i = 0; i < 100; i++) {
          const row = [];
          for (let j = 0; j < 100; j++) {
            if (i % 17 === 15 || i % 17 === 16 || j % 17 === 15 || j % 17 === 16) {
              row.push({landType: '2'});
            } else if (i >= 17 && i <= 48 && j >= 17 && j <= 48 || i >= 51 && i <= 82 && j >= 51 && j <= 82) {
              row.push({
                landType: '1',
              });
            } else {
              row.push({
                landType: '0',
                price: Math.floor(Math.random() * 16) + 5,
              });
            }
          }
          map.push(row);
        }
        console.log(JSON.stringify(map, null, 4))
        setMap(map);*/

        /*const map = [];
        for (let i = 0; i < 10; i++) {
          const row = [];
          for (let j = 0; j < 10; j++) {
            if (i % 4 === 2 || i % 4 === 3 || j % 4 === 2 || j % 4 === 3) {
              row.push({tokenId: i * 10 + j + 1, landType: '2'});
            } else if (i >= 0 && i <= 1 && j >= 0 && j <= 1 || i >= 4 && i <= 5 && j >= 4 && j <= 5) {
              row.push({
                tokenId: i * 10 + j + 1,
                landType: '1',
              });
            } else {
              row.push({
                tokenId: i * 10 + j + 1,
                landType: '0',
                price: Math.floor(Math.random() * 16) + 5,
              });
            }
          }
          map.push(row);
        }
        console.log(JSON.stringify(map, null, 4))
        setMap(map);*/
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