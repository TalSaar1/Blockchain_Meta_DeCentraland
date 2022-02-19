import React, { useState, useEffect } from 'react';
import RowLands from './row-lands';
import OwnerModal from './owner-modal';
import { MapContainer, ContentContainer, ContentTitle, LandType } from '../style/map';
import { LAND_NFT, LAND_PARK, LAND_ROAD } from '../constants/types';
import { MY_LAND_COLOR, LAND_COLOR, GAME_COLOR, PARK_COLOR, ROAD_COLOR, BLACK_COLOR } from '../constants/colors';

function OwnerMap({ address, contract, map, updateMap }) {
  const [modalOpen, setModelOpen] = useState(false);
  const [selectedLand, setSelectedLand] = useState(undefined);

  const renderContent = () => {
    return (
      <ContentContainer>
        <ContentTitle>Content</ContentTitle>
        <LandType style={{ color: MY_LAND_COLOR}}>My Land</LandType>
        <LandType style={{ color: LAND_COLOR}}>Land</LandType>
        <LandType style={{ color: PARK_COLOR}}>Park</LandType>
        <LandType style={{ color: ROAD_COLOR}}>Road</LandType>
      </ContentContainer>
    )
  }

  const transferLand = async (land, to) => {
    const success = await contract.methods.transferLand(land, to).send({ from: address });
    if (success) {
      updateMap();
      setModelOpen(false);
    }
  }

  const updateLand = async (land) => {
    if (typeof land.row !== 'undefined') {
      delete land['row'];
    }
    if (typeof land.col !== 'undefined') {
      delete land['col'];
    }

    const success = await contract.methods.setLand(land).send({ from: address });
    if (success) {
      updateMap();
      setModelOpen(false);
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
        transferLand={transferLand}
        updateLand={updateLand}
        onClose={() => setModelOpen(false)}
      />
    </>
  );
}

export default OwnerMap;