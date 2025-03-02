import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getList } from '../../utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Button, Typography } from '@mui/material';
import { List, Product } from '../../types/type';
import AddIcon from '@mui/icons-material/Add';
import {MockProducts} from '../../temp';

const SingleList: React.FC = ()=> {
    const param = useParams();
    const currentUser = useSelector((s: RootState)=> s.user);
    const [list, setList] = useState<any>();

    const fetchDbProducts = async ()=> {
        const url = "http://localhost:3000/products";
        try {
            const res = await fetch(url);
            const js = await res.json();
            console.log(js);
        }
        catch (e) {
            console.error(e);
        }
    }

    const forE = ()=> {
        MockProducts.forEach((m)=> {
            addSimpleProduct(m);
        })
    }


    const addSimpleProduct = async (prod: any)=> {
        const url = "http://localhost:3000/products";
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: prod.name,
                    category: prod.category
                })
            });
    
            const data = await res.json();
            console.log("Response:", data);
        }
        catch (e) {
            console.error(e);
        }

    }

    const setInitialState = async ()=> {
        if (!param.id || !currentUser) return;
        const newList = await getList(param.id);
        setList(newList);
    }

    useEffect(()=> {
       setInitialState();
       fetchDbProducts();
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
            <Button variant="outlined" startIcon={<AddIcon />} onClick={forE}>Add product</Button>
            </div>
            
        </div>
    )
}

export default SingleList;