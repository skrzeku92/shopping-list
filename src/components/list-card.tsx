import React from 'react';
import Avatar from '@mui/material/Avatar';
import { List, Product } from '../assets/mock';

export type ListCardProps = {
    list: List;
}

const ListCard: React.FC<ListCardProps> = (props: ListCardProps)=> {
    const getCompleted = (): Product[] => {
        const products = props.list.products;
        return products.filter((prod)=> prod.completed);
    }
 return (<div>
    <h2>{props.list.name}</h2>
    <p>{getCompleted().length}/{props.list.products.length}</p>
    <p><Avatar>H</Avatar>
{props.list.createdBy}</p>
 </div>)   
}

export default ListCard;