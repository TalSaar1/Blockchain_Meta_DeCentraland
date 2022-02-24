import React from 'react';
import ReactDOM from 'react-dom';
import { Category, Row, ColLeft, Col } from '../style/table';
import { WrapperContainer, Container, LandType, Button } from '../style/modal';
import { LAND_TYPE } from '../constants/types';

function GuestModal({ modalOpen, land, backgroundColor, play, onClose }) {
    if (!modalOpen)
        return null;

    return ReactDOM.createPortal(
        <WrapperContainer>
            <Container backgroundColor={backgroundColor(land)}>
                <LandType>{LAND_TYPE[land.landType]} ({land.row},{land.col})</LandType>
                <Row>
                    <ColLeft>
                        <Category>Owner</Category>
                    </ColLeft>
                    <Col>
                        <input type='text' value={land.owner} disabled />
                    </Col>
                </Row>
                {typeof land.game !== 'undefined' && land.game !== '' ?
                    <>
                        <Row>
                            <ColLeft>
                                <Category>Game</Category>
                            </ColLeft>
                            <Col>
                                <input type='text' value={land.game} disabled />
                            </Col>
                        </Row>
                        <Button onClick={() => play(land)}>Play</Button>
                    </>
                    :
                    ''
                }
                <Button close onClick={onClose}>Close</Button>
            </Container>
        </WrapperContainer>,
        document.getElementById('portal')
    )
}


export default GuestModal;