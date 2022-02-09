import React from 'react';
import styled from 'styled-components';
import Land from './land';

const Container = styled.div`
  float: left
`

function RowLands({ lands, account, setSelectedLand, buyLand }) {
    return (
        <Container>
            {lands.map((land, col) => <Land key={col} land={land} account={account} setSelectedLand={setSelectedLand} buyLand={buyLand} />)}
        </Container>
    )
}

export default RowLands;