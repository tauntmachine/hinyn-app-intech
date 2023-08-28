import { useRef, useState } from 'react';
import {
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Image from 'next/image';
// import LogoImage from '/public/assets/img/logo-hinyn.svg';
import { BackIcon } from '../shared/Icon';
import { useRouter } from 'next/router';
import Modal from '../shared/Modal';
import Logo from '../shared/Logo';
import { NoOutlineTextField } from '../shared/Textfield';
// import {
//   updateUserUsername,
//   addClientData,
//   updateUserData,
// } from '../../components/forms/formService';

const LogoDiv = styled.div`
  margin-top: 10px;
`;

const StyledButton = styled(Button)`
  margin: auto;
  width: 100%;
`;

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 20px;
`;

const Error = styled.p`
  color: red;
  font-size: 0.75rem;
  font-family: 'Roboto', sans-serif;
`;

function UsernameForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [isValid, setValid] = useState({
    username: false,
    form: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    username: null,
  });
  const usernameInputRef = useRef();

  const checkIsUsername = () => {
    setValid((prevState) => ({
      ...prevState,
      ['username']: true,
    }));
  };
  const GoBack = () => {
    router.back(); // Navigates back to the previous page
  };

  const handleNext = () => {
    router.push('/registration?value=2');
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;

    if (enteredUsername !== '') {
      router.push('/registration?value=2');
    } else {
      setOpen(true);
    }
    // if (enteredUsername && isValid.username) {
    //   isValid.form = true;
    // }

    // if (isValid.form) {
    //   const userId = localStorage.getItem('hinyn-uid');
    //   const jwt = localStorage.getItem('hinyn-cjwt');
    //   const clientData = {
    //     id: userId,
    //     username: enteredUsername,
    //     jwt: jwt,
    //   };
    //   const userData = {
    //     uuid: 'client-' + userId,
    //     user: userId,
    //   };
    //   addClientData(userData, jwt).then((result) => {
    //     if (result?.data) localStorage.setItem('hinyn-cid', result?.data?.id);
    //   });
    //   updateUserUsername(clientData).then((result) => {
    //     if (result.status) {
    //       const clientId = localStorage.getItem('hinyn-cid');
    //       updateUserData(clientId).then((res) => {
    //         if (res?.data) {
    //           onUsernameSubmit(clientData);
    //         }
    //       });
    //     }
    //   });
    // } else {
    //   setOpen(true);
    // }
  };

  return (
    <>
      <Container sx={{ marginBottom: '2rem' }}>
        <BackIcon variant="red" marginTop="20px" onClick={GoBack} />
        <CssBaseline />
        <FormContainer>
          <LogoDiv>
            {/* <Image src={LogoImage} alt="hinyn logo" /> */}
            <Logo />
          </LogoDiv>
          <Text fontSize="23px" marginTop="10px">
            <b>Choose a username</b>
          </Text>
          <Typography component="p" align="center" marginTop="6px">
            Please note that a username cannot be changed once chosen.
          </Typography>
          <Box
            component="form"
            noValidate
            // onSubmit={submitHandler}
            sx={{ mt: 3 }}
          >
            <Grid
              container
              spacing={2}
              sx={{ marginBottom: '2rem', marginRight: '10.6rem' }}
            >
              <Grid item xs={2}>
                <NoOutlineTextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  onKeyUp={checkIsUsername}
                  inputRef={usernameInputRef}
                />
                {errorMessage.username && (
                  <Error>{errorMessage.username}</Error>
                )}
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                margin: '2rem 0',
                justifyContent: 'center',
              }}
            >
              <Grid item sx={{ display: 'flex', direction: 'row' }}>
                <Text color="green" fontSize="12px">
                  Suggestions:{' '}
                </Text>
                <Text fontSize="12px" color="#CACFD2" marginLeft="10px">
                  username1 / username2 / username
                </Text>
              </Grid>
            </Grid>
            <StyledButton onClick={submitHandler}>NEXT</StyledButton>
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
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          Oops! All fields are required.
        </Box>
      </Modal>
    </>
  );
}

export default UsernameForm;
