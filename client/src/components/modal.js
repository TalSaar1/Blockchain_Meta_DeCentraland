import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Category, Row, ColLeft, Col, ColWithRight, ColRight } from '../style/table';
import { LAND_ROAD, LAND_TYPE } from '../constants/types';
import { TOKEN_SYMBOL } from '../constants/symbols';

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

const Button = styled.button`
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
                        <ColWithRight>
                            <input type='number' value={land.price} disabled />
                        </ColWithRight>
                        <ColRight>
                            <input type='text' value={TOKEN_SYMBOL} disabled />
                        </ColRight>
                    </Row>
                    <Row>
                        <ColLeft>
                            <Category>Content</Category>
                        </ColLeft>
                        <Col>
                            <input type='text' value={land.content} disabled />
                        </Col>
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
                    <Col>
                        <input type="text" value={land.owner} disabled />
                    </Col>
                </Row>
                {renderNoRoad()}
                <Button close onClick={onClose}>Close</Button>
                {functionButton()}
            </Container>
        </WrapperContainer>,
        document.getElementById('portal')
    )
}

export default Modal;