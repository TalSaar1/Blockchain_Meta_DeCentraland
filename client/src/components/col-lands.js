import React from 'react';
import styled from 'styled-components';
import Land from './land';

const Container = styled.div`
    float: left;
`;

function ColLands({ lands, backgroundColor, setSelectedLand, owner }) {
    return (
        <Container>
            {lands.map((land, row) => <Land key={row} land={land} backgroundColor={backgroundColor} setSelectedLand={setSelectedLand} owner={owner} />)}
        </Container>
    )
}

export default ColLands;