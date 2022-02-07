import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: ${props => props.nft ? "#333333" : props.park ? "#66ff99" : "#aaaaaa"};
  border: 1px solid black;
  height: 50px;
  width: 50px;
  cursor: ${props => props.nft ? "pointer" : ""};
`

function Land({ land, row, col, buyLand }) {
    switch (land.landType) {
        case "0": return (<Container nft 
            onMouseOver={() => console.log(land)}
            onClick={() => buyLand(row, col)}
            />);
        case "1": return (<Container park/>);
        case "2": return (<Container road/>);
        default: return (<>Error</>);
    }
}

export default Land;