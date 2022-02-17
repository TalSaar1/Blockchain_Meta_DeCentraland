import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RowLands from '../components/row-lands';
import Modal from '../components/modal';
import { LAND_NFT, LAND_PARK, LAND_ROAD } from '../constants/types';
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

function Map({ contract, address, owner, setPage }) {
  const [map, setMap] = useState([]);
  const [modalOpen, setModelOpen] = useState(false);
  const [selectedLand, setSelectedLand] = useState(undefined);

  const updateMap = async () => {
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

      world.push(row);
    }

    setMap(world);
  }

  useEffect(updateMap, []);
  
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

  const buyLand = async (land) => {
    console.log(land)
    const success = await contract.methods.buyLand(land.tokenId, land.price).send({ from: address });
    console.log(success);
    /*if (success) {
      const response = await contract.methods.getMap().call();
      setMap(response);
      setModelOpen(false);
    }*/
  }

  const updateLand = async (land) => {
    if (land.game === '') {
      delete land['game'];
    }
    if (typeof land.row !== 'undefined') {
      delete land['row'];
    }
    if (typeof land.col !== 'undefined') {
      delete land['col'];
    }

    const success = await contract.methods.updateLand(land.tokenId, JSON.stringify(land)).send({ from: address });
    if (success) {
      setModelOpen(false);
      updateMap();
    }
  }

  const play = async (land) => {
    setModelOpen(false);
    setPage(land.game);
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
        {map.map((lands, row) => {
          return <RowLands
            key={row}
            row={row}
            lands={lands}
            backgroundColor={backgroundColor}
            setSelectedLand={setSelectedLand}
          />
        })}
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