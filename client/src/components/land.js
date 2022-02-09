import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: ${props => props.owner ? "#008b8b" : props.other ? "#b22222" : props.nft ? "#333333" : props.park ? "#66ff99" : "#808080"};
  border: 1px solid black;
  height: 30px;
  width: 30px;
  cursor: ${props => props.nft ? "pointer" : ""};
`

function Land({ land, account, setSelectedLand, buyLand }) {
    switch (land.landType) {
        case "0":
            if (land.owner === account) {
                return (
                    <Container
                        owner
                        onMouseEnter={() => setSelectedLand(land)}
                        onMouseLeave={() => setSelectedLand(undefined)}
                    />
                )
            }
            if (land.owner !== '0x0000000000000000000000000000000000000000') {
                return (
                    <Container
                        other
                        onMouseEnter={() => setSelectedLand(land)}
                        onMouseLeave={() => setSelectedLand(undefined)}
                        onClick={() => buyLand(land)}
                    />
                );
            }
            return (
                <Container
                    nft
                    onMouseEnter={() => setSelectedLand(land)}
                    onMouseLeave={() => setSelectedLand(undefined)}
                    onClick={() => buyLand(land)}
                />
            );
        case "1":
            return (
                <Container park/>
            );
        case "2":
            return (
                <Container road/>
            );
        default:
            console.log("Error land type in (", land.row, ",", land.col, ")");
    }
}

export default Land;