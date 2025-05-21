import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, getList, MergeProducts, UpdateFirestoreList } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Button, Dialog, Typography } from '@mui/material';
import { List, Product } from '../../types/type';
import AddIcon from '@mui/icons-material/Add';
import { doc, onSnapshot } from 'firebase/firestore';
import { updateList } from '../../redux/reducers/list';
import AddProduct from '../add-product';

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

    useEffect(() => {
        if (!list) return;
        const listRef = doc(db, "lists", param.id ?? '');
        const unsubscribe = onSnapshot(listRef, (docSnap) => {
          if (docSnap.exists()) {
            const firestoreData = docSnap.data();
            const mergedProducts: Product[] = MergeProducts(list.products, firestoreData.products || {});
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
            <Button variant="outlined" startIcon={<AddIcon />} onClick={()=>navigate('/add-new')}>Add product</Button>
            <Button variant='contained' onClick={handleSaveList}>Save</Button>
            </div>

            <Dialog
            open={dialogAddProductShown}
            onClose={handleCloseListPopup}>
              <AddProduct targetList={list}/>
            </Dialog>
        </div>
    )
}

export default SingleList;