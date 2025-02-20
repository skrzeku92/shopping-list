import React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import * as S from '../assets/styles';
import { Divider } from '@mui/material';
import { List, Product } from '../types/type';

export type ListCardProps = {
    list: List;
}

const ListCard: React.FC<ListCardProps> = (props: ListCardProps)=> {
    const getCompleted = (): Product[] => {
        const products = props.list.products;
        return products.filter((prod)=> prod.completed);
    }
    
 return (<Card sx={{ minWidth: 275, padding: 1 }} >
    <S.CardHeader>{props.list.title}</S.CardHeader>
    <Divider/>
    <p>{getCompleted().length}/{props.list.products.length}</p>
    <S.FlexCenter><Avatar sizes='small'>H</Avatar>{props.list.createdBy}</S.FlexCenter>
 </Card>)
}

export default ListCard;