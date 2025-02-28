import { Avatar, Button, Container, Grid2 as Grid, makeStyles, Paper, TextField, Typography } from "@mui/material"
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import {useFormik} from 'formik';
import React from "react";
import {object, string} from 'yup';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import SendIcon from '@mui/icons-material/Send';
import GoogleIcon from '@mui/icons-material/Google';
import * as S from "../../assets/styles";
import { GoogleSignIn } from "../../components/google-signin-popup";
import { useNavigate } from "react-router-dom";

export const userSchema = object({
    email: string().email().required('Password is required'), 
    password: string().required().min(8, 'Password must be 8 characters long')
  })

const Login = (props)=> {
    const { user } = props
    const [waiting, setWaiting] = React.useState(false);
    const navigate = useNavigate();

    const provider = new GoogleAuthProvider();


    const googleLogin = async ()=> {
      GoogleSignIn().then((s)=> {
        s && navigate('/');
      })
    }

  
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: userSchema,
      onSubmit: async (values) => {
        setWaiting(true);
        try {
            await signInWithEmailAndPassword(getAuth(), values.email, values.password);
            alert('Signed in successfully');
          } catch (error) {
            console.error(error);
          }
        setWaiting(false)

      },
      enableReinitialize: true,
    })
    return (
        <Container maxWidth="sm">
          <Grid xs={12} md={6} elevation={1} sx={{textAlign: 'center'}}>
            <Paper elevation={3} style={{padding: 16, borderRadius: 10}}>
              <Avatar sx={{display: 'inline-flex', width: 50, height: 50}}>
                <AccessAlarmIcon fontSize="large"/>
              </Avatar>
              <Typography variant="h3" component="h2" fontWeight={'bold'} marginTop={2}>Sign in</Typography>
              <form onSubmit={formik.handleSubmit}>
              <TextField
                required
                fullWidth
                sx={{ mt: 3 }}
                type="email"
                label="Email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                required
                fullWidth
                sx={{ mt: 3 }}
                type="password"
                label="Password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <S.FlexVertical>
                <Button
                  sx={{ mt: 4 }}
                  type="submit"
                  variant="contained"
                  disabled={waiting}
                  endIcon={<SendIcon />}
                >
                  {!waiting ? 'Enter' : 'Entering...'}
                </Button>
                <Button
                  variant="contained"
                  disabled={waiting}
                  onClick={googleLogin}
                  startIcon={<GoogleIcon />}
                >
                  Sign in with google
                </Button>
              </S.FlexVertical>
           
            </form>
        </Paper>
          </Grid>
     
      </Container>
    )
}

export default Login;