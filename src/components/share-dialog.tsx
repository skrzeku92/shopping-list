import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React from 'react';
import { UpdateFirestoreList } from '../helpers/utils';
import { List } from '../types/type';
import ShareIcon from '@mui/icons-material/Share'; 

export type ShareDialogProps = {
    handleSubmit?: () => void;
    list?: List | null;
}

const ShareDialog: React.FC<ShareDialogProps> = ({list, handleSubmit}) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const onSumbit = async (email: string): Promise<void> => {
        if (!list) {
            console.error('List not found.');
            return;
        }
        const invited = list.invited || [];
        const newList = {...list, invited: [...invited, email]};
        const success = await UpdateFirestoreList(newList)
        if (!success) {
            setError('Failed to update the list. Please try again later.');
            return;
        }
        setError(null);
        handleSubmit?.();
        setOpen(false);
    }

    return (
      <>
      <Button variant="outlined" color='primary' startIcon={<ShareIcon/>} onClick={()=>setOpen(true)}>Share</Button>
        <Dialog
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              onSumbit(formJson.email);
            },
          },
        }}
      >
        <DialogTitle>Create new list</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can share this list with others by inviting them via email.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Type email to invite"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <p>{error}</p>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button type="submit">Invite</Button>
        </DialogActions>
      </Dialog>
      </>
    );
}

export default ShareDialog;