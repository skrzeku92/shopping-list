import React, { useEffect, useState } from "react";
import ListCard from "../../components/list-card";
import * as S from "../../assets/styles";
import { addList, fetchAllLists } from "../../helpers/utils";
import { List } from "../../types/type";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid2, IconButton, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setLists } from "../../redux/reducers/list";
import ShareDialog from "../../components/share-dialog";
import safeFetch from "../../helpers/safe";

const Dashboard: React.FC = ()=> {
    const lists = useSelector((s: RootState)=> s.lists);
    const [addListPopupShown, setAddListPopupShown] = useState<boolean>(false);
    const [sharePopupShown, setSharePopupShown] = useState<boolean>(false);
    const currentUser = useSelector((s: RootState)=> s.user);
    const dispatch = useDispatch();
    const [targetList, setTargetList] = useState<List | null>(null);

    const fetchlists = async (): Promise<void>=> {
        if(!currentUser) {
          console.error('User is not defined');
        }
        const newLists = await fetchAllLists(currentUser.email);
        console.log(newLists);
        dispatch(setLists(newLists));
    }

    const onCreate = (title: string)=> {
      if (!currentUser.email) return;
      addList(title, currentUser.email);
      fetchlists();
    }

    const handleOpenListPopup = () => {
        setAddListPopupShown(true);
      };
    
      const handleCloseListPopup = () => {
        setAddListPopupShown(false);
      };

    useEffect(()=> { 
        fetchlists();
    }, [])

    return (<S.PageWrapper> 
       <Grid2 container spacing={2}>{lists.map((list, index)=> { 
            return (<ListCard list={list} key={index} handleDelete={()=> console.log('del')} handleShare={()=> {
              setSharePopupShown(true);
              setTargetList(list);
              

            }}/>)
        })}</Grid2>
        <IconButton color="primary" onClick={handleOpenListPopup}>
            <AddIcon />
        </IconButton>
        <ShareDialog open={sharePopupShown} 
        handleClose={()=>setSharePopupShown(false)} 
        list={targetList} 
        handleSubmit={()=> {
            setSharePopupShown(false);
            fetchlists();
        }}/>

        <Dialog
        open={addListPopupShown}
        onClose={handleCloseListPopup}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              onCreate(formJson.title);
              handleCloseListPopup();
            },
          },
        }}
      >
        <DialogTitle>Create new list</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create new list, please enter the title of the list below.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Type your list title"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseListPopup}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </S.PageWrapper>
     
    )
}

export default Dashboard;