import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
    background: #121212;
    height: 100px;
    width: 100%;
`

const Title = styled.div`
    position: relative;
    top: 50%;
    left: 30px;
    transform: translate(0, -50%);
    color: white;
    text-shadow: 2px 2px 8px #FF0000;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
`

function Navbar() {
    return (
        <Container>
            <Title>E&T.Ltd</Title>
        </Container>
    );
}

export default Navbar;