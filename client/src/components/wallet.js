import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Category, Row, ColLeft, Col, ColWithRight, ColRight } from '../style/table';
import { TOKEN_SYMBOL } from '../constants/symbols';

const Container = styled.div`
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    margin-top: 30px;
    width: 700px;
    background: rgba(30, 30, 30, 0.5);
    border: 2px solid #ffffff;
    text-align: center;
`;

const Header = styled.div`
    margin-top: 30px;
    font-size: ${props => props.small ? '32px' : '40px'};
    font-weight: bold;
`;

const Button = styled.button`
    background: #123456;
    border: 2px solid #ffffff;
    border-radius: 12px;
    color: white;
    margin: 30px;
    padding: 12px 26px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    transition-duration: 0.4s;
    cursor: pointer;

    &:hover {
        background: #ffffff; 
        color: #000000; 
        border: 2px solid #123456;
    }
`;

function Wallet({ web3, contract, address }) {
    const [balance, setBalance] = useState(0);
    const [tokens, setTokens] = useState(0);

    useEffect(() => {
        updateBalance();
    }, [contract, address]);

    const updateBalance = async () => {
        const response = await contract.methods.balanceOf(address).call();
        setBalance(web3.utils.fromWei(response, 'ether'));
    }

    const buyTokens = async (e) => {
        e.preventDefault();
        await contract.methods.buyTokens().send({ from: address, value: web3.utils.toWei(tokens.toString(), 'ether').slice(0, -1) });
        updateBalance();
        setTokens(0);
    }

    const renderRightCol = () => {
        return (
            <ColRight>
                <input type='text' value={TOKEN_SYMBOL} disabled />
            </ColRight>
        )
    }

    return (
        <Container>
            <Header>Wallet</Header>
            <Row>
                <ColLeft>
                    <Category>Address</Category>
                </ColLeft>
                <Col>
                    <input type='text' value={address} disabled />
                </Col>
            </Row>
            <Row>
                <ColLeft>
                    <Category>Balance</Category>
                </ColLeft>
                <ColWithRight>
                    <input type='number' value={balance} disabled />
                </ColWithRight>
                {renderRightCol()}
            </Row>
            <Header small>Buy Tokens</Header>
            <form onSubmit={e => buyTokens(e)}>
                <Row>
                    <ColLeft>
                        <Category>Amount</Category>
                    </ColLeft>
                    <ColWithRight>
                        <input type='number' value={tokens} onChange={e => setTokens(Number(e.target.value))} style={{ color: '#000000' }}/>
                    </ColWithRight>
                    {renderRightCol()}
                </Row>
                <p>1{TOKEN_SYMBOL} = 0.1ETH</p>
                <Button>Buy</Button>
            </form>
        </Container>
    )
}

export default Wallet;