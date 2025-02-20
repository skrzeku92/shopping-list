import { Button, Container, TextField } from "@mui/material"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useFormik} from 'formik';
import React from "react";
import {object, string} from 'yup';

export const userSchema = object({
    email: string().email().required('Password is required'), 
    password: string().required().min(8, 'Password must be 8 characters long')
  })

const Login = (props)=> {
    const { user } = props
    const [waiting, setWaiting] = React.useState(false)
  
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
          <Button
            sx={{ mt: 3 }}
            type="submit"
            disabled={waiting}
          >
            {!waiting ? 'Save' : 'Saving...'}
          </Button>
        </form>
      </Container>
    )
}

export default Login;