import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RowLands from '../components/row-lands';
import Modal from '../components/modal';
import { LAND_TYPE } from '../constants/types';

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
          <div style={{ color: "#008b8b"}}>My Land</div>
          <div style={{ color: "#b22222"}}>Land With Owner</div>
          <div style={{ color: "#333333"}}>Land Without Owner</div>
        </>
        : 
        <>
          <div style={{ color: "#b22222"}}>Game</div>
          <div style={{ color: "#008b8b"}}>Empty</div>
        </>}
        <div style={{ color: "#66ff99"}}>Park</div>
        <div style={{ color: "#808080"}}>Road</div>
      </ContentContainer>
    )
  }

  const buyLand = async () => {
    if (typeof selectedLand !== 'undefined') {
      const success = await contract.methods.buyLand(selectedLand.row, selectedLand.col).send({ from: address });
      if (success) {
          const response = await contract.methods.getMap().call();
          setMap(response)
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

  return (
    <>
      <LandDetails>
        {renderLandDetails()}
      </LandDetails>
      <MapContainer>
          {map.map((lands, row) => <RowLands key={row} lands={lands} address={address} setOverLand={setOverLand} setSelectedLand={setSelectedLand} owner={owner} />)}
      </MapContainer>
      {renderContent()}

      <Modal modalOpen={modalOpen} land={selectedLand} address={address} buyLand={buyLand} updateLand={updateLand} play={play} onClose={() => setModelOpen(false)}>jhbkii</Modal>
    </>
  );
}

export default Map;