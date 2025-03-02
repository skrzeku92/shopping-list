import React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import * as S from '../assets/styles';
import { Divider } from '@mui/material';
import { List, Product } from '../types/type';
import { useNavigate } from 'react-router-dom';

export type ListCardProps = {
    list: List;
}

const ListCard: React.FC<ListCardProps> = (props: ListCardProps)=> {
    const navigate = useNavigate();
    const getCompleted = (): number => {
        const products = props.list.products;
        if (!products || !products.length) return 0;
        return products.filter((prod)=> prod.completed).length;
    }
    
 return (<Card sx={{ minWidth: 275, padding: 1 }} onClick={()=> navigate('/list/' + props.list.id)}>
    <S.CardHeader>{props.list.title}</S.CardHeader>
    <Divider/>
    {props.list.products && <p>{getCompleted()}/{props.list.products.length}</p>}
    <S.FlexCenter><Avatar sizes='small'>H</Avatar>{props.list.createdBy}</S.FlexCenter>
 </Card>)
}

export default ListCard;