import React from 'react';
import styled from 'styled-components';
import ToolTip from './tool-tip';
import { LAND_TYPE } from '../constants/types';
import { TOKEN_SYMBOL } from '../constants/symbols';

const Container = styled.div`
  background: ${props => props.backgroundColor};
  height: 15px;
  width: 15px;
  cursor: pointer;
`;

function Land({ land, backgroundColor, setSelectedLand }) {
    return (
        <ToolTip toolTipText={LAND_TYPE[land.landType] + ' (' + land.row + ',' + land.col + ') Price: ' + land.price + ' ' + TOKEN_SYMBOL}>
            <Container
                backgroundColor={() => backgroundColor(land)}
                onClick={() => setSelectedLand(land)}
            />
        </ToolTip>
    )
}

export default Land;