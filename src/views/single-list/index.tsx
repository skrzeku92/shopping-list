import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getList } from '../../utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Button, Typography } from '@mui/material';
import { List, Product } from '../../types/type';
import AddIcon from '@mui/icons-material/Add';

const SingleList: React.FC = ()=> {
    const param = useParams();
    const currentUser = useSelector((s: RootState)=> s.user);
    const [list, setList] = useState<any>();

    const setInitialState = async ()=> {
        if (!param.id || !currentUser) return;
        const newList = await getList(param.id);
        setList(newList);
    }

    useEffect(()=> {
       setInitialState();
    }, [param.id])

    return (
        <div>
            <Typography variant="h3" component="h3">
                h1. Heading
            </Typography>
            {!list ? null : 
            <div>
            {list.products && list.products.map((l)=> (
                <div>{l.name}</div>
            ))}
            </div>
            }
            <div>
            <Button variant="outlined" startIcon={<AddIcon />}>Add product</Button>
            </div>
            
        </div>
    )
}

export default SingleList;