import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, getList, MergeProducts, UpdateFirestoreList } from '../../helpers/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Button, Checkbox, Dialog, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { List, Product } from '../../types/type';
import AddIcon from '@mui/icons-material/Add';
import { doc, onSnapshot } from 'firebase/firestore';
import { setLists, updateList } from '../../redux/reducers/list';
import AddProduct from '../add-product';
import * as S from '../../assets/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const SingleList: React.FC = ()=> {
    const param = useParams();
    const list = useSelector((state: RootState) => state.lists.find((l)=> l.id === param.id));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [hasChanges, setHasChanges] = useState<boolean>(false);
    const [dialogAddProductShown, toggleDialogAddProduct] = useState<boolean>(false);

    const handleSaveList = async () => {
        if (!list) return;
        await UpdateFirestoreList(list);
        setHasChanges(false);
      };

      const handleCloseListPopup = ()=> {
        toggleDialogAddProduct(false);
      }

      const onAddProducts = ()=> {
        toggleDialogAddProduct(false);
        setHasChanges(true);
      }

      const sortProducts = (products: Product[]): Product[] => {
        const sortedProducts = [...products].sort((a, b) => {
          if (a.completed === b.completed) {
            return a.name.localeCompare(b.name);
          }
          return a.completed ? 1 : -1;
        });
        return sortedProducts;
      }

      /** Function that handles the product checkbox click. */
      const onChecked = (productName: string, val: boolean)=> {
        if (!list) {
          console.error('Unable to get List in onChecked function');
          return;
        }
        const newProducts = list.products.map((p)=> {
          if (p.name === productName)
            return {...p, completed: val}
          return p
        })
        dispatch(updateList({...list, products: newProducts}))
        setHasChanges(true);
      }

      const getSortedProducts = (): React.ReactNode => {
        if (!list) return null;
        const sortedProducts = sortProducts(list.products || []);
        return sortedProducts.map((l, index)=> (
          <FormControlLabel control={<Checkbox checked={l.completed} onChange={(_, val: boolean)=> onChecked(l.name, val)} />} label={l.name} key={index}/>
      ))
    }

    useEffect(() => {
        const listRef = doc(db, "lists", param.id ?? '');
        const unsubscribe = onSnapshot(listRef, (docSnap) => {
          console.log('onSnapshot');
          if (docSnap.exists()) {
            const firestoreData = docSnap.data() as List;
            if (!list) {
              const id = docSnap.id;
              dispatch(updateList({ ...firestoreData, id }));
              return;
            }
            const mergedProducts: Product[] = MergeProducts(list.products || [], firestoreData.products || []);
            const newList = {
                ...list, 
                products: mergedProducts
            }
            dispatch(updateList(newList));
          }
        });
    
        return () => unsubscribe();
      }, [param.id, dispatch]);

    

    return (
        <S.PageWrapper>
            <Typography variant="h3" component="h3">
                {list?.title || 'List not found'}
            </Typography>
            {!list ? null : 
            <FormGroup>
              {getSortedProducts()}
            </FormGroup>
            }
            <S.ReadyAddingButton>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={()=>toggleDialogAddProduct(true)}>Add product</Button>
            {hasChanges && <Button variant='contained' onClick={handleSaveList}>Save</Button>}
            </S.ReadyAddingButton>
            <S.ReadyAddingButton $left={true}>
              <Button variant="outlined" onClick={()=> navigate('/')} startIcon={<ArrowBackIosIcon/>} >Back to lists</Button>
            </S.ReadyAddingButton>

            <Dialog
            open={dialogAddProductShown}
            fullWidth
            onClose={()=>handleCloseListPopup}>
              <AddProduct targetList={list} handleChange={onAddProducts} handleClose={()=> toggleDialogAddProduct(false)}/>
            </Dialog>
        </S.PageWrapper>
    )
}

export default SingleList;