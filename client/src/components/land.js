import React from 'react';
import styled from 'styled-components';
import { LAND_NFT, LAND_PARK, MY_LAND, GAME_LAND } from '../constants/types';

const Container = styled.div`
  background: ${props => props.type === MY_LAND ? "#008b8b" : props.type === GAME_LAND ? "#1d4eff" : props.type === LAND_NFT ? "#232323" : props.type === LAND_PARK ? "#22bb22" : "#989898"};
  border: 1px solid black;
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

function Land({ land, account, setOverLand, setSelectedLand, owner }) {
    const type = () => {
        if (owner) {
            return land.landType === LAND_NFT && land.owner === account ? MY_LAND : land.landType;
        }
        return land.landType === LAND_NFT && land.content !== '' ? GAME_LAND : land.landType;
    }

    return (
        <Container
            type={type()}
            onMouseEnter={() => setOverLand(land)}
            onMouseLeave={() => setOverLand(undefined)}
            onClick={() => setSelectedLand(land)}
        />
    )
}

export default Land;