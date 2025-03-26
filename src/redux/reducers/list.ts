import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { List } from "../../types/type";

const initialState: List[] = [];

const Lists = createSlice({
    name: 'lists',
    initialState, 
    reducers: {
        setLists: (state, action: PayloadAction<List[]>) => {
            return [...action.payload]
        },
        updateList: (state, action: PayloadAction<List>) => {
           const index = state.findIndex(list => list.id === action.payload.id);
           if(index !== -1) {
                state[index] = {...action.payload};
           }
        }
    }
})

export const {setLists, updateList} = Lists.actions;

export default Lists.reducer;