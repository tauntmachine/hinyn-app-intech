import { useRef, useState, useEffect } from 'react';
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
import { StyledTextField } from '../shared/Textfield';
import {
  updateUserUsername,
  addClientData,
  updateUserData,
} from '../../components/forms/formService';

const LogoDiv = styled.div`
  margin-top: 10px;
`;

const StyledButton = styled(Button)`
  margin: auto;
  padding-top: 10px;
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
const TextCon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;
function UsernameForm({ onUsernameSubmit }) {
  const router = useRouter();
  const [message, setMessage] = useState(null);
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

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    // handleNext();
    // if (enteredUsername !== '') {
    //   router.push('/registration?value=2');
    // } else {
    //   setOpen(true);
    // }

    if (enteredUsername && isValid.username) {
      isValid.form = true;
    }

    if (isValid.username) {
      onUsernameSubmit(enteredUsername);
    } else {
      setMessage('Oops! All fields are required.');
      setOpen(true);
    }
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
          <Text size="l2" marginTop="10px">
            <b>Choose a username</b>
          </Text>
          <Typography component="p" align="center" marginTop="6px">
            Please note that a username cannot be changed once chosen.
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 3 }}
          >
            <Grid
              container
              spacing={2}
              sx={{ marginBottom: '2rem', marginRight: '10.6rem' }}
            >
              <Grid item xs={12}>
                <StyledTextField
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
                <TextCon>
                  <Text color="green">Suggestions:</Text>
                  <Text color="gray" fontSize="12px">
                    suggestion1/suggestion2/suggestion3
                  </Text>
                </TextCon>
                {/* <Text fontSize="12px" color="#CACFD2" marginLeft="10px">
                  {suggestedUsernames.join(' / ')}
                </Text> */}
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
          {message}
        </Box>
      </Modal>
    </>
  );
}

export default UsernameForm;
