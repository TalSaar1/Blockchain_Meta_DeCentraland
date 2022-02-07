import React from 'react';
import styled from 'styled-components';
import Land from './land';

const Container = styled.div`
  float: left
`

function RowLands({ lands, row, buyLand }) {
    return (
        <Container>
            {lands.map((land, col) => <Land key={col} land={land} row={row} col={col} buyLand={buyLand} />)}
        </Container>
    )
}

export default RowLands;