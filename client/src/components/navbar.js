import React from 'react';
import styled from 'styled-components';
import { MAP, WALLET } from '../constants/pages';

const NavBarContainer = styled.div`
    border-bottom: 2px solid #ffffff;
    position: relative;
    background: #121212;
    color: #ffffff;
    height: 100px;
    width: 100%;
`;

const Title = styled.div`
    text-shadow: 2px 2px 8px #ff0000;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    margin-right: 40px;
`;

const NavBarLinks = styled.div`
    position: relative;
    top: 50%;
    margin-left: 30px;
    transform: translate(0, -50%);
    display: flex;
    flex-direction: row;
    text-align: center;
`;

const Button = styled.div`
    margin-top: 10px;
    margin-left: 70px;
    font-size: 24px;
    cursor: pointer;

    &:hover {
        text-shadow: 2px 2px 4px #FF0000;
    }
`;

function Navbar({ owner, setOwner, setPage }) {
    const renderOwnerButtons = () => {
        if (owner) {
            return (
                <>
                    <Button onClick={() => setPage(MAP)}>Map</Button>
                    <Button onClick={() => setPage(WALLET)}>My Wallet</Button>
                </>
            )
        }
    }

    return (
        <NavBarContainer>
            <NavBarLinks>
                <Title onClick={() => setOwner(undefined)}>E&T.Ltd</Title>
                {renderOwnerButtons()}
            </NavBarLinks>
        </NavBarContainer>
    );
}

export default Navbar;