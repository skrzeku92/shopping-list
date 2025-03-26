import { Button, Grid2 as Grid, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { ChangeEvent, useState } from 'react';
import { getProducts } from '../../utils';
import useDebounce from '../../hooks/debounce';
import { Product } from '../../types/type';
import { ProductRow, ReadyAddingButton } from '../../assets/styles';
import CheckIcon from '@mui/icons-material/Check';

const AddProduct: React.FC = ()=> {
    const [results, setResults] = useState([]);
    const {debounce} = useDebounce();
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    const updateProductList = async (val: string)=> {
        if (val.trim().length < 3) return setResults([]);
        const newProducts = await getProducts(val)
        setResults(newProducts);
    }
    const debouncedChange = debounce(updateProductList, 500);
    const onInputChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void>=>{
        const val = e.target.value;
        debouncedChange(val);
    }

    const onAddProduct = (product: Product) => {
        setSelectedProducts((prev) => [...prev, product]);
    };
    
    const onRemoveProduct = (product: Product) => {
        setSelectedProducts((prev) => prev.filter((s) => s.name !== product.name));
    };
   
    return (
        <div>
           <Grid container spacing={2}>
            <div>
            <TextField id="outlined-basic" label="Dodaj nową pozycje" variant="outlined" onChange={onInputChange}/>
            <div>
            {results.map((r: Product)=> {
                const selected = selectedProducts.find((s)=> s.name === r.name);
                return (<ProductRow $isSelected={!!selected}><IconButton aria-label="delete" size="small">
                {!!selected ? <RemoveIcon fontSize='small' onClick={()=> onRemoveProduct(r)}/> : <AddIcon fontSize="small" onClick={()=> onAddProduct(r)}/>}
              </IconButton><p>{r.name}</p></ProductRow>)
            })}
           </div>
            </div>
            </Grid>

            <ReadyAddingButton>
                <Button variant='contained' startIcon={<CheckIcon/>}>Ready</Button>
            </ReadyAddingButton>
        </div>
    )
}

export default AddProduct;