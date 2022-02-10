import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { LAND_ROAD, LAND_TYPE } from '../constants/types';

const WrapperContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #00008b;
  padding: 40px;
  z-index: 1000;
`;

const LandType = styled.div`
    text-align: center;
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 30px;
`;

const Category = styled.div`
    font-size: 20px;
    font-weight: bold;
    padding: 6px 10px 10px 10px;
`;

const Row = styled.div`
    display: table;
    clear: both;
    margin-top: 16px;
`;

const ColLeft = styled.div`
    float: left;
    width: 160px;
    text-align: center;
`;

const ColRight = styled.div`
    float: left;
    width: 460px;
    text-align: center;
`;

const Button = styled.button`
    float: right;
    background: #4caf50;
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
        border: 2px solid #4caf50;
    }
`;

const CloseButton = styled.button`
    background: #f44336;
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
        border: 2px solid #f44336;
    }
`;

function Modal({ modalOpen, land, address, buyLand, updateLand, play, onClose }) {
    if (!modalOpen)
        return null;

    const renderNoRoad = () => {
        if (land.landType !== LAND_ROAD) {
            return (
                <>
                    <Row>
                        <ColLeft>
                            <Category>Price</Category>
                        </ColLeft>
                        <ColRight>
                            <input type='number' value={land.price} disabled />
                        </ColRight>
                    </Row>
                    <Row>
                        <ColLeft>
                            <Category>Content</Category>
                        </ColLeft>
                        <ColRight>
                            <input type='text' value={land.content} disabled />
                        </ColRight>
                    </Row>
                </>
            )
        }
    }

    const functionButton = () => {
        if (land.landType === LAND_ROAD) {
            return (<></>);
        }
        if (typeof address === 'undefined') {
            return (<Button onClick={play}>Play</Button>)
        }
        if (address === land.owner) {
            return (<Button onClick={updateLand}>Update</Button>)
        }
        return (<Button onClick={buyLand}>Buy</Button>)
    }

    return ReactDOM.createPortal(
        <WrapperContainer>
            <Container>
                <LandType>{LAND_TYPE[land.landType]} ({land.row},{land.col})</LandType>
                <Row>
                    <ColLeft>
                        <Category>Owner</Category>
                    </ColLeft>
                    <ColRight>
                        <input type="text" value={land.owner} disabled />
                    </ColRight>
                </Row>
                {renderNoRoad()}
                <CloseButton onClick={onClose}>Close</CloseButton>
                {functionButton()}
            </Container>
        </WrapperContainer>,
        document.getElementById('portal')
    )
}

export default Modal;