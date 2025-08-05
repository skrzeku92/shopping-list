import { Button, Grid2 as Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { getProducts } from '../../helpers/utils';
import useDebounce from '../../hooks/debounce';
import { List, Product } from '../../types/type';
import * as S from '../../assets/styles';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch } from 'react-redux';
import { updateList } from '../../redux/reducers/list';
import SearchIcon from '@mui/icons-material/Search';

type AddProductProps = {
    targetList?: List;
    handleChange: ()=>void;
    handleClose: ()=>void;
}


const AddProduct: React.FC<AddProductProps> = (props: AddProductProps)=> {
    const [results, setResults] = useState([]);
    const {debounce} = useDebounce();
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const dispatch = useDispatch();

    const updateProductList = async (val?: string)=> {
        if (!val || val.trim().length < 3){
            setResults(await getProducts());
            return;
        }
        setResults(await getProducts(val));
    }
    const debouncedChange = debounce(updateProductList, 500);
    const onInputChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void>=>{
        const val = e.target.value;
        debouncedChange(val);
    }

    const onAddProduct = (product: Product) => {
        const newProduct: Product = {...product, completed: false}
        setSelectedProducts((prev) => [...prev, newProduct]);
    };

    const onConfirm = () => {
        if (!props.targetList) {
            console.error('Target list is missing');
            return;
        }
        const newList = {
            ...props.targetList, products: selectedProducts
        }
        dispatch(updateList(newList)); 
        props.handleChange();
    }
    
    const onRemoveProduct = (product: Product) => {
        setSelectedProducts((prev) => prev.filter((s) => s.name !== product.name));
    };

    useEffect(()=> {
        if (!props.targetList) {
            setSelectedProducts([]);
            return;
        }
        const currentlySelected = props.targetList.products ?? [];
        setSelectedProducts(currentlySelected);
        getProducts().then((products) => {
            setResults(products);
        });
    }, [])
   
    return (
        <div>
           <Grid container spacing={2} sx={{minHeight: 300}}>
            <div>
            <TextField id="outlined-basic" label="Dodaj nową pozycje" variant="outlined" onChange={onInputChange}
             slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <div>
            {results.map((r: Product)=> {
                const selected = selectedProducts.find((s)=> s.name === r.name);
                return (<S.ProductRow $isSelected={!!selected}><IconButton aria-label="delete" size="small">
                {!!selected ? <RemoveIcon fontSize='small' onClick={()=> onRemoveProduct(r)}/> : <AddIcon fontSize="small" onClick={()=> onAddProduct(r)}/>}
              </IconButton><p>{r.name}</p></S.ProductRow>)
            })}
           </div>
            </div>
            </Grid>

            <S.ModalButtonsWrapper>
                <Button variant='outlined' onClick={props.handleClose}>Close</Button>
                <Button variant='contained' startIcon={<CheckIcon/>} onClick={onConfirm}>Ready</Button>
            </S.ModalButtonsWrapper>
        </div>
    )
}

export default AddProduct;