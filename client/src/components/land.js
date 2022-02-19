import React from 'react';
import styled from 'styled-components';
import ToolTip from './tool-tip';
import { LAND_NFT, LAND_ROAD, LAND_TYPE } from '../constants/types';
import { TOKEN_SYMBOL } from '../constants/symbols';

const Container = styled.div`
    border: 1px solid #000000;
    background: ${props => props.backgroundColor};
    height: 15px;
    width: 15px;
    cursor: pointer;
`;

function Land({ row, col, land, backgroundColor, setSelectedLand, owner }) {
    const toolTipText = () => {
        let text = LAND_TYPE[land.landType] + ' (' + row + ',' + col + ') ';

        if (owner && land.landType === LAND_NFT) {
            text += 'Price: ' + land.price + ' ' + TOKEN_SYMBOL;
        } else if (land.game !== '' && land.landType !== LAND_ROAD) {
            text += 'Game: ' + land.game;
        }

        return text;
    } 

    return (
        <ToolTip toolTipText={toolTipText()}>
            <Container
                backgroundColor={() => backgroundColor(land)}
                onClick={() => setSelectedLand({ ...land, row, col })}
            />
        </ToolTip>
    )
}

export default Land;