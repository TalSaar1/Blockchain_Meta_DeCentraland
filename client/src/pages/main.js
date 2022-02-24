import React from 'react';
import styled from 'styled-components';
import { OWNER, GUEST } from '../constants/pages';

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  margin-top: 60px;
  text-align: center;
`;

const Header = styled.div`
  font-size: ${props => props.big ? "50px" : "42px"};
  font-weight: bold;
  padding: 20px;
  color: #000000;
  text-shadow: 2px 2px 8px #ffffff;
`;

const Buttons = styled.div`
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  width: 600px;
  display: flex;
  flex-direction: row;
  margin: 10px;
  margin-top: 80px;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 12px 0;
  font-family: inherit;
  font-size: 20px;
  font-weight: 700;
  background-color: #e1ddd5;
  border: 2px solid #707070;
  border-radius: 35px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  margin: 30px;

  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;

function Main({ setPage }) {
  return (
    <Container>
      <Header big>Welcome to Meta Decentraland</Header>
      <Header small>Enter As:<Header/>
      </Header>
      <Buttons>
        <Button type='button' onClick={() => setPage(OWNER)}>Owner</Button>
        <Button type='button' onClick={() => setPage(GUEST)}>Guset</Button>
      </Buttons>
    </Container>
  )
}

export default Main;