import styled from 'styled-components';

export const ListWrapper = styled.div`
display: flex;
gap: 12px;
flex-flow: row-wrap; 
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
background-color: ${props => props.$isSelected ? 'blue': 'transparent'};
`;

export const ReadyAddingButton = styled.div`
position: absolute;
right: 10px;
bottom: 20%;

`;