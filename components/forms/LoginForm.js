import {useRef, useState} from 'react';
import {Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, InputAdornment, IconButton} from '@mui/material';
import {Link} from 'react-router-dom';
import { PersonOutline, Visibility, VisibilityOff } from '@mui/icons-material';
import styled from '@emotion/styled';

const FormContainer = styled(Box)`
  display: flex;
  font-family: 'Roboto', sans-serif;
  flex-direction: column;
  align-items:center;
  background-color: #eee;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 0 10px 3px #555;
  margin-top: 7rem;
`;

function LoginForm(props){
    const emailInputRef = useRef();
    const passwordInputRef = useRef(); 
    const [values, setValues] = useState({
      password: '',
      showPassword: false,
    });

    function loginHandler(event){
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const loginData = {
            emailAddress: enteredEmail,
            password: enteredPassword,
        };
        props.onUserLogin(loginData);
    } 

  
  
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  
    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    return (
        <Container component="main" maxWidth="xs" sx={{marginBottom:"10rem"}}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: "#fff"
            }}
          >
            <FormContainer>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <PersonOutline />
              </Avatar>
              <Typography component="h1" variant="h5">
                {props.formTitle}
              </Typography>
              <Box component="form" noValidate onSubmit={loginHandler} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="emailAddress"
                      label="Email Address"
                      name="emailAddress"
                      autoComplete="email"
                      inputRef={emailInputRef}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      id="password"
                      type={values.showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      inputRef={passwordInputRef}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
                {props.formType === 'member'
                ? <>
                  <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/register">
                      Dont have an account yet? Register
                    </Link>
                  </Grid>
                </Grid>
                </>
                : ''
                }
                
              </Box>
              </FormContainer>
          </Box>
        </Container>
    );

}

export default LoginForm;