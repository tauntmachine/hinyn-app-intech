import { useRef, useState } from 'react';
import {
  CssBaseline,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import styled from '@emotion/styled';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Button from '../shared/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import LogoImage from '/public/assets/img/logo-hinyn.svg';
import Modal from '../shared/Modal';
// import Logo from '../shared/Logo';

// import Axios from 'axios';
// Axios.defaults.withCredentials = true;
import { origin } from '../../src/config';
import { red } from '@mui/material/colors';
import { OutlinedTextField } from '../shared/Textfield';
// import {
//   loginUser,
//   registerUser,
//   addClientData,
//   logoutUser,
// } from '../forms/formService';

const Logo = styled.div`
  position: relative;
  width: 8rem;
  height: auto;
  margin-bottom: 20px;
`;
const TypoDiv = styled.div`
  padding: 20px;
  margin: auto;
`;
const TypoDiv2 = styled.div`
  margin-left: 15px;
`;

// const router = useRouter();

const StyledButton = styled(Button)`
  margin: auto;
  width: 100%;
`;

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  border-radius: 20px;
`;

// const AgreeCheckbox = styled.div`
//   font-size: 14px;
//   margin: 3rem;
//   cursoe: pointer;
// `;
const AgreeDiv = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;
const TextLink = styled.span`
  margin-left: 8px;
  cursor: pointer;
`;

const Text = styled.span`
  font-size: 14px;
`;
const Text2 = styled.span`
  font-size: 14px;
  color: #ff5a5f;
  margin-left: 4px;
  margin-right: 4px;
`;
const Text3 = styled.div`
  font-size: 14px;
  color: #ff5a5f;
  margin-left: 18px;
`;

const Error = styled.p`
  color: red;
  font-size: 0.75rem;
  font-family: 'Roboto', sans-serif;
`;

function RegistrationForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };

  const [pwValues, setPWValues] = useState({
    password: '',
    showPassword: false,
    confirmPassword: '',
    showConfirmPassword: false,
  });
  const [isValid, setValid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    form: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    email: null,
    password: null,
    confirmPassword: null,
  });
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const checkIsEmail = (event) => {
    var regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(event.target.value)) {
      setErrorMessage((prevState) => ({
        ...prevState,
        ['email']: 'Invalid email',
      }));
    } else {
      event.target.style.border = 'none';
      setErrorMessage((prevState) => ({
        ...prevState,
        ['email']: null,
      }));
      setValid((prevState) => ({
        ...prevState,
        ['email']: true,
      }));
    }
  };

  const checkIsPassword = (event) => {
    //at least 8 chars long, at least  one uppercase at least one number
    var regex =
      /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9!@#$&()\\-`.+,/"])(.{8,})$/;
    if (!regex.test(event.target.value)) {
      if (event.target.id === 'password') {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['password']:
            'Must contain at least 8 characters with an uppercase and a number',
        }));
      }
    } else {
      event.target.style.border = 'none';
      if (event.target.id === 'password') {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['password']: null,
        }));
        setValid((prevState) => ({
          ...prevState,
          ['password']: true,
        }));
        setPWValues({ ...pwValues, ['password']: event.target.value });
      }
    }
    return isValid.password;
  };

  const checkIsConfirmPassword = (event) => {
    if (checkIsPassword(event)) {
      if (
        passwordInputRef.current.value ===
        (event.target.value || pwValues['confirmPassword'])
      ) {
        setValid((prevState) => ({
          ...prevState,
          ['confirmPassword']: true,
        }));
        setErrorMessage((prevState) => ({
          ...prevState,
          ['confirmPassword']: null,
        }));
        setPWValues({ ...pwValues, ['confirmPassword']: event.target.value });
      } else {
        setValid((prevState) => ({
          ...prevState,
          ['confirmPassword']: false,
        }));
        setErrorMessage((prevState) => ({
          ...prevState,
          ['confirmPassword']: 'Passwords do not match',
        }));
      }
    }
  };

  // const handlePWChange = (prop) => (event) => {
  //   setPWValues({ ...pwValues, [prop]: event.target.value });
  // };

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

  // const handleRegisterUser = async () => {
  // logoutUser();
  // return registerUser(clientData).then((response) => {
  //   if (response.status === true) {
  //     handleLoginUser(clientData).then((res) => {
  //       if (res?.jwt) {
  //         localStorage.setItem('hinyn-uid', res.user.id);
  //         localStorage.setItem('hinyn-cjwt', res.jwt);
  //         router.push('/registration');
  //       }
  //     });
  //   } else {
  //     setMessage(response.data);
  //     setOpen(true);
  //   }
  //   return false;
  // });
  // };

  // const handleLoginUser = async (clientData) => {
  //   return loginUser(clientData).then((response) => {
  //     if (response.status === true) return response.data;
  //     else {
  //       setMessage(response.data);
  //       setOpen(true);
  //     }
  //     return false;
  //   });
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (
      enteredEmail &&
      enteredPassword &&
      enteredEmail !== '' &&
      enteredPassword !== ''
    ) {
      router.push('/registration?value=1');
    } else {
      setOpen(true);
    }
    // if (enteredEmail && isValid.email && enteredPassword) {
    //   isValid.form = true;
    // }

    // if (isValid.form) {
    //   const clientData = {
    //     email: enteredEmail,
    //     password: enteredPassword,
    //   };
    //   handleRegisterUser(clientData);
    // } else {
    //   setOpen(true);
    // }
  };

  // const handleNext = () => {
  //   // Use the 'push' function to navigate to the next screen (page)
  //   // router.push('/forms/UsernameForm'); // Replace '/next-screen' with the path to the next screen you want to navigate to
  //   if (errorMessage) {
  //     router.push('/registration');
  //   } else {
  //     setOpen(true);
  //   }
  // };
  return (
    <>
      <Container maxWidth="sm" sx={{ marginBottom: '2rem' }}>
        <CssBaseline />
        <FormContainer>
          {/* <Logo /> */}
          <TypoDiv>
            <Logo>
              <Image
                src={require('../../public/assets/img/logo-normal.svg')}
                alt="hinyn logo"
              />
            </Logo>
            <TypoDiv2>
              <Typography variant="h5">
                <b>Sign Up</b>
              </Typography>
            </TypoDiv2>
          </TypoDiv>
          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <OutlinedTextField
                  required
                  fullWidth
                  id="emailAddress"
                  placeholder="Email Address"
                  name="emailAddress"
                  autoComplete="email"
                  onKeyUp={checkIsEmail}
                  inputRef={emailInputRef}
                />
                {errorMessage.email && <Error>{errorMessage.email}</Error>}
              </Grid>
              <Grid item xs={12}>
                <OutlinedTextField
                  required
                  fullWidth
                  name="password"
                  placeholder="Password"
                  id="password"
                  type={pwValues.showPassword ? 'text' : 'password'}
                  onKeyUp={checkIsPassword}
                  autoComplete="new-password"
                  inputRef={passwordInputRef}
                  //  onChange={handlePWChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {pwValues.showPassword ? <FiEyeOff /> : <FiEye />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errorMessage.password && (
                  <Error>{errorMessage.password}</Error>
                )}
              </Grid>
              <Grid item xs={12}>
                <OutlinedTextField
                  required
                  fullWidth
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  type={pwValues.showConfirmPassword ? 'text' : 'password'}
                  onKeyUp={checkIsConfirmPassword}
                  inputRef={confirmPasswordInputRef}
                  //  onChange={handlePWChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {pwValues.showConfirmPassword ? (
                            <FiEyeOff />
                          ) : (
                            <FiEye />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errorMessage.confirmPassword && (
                  <Error>{errorMessage.confirmPassword}</Error>
                )}
              </Grid>
              <Grid item xs={12}>
                <OutlinedTextField
                  required
                  fullWidth
                  name="referalId"
                  placeholder="Referral Id"
                  // id="confirmPassword"
                  type={'text'}
                  // onKeyUp={checkIsConfirmPassword}
                  // inputRef={confirmPasswordInputRef}
                  //  onChange={handlePWChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {/* <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {pwValues.showConfirmPassword ? (
                            <FiEyeOff />
                          ) : (
                            <FiEye />
                          )}
                        </IconButton> */}
                      </InputAdornment>
                    ),
                  }}
                />
                {errorMessage.confirmPassword && (
                  <Error>{errorMessage.confirmPassword}</Error>
                )}
              </Grid>
            </Grid>
            <AgreeDiv>
              <input type="checkbox" />
              <Text color="red">I agree to the HINYN</Text>
              <Text2>User Agreement</Text2>
              <Text>and</Text>
              <Text2>Privacy </Text2>
              <Text3>Policy.</Text3>
            </AgreeDiv>
            {/* <Grid container justifyContent="flex-start">
              <Grid item>
            
                <AgreeDiv>
                  <input type="checkbox" />
                  <Text>I agree to the HINYN</Text>
                  <TextLink color="red" fontSize="12px">
                    User Agreement
                  </TextLink>{' '}
                  and <TextLink color="red">Privacy Policy.</TextLink>
                </AgreeDiv>
              </Grid>
            </Grid> */}
            <StyledButton onClick={submitHandler}>Join HINYN</StyledButton>
            <Grid
              container
              sx={{ marginTop: '2rem', justifyContent: 'center' }}
            >
              <Grid item>
                <Text>
                  Already have an account?{' '}
                  {/* <TextLink color="green">Login</TextLink> */}
                </Text>
              </Grid>
            </Grid>
          </Box>
        </FormContainer>
      </Container>

      <Modal
        handleClose={handleClose}
        isOpen={open}
        hasHeader={false}
        hasFooter={false}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          {message ?? 'Oops! All fields are required.'}
        </Box>
      </Modal>
    </>
  );
}

export default RegistrationForm;
