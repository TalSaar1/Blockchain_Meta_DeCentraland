import React, { useState, useEffect } from 'react';
import RowLands from './row-lands';
import OwnerModal from './owner-modal';
import { MapContainer, ContentContainer, ContentTitle, LandType } from '../style/map';
import { LAND_NFT, LAND_PARK, LAND_ROAD } from '../constants/types';
import { MY_LAND_COLOR, LAND_COLOR, PARK_COLOR, ROAD_COLOR, BLACK_COLOR } from '../constants/colors';

import TokenContract from '../contracts/Token.json';

function OwnerMap({ web3, address, contract, map, updateMap }) {
  const [modalOpen, setModelOpen] = useState(false);
  const [selectedLand, setSelectedLand] = useState(undefined);
  const [contractToken, setContractToken] = useState(undefined);

  useEffect(() => {
    const init = async () => {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = TokenContract.networks[networkId];
        const contractToken = new web3.eth.Contract(
            TokenContract.abi,
            deployedNetwork && deployedNetwork.address,
        );
        setContractToken(contractToken);
    }
    init();
  }, [web3]);

  const renderContent = () => {
    return (
      <ContentContainer>
        <ContentTitle>Content</ContentTitle>
        <LandType style={{ color: MY_LAND_COLOR }}>My Land</LandType>
        <LandType style={{ color: LAND_COLOR }}>Land</LandType>
        <LandType style={{ color: PARK_COLOR }}>Park</LandType>
        <LandType style={{ color: ROAD_COLOR }}>Road</LandType>
      </ContentContainer>
    )
  }

  const approve = async (land) => {
    try {
      await contractToken.methods.approve(contract._address, web3.utils.toWei(land.price.toString(), 'ether')).send({ from: address });
      setModelOpen(false);
    } catch (error) {
      console.log(error)
    }
  }

  const mint = async (land) => {
    if (land.landType === LAND_PARK) {
      land.price = 0;
    }
    
    try {
      await contract.methods.mint(land.row, land.col, land.landType, land.price).send({ from: address });
      updateMap();
      setModelOpen(false);
    } catch (error) {
      console.log(error)
    }
  }

  const transferLand = async (land, to) => {
    try {
      await contract.methods.transferLand(land.tokenId, to).send({ from: address });
      updateMap();
      setModelOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  const updateLand = async (land) => {
    if (typeof land.owner !== 'undefined') {
      delete land.owner;
    }

    try {
      await contract.methods.setLand(land).send({ from: address });
      updateMap();
      setModelOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setModelOpen(typeof selectedLand !== 'undefined');
  }, [selectedLand]);

  const backgroundColor = (land) => {
    switch (land.landType) {
      case LAND_NFT:
        return typeof land.tokenId !== 'undefined' && land.owner === address ? MY_LAND_COLOR : LAND_COLOR;
      case LAND_PARK:
        return PARK_COLOR;
      case LAND_ROAD:
        return ROAD_COLOR;
      default:
        return BLACK_COLOR;
    }
  }

  return (
    <>
      {renderContent()}
      <MapContainer>
        {map.length > 0 ? map.map((lands, col) => {
          return <RowLands
            key={col}
            lands={lands}
            backgroundColor={backgroundColor}
            setSelectedLand={setSelectedLand}
            owner={true}
          />
        }) : 'Loading the map ...' }
      </MapContainer>

      <OwnerModal
        modalOpen={modalOpen}
        land={selectedLand}
        backgroundColor={backgroundColor}
        address={address}
        approve={approve}
        mint={mint}
        transferLand={transferLand}
        updateLand={updateLand}
        onClose={() => setModelOpen(false)}
      />
    </>
  );
}

export default OwnerMap;