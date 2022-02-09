import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import WorldContract from './contracts/World.json';
//import TokenContract from './contracts/Token.json';
//import TokenSaleContract from './contracts/TokenSale.json';
import getWeb3 from './getWeb3';
import Navbar from './components/navbar';
import Main from './pages/main';
import Map from './pages/map';

const GlobalStyle = createGlobalStyle`
  body {
    background: #505050;
    color: #ffffff;
    margin: 0;
  }
`;

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState([]);
  const [map, setMap] = useState([]);
  const [owner, setOwner] = useState(undefined);

  /*const [token, setToken] = useState([]);
  const [tokenSale, setTokenSale] = useState([]);*/

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

        /*const check1 = TokenContract.networks[networkId];
        const temp1 = new web3.eth.Contract(
          TokenContract.abi,
          check1 && check1.address
        )

        const check = TokenSaleContract.networks[networkId];
        const temp = new web3.eth.Contract(
          TokenSaleContract.abi,
          check && check.address
        )*/

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setWeb3(web3);
        setAccounts(accounts);
        setContract(contract);
        //setToken(temp1);
        //setTokenSale(temp);
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
      console.log(response);
      setMap(response)
    }

    if (typeof web3 !== 'undefined' 
        && typeof accounts !== 'undefined'
        && typeof contract !== 'undefined') {
      load();
    }
  }, [web3, accounts, contract])

  /*const hello = async () => {
    if (typeof tokenSale.methods !== 'undefined') {
      await tokenSale.methods.buyTokens(5).send({ from: accounts[0] });
      const res = await token.methods.balanceOf(accounts[0]).call();
      console.log(res)
    }
  }*/

  return (
    <>
      <GlobalStyle />
      <Navbar owner={owner} setOwner={setOwner} />
      {typeof owner === 'undefined' ? <Main setOwner={setOwner} /> : <Map map={map} setMap={setMap} contract={contract} account={accounts[0]} /> }
    </>

  );
}

export default App;