import React from 'react';
import styled from 'styled-components'
import RowLands from '../components/row-lands';

const Container = styled.div`
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
`

function Map({ map, buyLand }) {
    return (
        <Container>
            {map.map((lands, row) => <RowLands key={row} lands={lands} row={row} buyLand={buyLand} />)}
        </Container>
    )
}

export default Map;