import React from 'react';
import styled from 'styled-components';
import Land from './land';

const Container = styled.div`
  float: left
`

function RowLands({ lands, account, setOverLand, setSelectedLand, owner }) {
    return (
        <Container>
            {lands.map((land, col) => <Land key={col} land={land} account={account} setOverLand={setOverLand} setSelectedLand={setSelectedLand} owner={owner} />)}
        </Container>
    )
}

export default RowLands;