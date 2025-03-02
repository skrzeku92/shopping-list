import React, { useEffect, useState } from "react";
import ListCard from "../../components/list-card";
import * as S from "../../assets/styles";
import { addList, fetchAllLists } from "../../utils";
import { List } from "../../types/type";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Dashboard: React.FC = ()=> {
    const [lists, setLists] = useState<List[]>([]);
    const [addListPopupShown, setAddListPopupShown] = useState<boolean>(false);
    const currentUser = useSelector((s: RootState)=> s.user);

    const fetchlists = async (): Promise<void>=> {
        if(!currentUser) {
          console.error('User is not defined');
        }
        const newLists = await fetchAllLists(currentUser.email);
        console.log(newLists);
        setLists(newLists);
    }

    const onCreate = (title: string)=> {
        addList(title, currentUser.email);
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

    return (<>
       <S.ListWrapper>{lists.map((list, index)=> { 
            return (<ListCard list={list} key={index}/>)
        })}</S.ListWrapper>
        <IconButton color="primary" onClick={handleOpenListPopup}>
            <AddIcon />
        </IconButton>

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
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
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
    </>
     
    )
}

export default Dashboard;