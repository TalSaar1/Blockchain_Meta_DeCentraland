import styled from 'styled-components';

export const WrapperContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;
`;

export const Container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${props => props.backgroundColor};
    padding: 40px;
    z-index: 1000;
`;

export const LandType = styled.div`
    text-align: center;
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 30px;
`;

export const Button = styled.button`
    float: ${props => props.close ? 'left' : 'right'};
    background: ${props => props.close ? '#f44336' : '#4caf50'};
    border: 2px solid #ffffff;
    border-radius: 12px;
    color: white;
    margin-top: 30px;
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
        border: 2px solid ${props => props.close ? '#f44336' : '#4caf50'};
    }
`;

export const Tabs = styled.div`
position: relative;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  background: #ffffff;
  font-family: Open Sans;
  height: 3em;
`;

export const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  width: 50%;

  margin-right: 0.1em;
  font-size: 1em;
  background-color: ${props => (props.active ? "#aaaaaa" : "#ffffff")};
  height: 3em;
  transition: background-color 0.5s ease-in-out;

  :hover {
    background-color: #cccccc;
  }
`;

export const Content = styled.div`
  ${props => (props.active ? "" : "display:none")}
`;