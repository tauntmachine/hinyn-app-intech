import {useRef, useState} from 'react';
import {CssBaseline, TextField, Grid, Box, Typography, Container, InputAdornment, IconButton} from '@mui/material';
import Link from 'next/link';
import styled from '@emotion/styled';
import Logo from '../shared/Logo';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import LogoImage from "/public/assets/img/logo-hinyn.svg";
import { useRouter } from 'next/router';
import Button from '../shared/Button';
import Image from 'next/image';


const FormContainer = styled(Box)`
   display: flex;
  flex-direction: column;
  align-items:center;
  border-radius: 20px;
  color: #444;
`;

const StyledButton = styled(Button)`
  margin: auto;
  width: 100%;
  margin-top: 2rem;
`


function LoginForm(props){
    const router = useRouter();
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
        if(!loginData.emailAddress || !loginData.password){
            alert("Please provide your registered username and password.");
            return;
        }else{
            if(loginData.emailAddress === 'username' && loginData.password === '1234') router.push("/dashboard");
            else alert('wrong username and password')
        }
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
            <Logo>
              <Image src={LogoImage} alt="hinyn logo" />
            </Logo>
            <Typography component="h1" variant="h5">
              <b>Login</b>
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
                            {values.showPassword ? <FiEyeOff/> : <FiEye/>}
                          </IconButton>
                        </InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
                <StyledButton>
                    Login
                </StyledButton>
                {props.formType === 'professional'
                ? <>
                  <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/register">
                        <a>
                         Dont have an account yet? Register
                      </a>
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