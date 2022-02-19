import React from 'react';
import styled from 'styled-components';
import Land from './land';

const Container = styled.div`
  float: left
`

function RowLands({ row, lands, backgroundColor, setSelectedLand, owner }) {
    return (
        <Container>
            {lands.map((land, col) => <Land key={col} row={row} col={col} land={land} backgroundColor={backgroundColor} setSelectedLand={setSelectedLand} owner={owner} />)}
        </Container>
    )
}

export default RowLands;