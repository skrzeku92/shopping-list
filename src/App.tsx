import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Dashboard from './views/dashboard';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import SingleList from './views/single-list';
import Login from './views/login';
import {Header} from './components/header';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Button } from '@mui/material';
import { addList } from './utils';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/reducers/user';
import AddProduct from './views/add-product';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [isLoggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);
  const dispatch = useDispatch();

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(getAuth(), (u) => {
      setLoggedIn(!!u);
      dispatch(setUser(u))
      console.log(u);
    });

    return ()=> unsubscribe();
  })

  const router = createBrowserRouter([
    { path: '/', element: !isLoggedIn ? <Navigate to="/login" replace /> : <Dashboard/>},
    {path: '/login', element: <Login/>},
    {path: 'list/:id', element: <SingleList/>},
    {path: 'add-new', element: <AddProduct/>}
  ]);

  
  return (
    <ThemeProvider theme={darkTheme}>
        <Header auth={!!isLoggedIn}/>
        {isLoggedIn !== undefined && <RouterProvider router={router}/>}
    <CssBaseline />
    </ThemeProvider>
  )
}

export default App
