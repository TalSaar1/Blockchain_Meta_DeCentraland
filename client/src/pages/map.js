import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RowLands from '../components/row-lands';
import Modal from '../components/modal';
import { LAND_NFT, LAND_PARK, LAND_ROAD, LAND_TYPE } from '../constants/types';
import { MY_LAND_COLOR, LAND_COLOR, GAME_COLOR, PARK_COLOR, ROAD_COLOR, BLACK_COLOR } from '../constants/colors';

const MapContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  background: #ffffff;
  border-bottom: 2px solid #000000;
  height: 30px;
`;

const ContentTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: auto 0;
  margin-left: 10px;
  color: #000000;
`;

const LandType = styled.div`
  font-size: 18px;
  margin: auto 0;
  margin-left: 35px;
`;


function Map({ map, setMap, contract, address, owner }) {
  const [modalOpen, setModelOpen] = useState(false);
  const [selectedLand, setSelectedLand] = useState(undefined);
  
  const renderContent = () => {
    return (
      <ContentContainer>
        <ContentTitle>Content</ContentTitle>
        {owner ? 
        <>
          <LandType style={{ color: MY_LAND_COLOR}}>My Land</LandType>
          <LandType style={{ color: LAND_COLOR}}>Land</LandType>
        </>
        : 
        <>
          <LandType style={{ color: GAME_COLOR}}>Game</LandType>
          <LandType style={{ color: LAND_COLOR}}>Empty</LandType>
        </>}
        <LandType style={{ color: PARK_COLOR}}>Park</LandType>
        <LandType style={{ color: ROAD_COLOR}}>Road</LandType>
      </ContentContainer>
    )
  }

  const buyLand = async () => {
    if (typeof selectedLand !== 'undefined') {
      const success = await contract.methods.buyLand(selectedLand.row, selectedLand.col).send({ from: address });
      if (success) {
        const response = await contract.methods.getMap().call();
        setMap(response);
        setModelOpen(false);
      }
    }
  }

  const updateLand = async (newLand) => {
    if (typeof selectedLand !== 'undefined') {
      const success = await contract.methods.setLand(newLand).send({ from: address });
      if (success) {
        const response = await contract.methods.getMap().call();
        setMap(response);
        setModelOpen(false);
      }
    }
  }

  const play = async () => {
    setModelOpen(false);
    alert('That is a good game');
  }

  useEffect(() => {
    setModelOpen(typeof selectedLand !== 'undefined');
  }, [selectedLand]);

  const backgroundColor = (land) => {
    switch (land.landType) {
      case LAND_NFT:
        return owner && land.owner === address ? MY_LAND_COLOR : !owner && land.content !== '' ? GAME_COLOR : LAND_COLOR;
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
        {map.map((lands, row) => <RowLands key={row} lands={lands} backgroundColor={backgroundColor} setSelectedLand={setSelectedLand} />)}
      </MapContainer>

      <Modal
        modalOpen={modalOpen}
        land={selectedLand}
        backgroundColor={backgroundColor}
        owner={owner}
        address={address}
        buyLand={buyLand}
        updateLand={updateLand}
        play={play}
        onClose={() => setModelOpen(false)}
      ></Modal>
    </>
  );
}

export default Map;