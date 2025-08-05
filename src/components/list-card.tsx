import React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import * as S from '../assets/styles';
import { Button, Divider, Grid2 } from '@mui/material';
import { List, Product } from '../types/type';
import { useNavigate } from 'react-router-dom';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';

export type ListCardProps = {
    list: List;
    handleShare: () => void;
    handleDelete: () => void;
}

const ListCard: React.FC<ListCardProps> = (props: ListCardProps) => {
    const navigate = useNavigate();
    const getCompleted = (): number => {
        const products = props.list.products;
        if (!products || !products.length) return 0;
        return products.filter((prod) => prod.completed).length;
    }

    return (
        <Grid2 size={{ xs: 12, md: 6 }}>
            <Card sx={{ minWidth: 275, padding: 1 }} >
                <S.CardHeader onClick={() => navigate('/list/' + props.list.id)}>{props.list.title}</S.CardHeader>
                <Divider />
                {props.list.products && <p>{getCompleted()}/{props.list.products.length}</p>}
                <S.FlexCenter><Avatar sizes='small'>H</Avatar>{props.list.createdBy}</S.FlexCenter>
                {props.list.invited}
                <Grid2 container spacing={2} sx={{justifyContent: 'center'}} className="myown">
                    <Button variant="outlined" color='primary' startIcon={<ShareIcon/>} onClick={props.handleShare}>Share</Button>
                    <Button variant="outlined" color="error" startIcon={<DeleteIcon/>} onClick={props.handleDelete}>Delete</Button>
                </Grid2>
            </Card>
        </Grid2>)
}

export default ListCard;