import { useEffect, useRef, useState } from 'react';
import { CssBaseline, Grid, Box, Typography, Container } from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import StyledTextField from '../shared/Textfield';
import { BackIcon } from '../shared/Icon';
import { WebcamCapture } from '../shared/WebcamCapture';
import AvatarUpload from '../shared/AvatarUpload';
import { getClientData, updateClientData, updateUserData } from './formService';
import Router from 'next/router';
import Image from 'next/image';

const StyledButton = styled(Button)``;

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 20px;
`;
const AvatarDiv = styled.div`
  margin-left: 23px;
  margin-top: 80px;
`;
const Error = styled.p`
  color: red;
  font-size: 0.75rem;
  font-family: 'Roboto', sans-serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin-left: 3.5rem;
  margin-top: 40px;
`;

function ProfessionalForm1({ handleNextClick }) {
  const [open, setOpen] = useState(false);
  const [openCameraModal, setOpenCameraModal] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseCameraModal = () => {
    setOpenCameraModal(false);
  };
  const toggleOpenCameraModal = () => {
    setOpenCameraModal(!openCameraModal);
  };
  const [isValid, setValid] = useState({
    firstname: false,
    lastname: false,
    form: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    firstname: null,
    lastname: null,
  });
  const firstnameInputRef = useRef();
  const lastnameInputRef = useRef();

  // useEffect(() => {
  //   const clientData = {
  //     id: localStorage.getItem('hinyn-cid'),
  //   };
  //   getClientData(clientData).then((result) => {
  //     // if (result?.data) console.log('useeffect clientdataa', result?.data);
  //   });
  // }, []);

  function submitHandler(event) {
    event.preventDefault();
    const enteredFirstname = firstnameInputRef.current.value;
    const enteredLastname = lastnameInputRef.current.value;

    // if (
    //   enteredFirstname &&
    //   enteredLastname &&
    //   enteredFirstname !== '' &&
    //   enteredLastname !== ''
    // ) {
    //   isValid.form = true;
    // }

    // if (isValid.form) {
    //   const clientId = localStorage.getItem('hinyn-cid');
    //   const userData = {
    //     firstName: enteredFirstname,
    //     lastName: enteredLastname,
    //   };
    //   updateClientData(userData, clientId).then((res) => {
    //     if (res?.data){
    //         handleNextClick(true);
    //     }
    //   });

    if (
      enteredFirstname &&
      enteredLastname &&
      enteredFirstname !== '' &&
      enteredLastname !== ''
    ) {
      handleNextClick(true);
    } else {
      setOpen(true);
    }
  }
  const Goback = () => {
    Router.push('/RegistrationForm');
  };
  return (
    <>
      <Container maxWidth="sm" sx={{ marginBottom: '2rem', marginTop: '5rem' }}>
        <CssBaseline />
        <FormContainer>
          <Text fontSize="34px">
            <b>Let&apos;s make your account</b>
          </Text>
          <AvatarUpload onClick={toggleOpenCameraModal}>
            <AvatarDiv>
              {/* <Image
                src={require('../../public/assets/img/icons/userimg.jpg')}
                width="60px"
                height="60px"
              /> */}

              <Text color="green">Upload a photo</Text>
            </AvatarDiv>
          </AvatarUpload>
          <Text color="green" marginBottom="10px">
            What is your name?{' '}
          </Text>
          <Text>Please use your real name as this will be required for</Text>
          <Text>identity verification.</Text>
          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 3, width: '100%' }}
          >
            <Grid
              container
              spacing={2}
              sx={{ marginBottom: '2rem', marginLeft: '3.5rem' }}
            >
              <Grid item xs={9}>
                <StyledTextField
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  name="firstname"
                  inputRef={firstnameInputRef}
                />
                {errorMessage.firstname && (
                  <Error>{errorMessage.firstname}</Error>
                )}
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              sx={{ marginBottom: '2rem', marginLeft: '3.5rem' }}
            >
              <Grid item xs={9}>
                <StyledTextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  inputRef={lastnameInputRef}
                />
                {errorMessage.lastname && (
                  <Error>{errorMessage.lastname}</Error>
                )}
              </Grid>
            </Grid>
            <ButtonContainer>
              <Text>
                <BackIcon isabsolute={false} onClick={Goback} />
                <span style={{ marginLeft: '1rem' }}>Go Back</span>
              </Text>
              <StyledButton>NEXT</StyledButton>
            </ButtonContainer>
          </Box>
        </FormContainer>
      </Container>

      <Modal
        handleClose={handleClose}
        isOpen={open}
        hasHeader={false}
        hasFooter={false}
      >
        <div>Oops! All fields are required.</div>
      </Modal>
      <Modal
        handleClose={handleCloseCameraModal}
        isOpen={openCameraModal}
        hasHeader={false}
        hasFooter={false}
      >
        <div>asd</div>
      </Modal>
    </>
  );
}

export default ProfessionalForm1;
