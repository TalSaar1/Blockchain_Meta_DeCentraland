import React from 'react';
import styled from 'styled-components';
import Land from './land';

const Container = styled.div`
  float: left
`

function RowLands({ lands, backgroundColor, setOverLand, setSelectedLand }) {
    return (
        <Container>
            {lands.map((land, col) => <Land key={col} land={land} backgroundColor={backgroundColor} setOverLand={setOverLand} setSelectedLand={setSelectedLand} />)}
        </Container>
    )
}

export default RowLands;