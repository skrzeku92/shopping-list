import { configureStore } from '@reduxjs/toolkit'
import UserReducer from '../redux/reducers/user';
import ListsReducer from '../redux/reducers/list';

export const store = configureStore({
  reducer: {
    user: UserReducer,
    lists: ListsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch