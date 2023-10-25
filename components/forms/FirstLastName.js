import { useEffect, useRef, useState } from 'react';
import { CssBaseline, Grid, Box, Typography, Container } from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal2 from '../shared/Modal2';
import Modal from '../shared/Modal';
import StyledTextField from '../shared/Textfield';
import { BackIcon } from '../shared/Icon';
import { WebcamCapture } from '../shared/WebcamCapture';
import AvatarUpload from '../shared/AvatarUpload';
import { getClientData, updateClientData, updateUserData } from './formService';
import Router from 'next/router';
import Image from 'next/image';
import { Button as CustomButton } from '@mui/material';
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
const ImageDiv = styled(Image)`
  border-radius: 20px;
  height: 20rem;
  width: 20rem;
`;
const ImageDiv2 = styled.div`
  border-radius: 20px;
  overflow: hidden;
  // background: green;
  width: 40rem;
  height: 23rem;
  margin-top: 20px;
  margin-left: 7rem;
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
const CameraModel = styled.div`
  width: 44rem;

  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 1rem;
`;
const TextDiv = styled.div`
  display: flex;
  direction: row;
  margin-left: 22rem;
  margin-top: 43px;
`;
const UploadButton = styled(CustomButton)`
  color: #0f7669;
  border-radius: 70rem;
  background: white;
  width: 170px;
  height: 170px;
  font-size: 12px;
  margin: 20px 0 0 0;
  // display: flex;
  // flex-direction: column;
`;

function FirstLastName({ handleNextClick }) {
  const [open, setOpen] = useState(false);
  const [openCameraModal, setOpenCameraModal] = useState(false);
  const [filename, setFilename] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseCameraModal = () => {
    setOpenCameraModal(false);
  };
  const toggleOpenCameraModal = () => {
    // if (filename) {
    setOpenCameraModal(!openCameraModal);
    // }
  };
  const UploadImage = () => {
    handleCloseCameraModal();
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
  //   const res = localStorage.getItem('hinyn-clientData');
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

    if (enteredFirstname?.length && enteredLastname?.length) {
      const data = {
        firstName: enteredFirstname,
        lastName: enteredLastname,
      };
      handleNextClick(data);
    } else {
      setOpen(true);
    }
  }

  const Goback = () => {
    Router.push('/RegistrationForm');
  };

  const handleUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setFilename(name);
    toggleOpenCameraModal();
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ marginBottom: '2rem', marginTop: '5rem' }}>
        <CssBaseline />
        <FormContainer>
          <Text fontSize="34px">
            <b>Let&apos;s make your account</b>
          </Text>
          <UploadButton
            component="label"
            // variant="outlined"
            sx={{ marginRight: '1rem' }}
          >
            {
              selectedImage ? (
                <Image
                  src={selectedImage}
                  width="180px"
                  height="180px"
                  style={{ borderRadius: '70rem', overflow: 'hidden' }}
                  alt="asd"
                />
              ) : (
                <>
                  <Text color="green">Upload a photo</Text>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    hidden
                    onChange={handleUpload}
                    multiple
                  />
                </>
              )
              // <Text color="green">Upload a photo</Text>
            }
          </UploadButton>
          <Text color="green" marginBottom="10px" marginTop="20px">
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
      <Modal2
        handleClose={handleCloseCameraModal}
        isOpen={openCameraModal}
        hasHeader={false}
        hasFooter={false}
      >
        <CameraModel>
          <Text marginLeft="4.5rem" fontSize="31px" fontWeight="bold">
            Use your camera to take a photo
          </Text>
          <Text marginTop="6px" marginLeft="3rem" fontSize="13px">
            Show your face clearly and take the photo in a well-lit place as it
            will be used to identify you.
          </Text>
          <Text marginTop="0px" marginLeft="12rem" fontSize="13px">
            you can still change your profile photo in the future.
          </Text>
        </CameraModel>
        <ImageDiv2>
          {selectedImage ? ( // Display the selected image if available
            <Image
              src={selectedImage}
              alt="Selected Image"
              height="350rem"
              width="600rem"
            />
          ) : (
            <Image
              src={require('../../public/assets/img/avatars/img-avatar1.png')}
              height="355rem"
              width="600rem"
              alt="asd"
            />
          )}
        </ImageDiv2>
        <TextDiv>
          <Text color="green" marginY="auto" marginRight="18px">
            Retake
          </Text>
          <StyledButton onClick={UploadImage}>Upload</StyledButton>
        </TextDiv>
      </Modal2>
    </>
  );
}

export default FirstLastName;
