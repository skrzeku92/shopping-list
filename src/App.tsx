import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Dashboard from './views/dashboard';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { collection, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { app } from './firebase';
import SingleList from './views/single-list';
import Login from './views/login';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  const router = createBrowserRouter([
    { path: '/', element: <Dashboard/>},
    {path: '/login', element: <Login/>},
    {path: 'list/:id', element: <SingleList/>}
  ]);

  
  return (
    <ThemeProvider theme={darkTheme}>
        <RouterProvider router={router}/>
    <CssBaseline />
    </ThemeProvider>
  )
}

export default App
