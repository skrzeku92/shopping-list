import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { List } from '../types/type';
import { DeleteFirestoreList } from '../helpers/utils';

const DeleteDialog: React.FC<{
    onDelete: () => void;
    list: List;
}> = ({ onDelete, list }) => {
    const [open, setOpen] = React.useState<boolean>(false);
    
    const onConfirm = async () => {
        await DeleteFirestoreList(list.id);
        onDelete();
        setOpen(false);
    }
    return (
        <>
        <Button variant="outlined" color="error" startIcon={<DeleteIcon/>} onClick={()=>setOpen(true)}>Delete</Button>
        <Dialog
            open={open}
            onClose={()=> setOpen(false)}
        >
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this item? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>setOpen(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="secondary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
        </>
    );
};

export default DeleteDialog;