import styled from 'styled-components';
import { colorPrimary } from './variables';

export const PageWrapper = styled.div`
display: block;
min-height: 100vh;
padding: 20px 0;
position: relative;
background-color: #121212;
width: 100%;
`;

export const FlexCenter = styled.div`
display: flex;
align-items: center;
gap: 12px;
justify-content: center;
`;

export const CardHeader = styled.h2`
line-heigh: 1.2;
margin: 10px 0;
`;

export const FlexVertical = styled.div`
display: flex;
flex-direction: column;
gap: 8px;
`;

export const ProductRow = styled.div<{$isSelected: boolean}>`
display: flex;
gap: 4px;
align-items: center;
padding: 5px 0;
background-color: ${props => props.$isSelected ? 'blue': 'transparent'};
 > p {
    margin: 0;
 }
`;

export const ReadyAddingButton = styled.div<{$left?: boolean}>`
position: absolute;
${props => props.$left ? 'left: 10px;' : 'right: 10px'};
bottom: 20%;
display: flex;
gap: 12px;
`;

export const AddProductButton = styled.div`
position: absolute;
right: 10px;
bottom: 10px;
`;

export const ModalButtonsWrapper = styled.div`
display: flex;
gap: 12px;
align-items: center;
justify-content: flex-end;
margin-top: 20px;
border-top: solid 1px ${colorPrimary};
padding: 15px;
`;
