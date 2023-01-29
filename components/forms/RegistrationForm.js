import {useRef, useState} from 'react';
import { CssBaseline, TextField,  InputAdornment, IconButton, Grid, Box, Typography, Container} from '@mui/material';
import styled from '@emotion/styled';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Button from '../shared/Button';
import Image from "next/image";
import { useRouter } from "next/router";
import LogoImage from "/public/assets/img/logo-hinyn.svg";
import Modal from '../shared/Modal';
import Axios from 'axios';
Axios.defaults.withCredentials = true;
import {origin} from "../../src/config";
import {loginUser, registerUser} from "../forms/formService";

const Logo = styled.div`
  position: relative;
  width: 8rem;
  height: auto;
`

const StyledButton = styled(Button)`
  margin: auto;
  width: 100%;
`

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items:center;
  border-radius: 20px;
`;

const AgreeCheckbox = styled.div`
  font-size: 14px;
  margin: 3rem 0;
`
const TextLink = styled.span`
  color : ${props => props.color === 'red' ? '#EB4C60' : props.color === 'green' ? '#4AA398' : '#525252' };
  cursor: pointer;
`

const Text = styled.span`
  font-size: 14px;
`

const Error = styled.p`
  color:red;
  font-size:0.75rem;
  font-family: "Roboto", sans-serif;
