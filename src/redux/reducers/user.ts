import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "firebase/auth";

const initialState: User = {} as User;

const User = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            return {...action.payload}
        }
    }
})

export const {setUser} = User.actions
export default User.reducer;