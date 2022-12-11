import {useRef, useState} from 'react';
import { CssBaseline, Grid, Box, Typography, Container} from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import StyledTextField from '../shared/Textfield';
import { BackIcon } from '../shared/Icon';
import { WebcamCapture } from '../shared/WebcamCapture';


const StyledButton = styled(Button)`
`

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items:center;
  width: 100%;
  border-radius: 20px;
`;

const AvatarUpload = styled.div`
    background: #ffffff;
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    box-shadow: 0px 3px 6px #00000029;
    margin: 2rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const Error = styled.p`
  color:red;
  font-size:0.75rem;
  font-family: "Roboto", sans-serif;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items:center;
    justify-content: space-between;
`



function ProfessionalForm1({handleNextClick}){

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
  }


    const [isValid, setValid] = useState({
      "firstname":false,
      "lastname":false,
      "form":false,
    });
    const [errorMessage, setErrorMessage] = useState({
        "firstname":null,
        "lastname":null,
    });
    const firstnameInputRef = useRef();
    const lastnameInputRef = useRef();


    function submitHandler(event){
        event.preventDefault();
        const enteredFirstname = firstnameInputRef.current.value;
        const enteredLastname = lastnameInputRef.current.value;
        
        if(enteredFirstname && enteredLastname && (enteredFirstname !== '' && enteredLastname !== '')){
            isValid.form = true; 
        }

        if(isValid.form){
          const clientData = {
            firstname: enteredFirstname,
            lastname: enteredLastname,
            };
            console.log('clientdat',clientData)
            handleNextClick(true);
        }else{
            setOpen(true)
        }
    }
      

    return (
      <>
        <Container maxWidth="sm" sx={{marginBottom:"2rem",marginTop:"5rem"}}>
          <CssBaseline />
          <FormContainer>
            <Typography component="h1" variant="h4">
              <b>Let&apos;s make your account</b>
            </Typography>
            <AvatarUpload onClick={toggleOpenCameraModal}> <Text color="green">Upload a photo</Text> </AvatarUpload>
            <Text color="green">What is your name? </Text>
            <Typography component="p" align="center">
                Please use your real name as this will be required for identity verification.
            </Typography>
            <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3, width:"100%"}}>
              <Grid container spacing={2} sx={{marginBottom:"2rem"}}>
                <Grid item xs={12}>
                  <StyledTextField
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    name="firstname"
                    inputRef={firstnameInputRef}
                  />
                  {errorMessage.firstname && (
                        <Error >{errorMessage.firstname}</Error>
                   )}
                </Grid>       
              </Grid>
              <Grid container spacing={2} sx={{marginBottom:'2rem'}}>
                <Grid item xs={12}>
                  <StyledTextField
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    inputRef={lastnameInputRef}
                  />
                  {errorMessage.lastname && (
                        <Error >{errorMessage.lastname}</Error>
                   )}
                </Grid>       
              </Grid>
              <ButtonContainer>
                <Text>
                    <BackIcon isAbsolute={false}/>
                    <span style={{marginLeft:'1rem'}}>Go Back</span>
                </Text>
                <StyledButton>
                    NEXT
                </StyledButton>
               </ButtonContainer>
            </Box>
          </FormContainer>
        </Container>

     <Modal handleClose={handleClose} isOpen={open} hasHeader={false} hasFooter={false}>
      <div>Oops! All fields are required.</div>
     </Modal>
     <Modal handleClose={handleCloseCameraModal} isOpen={openCameraModal} hasHeader={false} hasFooter={false}>
      <div>CAMERA MODAL HERE</div>
      {/* <WebcamCapture /> */}
     </Modal>
</>
    );

}

export default ProfessionalForm1;