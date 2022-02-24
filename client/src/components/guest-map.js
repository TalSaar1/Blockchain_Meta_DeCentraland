import React, { useState, useEffect } from 'react';
import RowLands from './row-lands';
import GuestModal from './guest-modal';
import { MapContainer, ContentContainer, ContentTitle, LandType } from '../style/map';
import { LAND_NFT, LAND_PARK, LAND_ROAD } from '../constants/types';
import { LAND_COLOR, GAME_COLOR, PARK_COLOR, PARK_GAME_COLOR, ROAD_COLOR, BLACK_COLOR } from '../constants/colors';

function GuestMap({ map, setGame }) {
  const [modalOpen, setModelOpen] = useState(false);
  const [selectedLand, setSelectedLand] = useState(undefined);

  const renderContent = () => {
    return (
      <ContentContainer>
        <ContentTitle>Content</ContentTitle>
        <LandType style={{ color: GAME_COLOR}}>Game</LandType>
        <LandType style={{ color: LAND_COLOR}}>Empty</LandType>
        <LandType style={{ color: PARK_COLOR}}>Park</LandType>
        <LandType style={{ color: PARK_GAME_COLOR}}>Park With Game</LandType>
        <LandType style={{ color: ROAD_COLOR}}>Road</LandType>
      </ContentContainer>
    )
  }

  const play = (land) => {
    setModelOpen(false);
    setGame(land.game);
  }

  useEffect(() => {
    setModelOpen(typeof selectedLand !== 'undefined');
  }, [selectedLand]);

  const backgroundColor = (land) => {
    switch (land.landType) {
      case LAND_NFT:
        return land.game !== '' ? GAME_COLOR : LAND_COLOR;
      case LAND_PARK:
        return land.game !== '' ? PARK_GAME_COLOR : PARK_COLOR;
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
            owner={false}
          />
        }) : 'Loading the map ...' }
      </MapContainer>

      <GuestModal
        modalOpen={modalOpen}
        land={selectedLand}
        backgroundColor={backgroundColor}
        play={play}
        onClose={() => setModelOpen(false)}
      />
    </>
  );
}

export default GuestMap;