import React, { useState, useEffect } from 'react';
import RowLands from './row-lands';
import OwnerModal from './owner-modal';
import { MapContainer, ContentContainer, ContentTitle, LandType } from '../style/map';
import { LAND_NFT, LAND_PARK, LAND_ROAD } from '../constants/types';
import { MY_LAND_COLOR, LAND_COLOR, GAME_COLOR, PARK_COLOR, ROAD_COLOR, BLACK_COLOR } from '../constants/colors';

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
    } catch (error) {
      console.log(error)
    }
  }

  const transferLand = async (land, to) => {
    try {
      await contract.methods.transferLand(land, to).send({ from: address });
      updateMap();
      setModelOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  const updateLand = async (land) => {
    if (typeof land.row !== 'undefined') {
      delete land['row'];
    }
    if (typeof land.col !== 'undefined') {
      delete land['col'];
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
        return typeof address !== 'undefined' && land.owner === address ? MY_LAND_COLOR : typeof address === 'undefined' && land.content !== '' ? GAME_COLOR : LAND_COLOR;
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
        {map.map((lands, row) => {
          return <RowLands
            key={row}
            row={row}
            lands={lands}
            backgroundColor={backgroundColor}
            setSelectedLand={setSelectedLand}
            owner={true}
          />
        })}
      </MapContainer>

      <OwnerModal
        modalOpen={modalOpen}
        land={selectedLand}
        backgroundColor={backgroundColor}
        address={address}
        approve={approve}
        transferLand={transferLand}
        updateLand={updateLand}
        onClose={() => setModelOpen(false)}
      />
    </>
  );
}

export default OwnerMap;