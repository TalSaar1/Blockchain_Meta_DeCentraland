import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: ${props => props.backgroundColor};
  border: 1px solid black;
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

function Land({ land, backgroundColor, setOverLand, setSelectedLand }) {
    return (
        <Container
            backgroundColor={() => backgroundColor(land)}
            onMouseEnter={() => setOverLand(land)}
            onMouseLeave={() => setOverLand(undefined)}
            onClick={() => setSelectedLand(land)}
        />
    )
}

export default Land;