`;

function RegistrationForm(){
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };
 
  const [pwValues, setPWValues] = useState({
    password: '',
    showPassword: false,
    confirmPassword:'',
    showConfirmPassword:false
  });
    const [isValid, setValid] = useState({
      "email":false,
      "password":false,
      "confirmPassword":false,
      "form":false,
    });
    const [errorMessage, setErrorMessage] = useState({
        "email":null,
        "password":null,
        "confirmPassword":null,
    });
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();
    
    const checkIsEmail = (event) => {
      var regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if(!regex.test(event.target.value)){
        event.target.style.border = "1px solid red";
        setErrorMessage((prevState) => ({
          ...prevState,
          ['email']:"Invalid email"
        }))
      }else{
        event.target.style.border = "none";
        setErrorMessage((prevState) => ({
          ...prevState,
          ['email']:null
        }))
        setValid((prevState) => ({
          ...prevState,
          ['email']:true
        }))
      }
    }

    const checkIsPassword = (event) => {
      //at least 8 chars long, at least  one uppercase at least one number
      var regex = /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9!@#$&()\\-`.+,/"])(.{8,})$/;
      if(!regex.test(event.target.value)){
        event.target.style.border = "1px solid red";
        if(event.target.id === "password"){
          setErrorMessage((prevState) => ({
            ...prevState,
            ['password']:"Must contain at least 8 characters with an uppercase and a number"
          }))
        }
      }else{
        event.target.style.border = "none";
        if(event.target.id === "password"){
          setErrorMessage((prevState) => ({
            ...prevState,
            ['password']:null
          }))
          setValid((prevState) => ({
            ...prevState,
            ['password']:true
          }))
          setPWValues({ ...pwValues, ['password']: event.target.value })
        }
      }
      return isValid.password;
    }


    const checkIsConfirmPassword = (event) => {
      
      if(checkIsPassword(event)){
         if(passwordInputRef.current.value === (event.target.value || pwValues['confirmPassword'])){
           setValid((prevState) => ({
            ...prevState,
            ['confirmPassword']:true
          }))
          setErrorMessage((prevState) => ({
            ...prevState,
            ['confirmPassword']:null
          }))
          setPWValues({ ...pwValues, ['confirmPassword']: event.target.value })
         }else{
            setValid((prevState) => ({
              ...prevState,
              ['confirmPassword']:false
            }))
              setErrorMessage((prevState) => ({
                ...prevState,
                ['confirmPassword']:"Passwords do not match"
              }))
            
         }
      }
    
    }

    const handlePWChange = (prop) => (event) => {
      setPWValues({ ...pwValues, [prop]: event.target.value });
    };
  
    const handleClickShowPassword = () => {
      setPWValues({
        ...pwValues,
        showPassword: !pwValues.showPassword,
      });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleClickShowConfirmPassword = () => {
      setPWValues({
        ...pwValues,
        showConfirmPassword: !pwValues.showConfirmPassword,
      });
    };
  
    const handleMouseDownConfirmPassword = (event) => {
      event.preventDefault();
    };

    const handleRegisterUser = async (clientData) => {
      return registerUser(clientData).then((response)=>{
        if(response.status === true){ 
          handleLoginUser(clientData).then((res)=>{
            if(res?.jwt){ 
              localStorage.setItem('hinyn-cid',res.user.id);
              localStorage.setItem('hinyn-cjwt',res.jwt);
              router.push("/registration");
            }
          });
        }
        else{
          setMessage(response.data);
          setOpen(true);
        }
        return false;
      })
    }
    
    const handleLoginUser = async (clientData) => {
      return loginUser(clientData).then((response)=>{
        if(response.status === true) return response.data;
        else{
          setMessage(response.data);
          setOpen(true);
        }
        return false;
      })
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        
        if(enteredEmail && isValid.email && enteredPassword){
            isValid.form = true; 
        }

        if(isValid.form){
          const clientData = {
            email: enteredEmail,
            password: enteredPassword
          }
          handleRegisterUser(clientData);
        }else{
            setOpen(true);
        }
    }
      

    return (
      <>
        <Container maxWidth="sm" sx={{marginBottom:"2rem"}}>
          <CssBaseline />
          <FormContainer>
            <Logo>
              <Image src={LogoImage} alt="hinyn logo" />
            </Logo>
            <Typography component="h1" variant="h5">
              <b>Sign Up</b>
            </Typography>
            <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3}}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="emailAddress"
                    label="Email Address"
                    name="emailAddress"
                    autoComplete="email"
                    onKeyUp={checkIsEmail}
                    inputRef={emailInputRef}
                  />
                  {errorMessage.email && (
                        <Error >{errorMessage.email}</Error>
                   )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    type={pwValues.showPassword ? 'text' : 'password'}
                    onKeyUp={checkIsPassword}
                    autoComplete="new-password"
                    inputRef={passwordInputRef}
                    onChange={handlePWChange}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {pwValues.showPassword ? <FiEyeOff/> : <FiEye/>}
                        </IconButton>
                      </InputAdornment>,
                    }}
                  />
                  {errorMessage.password && (
                        <Error>{errorMessage.password}</Error>
                      )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    id="confirmPassword"
                    type={pwValues.showConfirmPassword ? 'text' : 'password'}
                    onKeyUp={checkIsConfirmPassword}
                    inputRef={confirmPasswordInputRef}
                    onChange={handlePWChange}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {pwValues.showConfirmPassword ? <FiEyeOff/>: <FiEye/>}
                        </IconButton>
                      </InputAdornment>,
                    }}
                  />
                  {errorMessage.confirmPassword && (
                        <Error >{errorMessage.confirmPassword}</Error>
                  )}
                </Grid>            
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <AgreeCheckbox>
                  <input type="checkbox" /> I agree to the HINYN <TextLink color="red">User Agreement</TextLink> and <TextLink color="red">Privacy Policy.</TextLink>
                  </AgreeCheckbox>
                </Grid>
              </Grid>
              <StyledButton>
                Join HINYN
              </StyledButton>
              <Grid container sx={{marginTop:'2rem',justifyContent:'center'}}>
                <Grid item>
                  <Text>
                    Already have an account? <TextLink color="green">Login</TextLink>
                  </Text>
                </Grid>
              </Grid>
            </Box>
          </FormContainer>
        </Container>

    <Modal handleClose={handleClose} isOpen={open} hasHeader={false} hasFooter={false}>
      <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}>{message ?? 'Oops! All fields are required.'}</Box>
     </Modal>
</>
    );

}

export default RegistrationForm;