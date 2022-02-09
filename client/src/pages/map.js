import React, { useState } from 'react';
import styled from 'styled-components';
import RowLands from '../components/row-lands';

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

function Map({ map, setMap, contract, account }) {
    const [selectedLand, setSelectedLand] = useState(undefined);

    const buyLand = async (land) => {
        const success = await contract.methods.buyLand(land.row, land.col).send({ from: account });
        if (success) {
            const response = await contract.methods.getMap().call();
            setMap(response)
        }
    }
    
    const showLandDetails = () => {
        if (typeof selectedLand !== 'undefined') {
          return (
            <>
              <DetailTitle>Land Details</DetailTitle>
              <Detail>Owner: {selectedLand.owner}</Detail>
              <Detail>Price: {selectedLand.price}</Detail>
              <Detail>Location: ({selectedLand.row},{selectedLand.col})</Detail>
            </>
          )
        }
    }

  return (
    <>
      <LandDetails>
        {showLandDetails()}
      </LandDetails>
      <MapContainer>
          {map.map((lands, row) => <RowLands key={row} lands={lands} account={account} setSelectedLand={setSelectedLand} buyLand={buyLand} />)}
      </MapContainer>
      <ContentContainer>
        <h3>Content</h3>
        <div style={{ color: "#008b8b"}}>My Land</div>
        <div style={{ color: "#b22222"}}>Land With Owner</div>
        <div style={{ color: "#333333"}}>Land Without Owner</div>
        <div style={{ color: "#66ff99"}}>Park</div>
        <div style={{ color: "#808080"}}>Road</div>
      </ContentContainer>
    </>
  );
}

export default Map;