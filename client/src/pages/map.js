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

const LandDetails = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  background: #303030;
  border-bottom: 2px solid #ffffff;
  height: 30px;
`;

const DetailTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: auto 0;
  margin-left: 10px;
`;

const Detail = styled.div`
  font-size: 16px;
  margin: auto 0;
  margin-left: 35px;
`;

const ContentContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 20px;
  padding: 0 14px 14px 14px;
  background: #ffffff;
  color: #000000;
  border: 2px solid #000000;
  border-radius: 16px;
  text-align: center; 
`;

function Map({ map, setMap, contract, address, owner }) {
  const [modalOpen, setModelOpen] = useState(false);
  const [selectedLand, setSelectedLand] = useState(undefined);
  const [overLand, setOverLand] = useState(undefined);
  
  const renderLandDetails = () => {
    if (typeof overLand !== 'undefined') {
      return (
        <>
          <DetailTitle>Land Details</DetailTitle>
          <Detail>Type: {LAND_TYPE[overLand.landType]}</Detail>
          <Detail>Owner: {overLand.owner}</Detail>
          {owner ? <Detail>Price: {overLand.price}</Detail> : ''}
          <Detail>Location: ({overLand.row},{overLand.col})</Detail>
        </>
      )
    }
  }

  const renderContent = () => {
    return (
      <ContentContainer>
        <h3>Content</h3>
        {owner ? 
        <>
          <div style={{ color: MY_LAND_COLOR}}>My Land</div>
          <div style={{ color: LAND_COLOR}}>Land</div>
        </>
        : 
        <>
          <div style={{ color: GAME_COLOR}}>Game</div>
          <div style={{ color: LAND_COLOR}}>Empty</div>
        </>}
        <div style={{ color: PARK_COLOR}}>Park</div>
        <div style={{ color: ROAD_COLOR}}>Road</div>
      </ContentContainer>
    )
  }

  const buyLand = async () => {
    if (typeof selectedLand !== 'undefined') {
      const success = await contract.methods.buyLand(selectedLand.row, selectedLand.col).send({ from: address });
      if (success) {
        const response = await contract.methods.getMap().call();
        setMap(response);
      }
    }
  }

  const updateLand = async () => {
    
  }

  const play = async () => {
    
  }

  useEffect(() => {
    setModelOpen(typeof selectedLand !== 'undefined');
  }, [selectedLand])

  const backgroundColor = (land) => {
    switch (land.landType) {
      case LAND_NFT:
          return owner && land.owner === address ? MY_LAND_COLOR : land.content !== '' ? GAME_COLOR : LAND_COLOR;
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
      <LandDetails>
        {renderLandDetails()}
      </LandDetails>
      <MapContainer>
        {map.map((lands, row) => <RowLands key={row} lands={lands} backgroundColor={backgroundColor} setOverLand={setOverLand} setSelectedLand={setSelectedLand} />)}
      </MapContainer>
      {renderContent()}

      <Modal modalOpen={modalOpen} land={selectedLand} backgroundColor={backgroundColor} address={address} buyLand={buyLand} updateLand={updateLand} play={play} onClose={() => setModelOpen(false)}>jhbkii</Modal>
    </>
  );
}

export default Map;