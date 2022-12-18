import { useState } from 'react';
import { CssBaseline, Grid, Box, Typography, Container, TextareaAutosize} from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import { Button as CustomButton } from '@mui/material';
import { BackIcon, UploadIcon} from '../shared/Icon';
import { WebcamCapture } from '../shared/WebcamCapture';
import AvatarUpload from '../shared/AvatarUpload';



const StyledButton = styled(Button)`
`

const StyledUploadIcon = styled(UploadIcon)`
  font-size: 24px;
  font-weight: 600;
  color: #0F7669;
`

const UploadButton = styled(CustomButton)`
  border: 1px solid #0F7669;
  color: #0F7669;
  border-radius: 5px;
  background: #CCE0DE;
  width: 100%;
  font-size: 12px;
  padding: 30px 16px;
  display: flex;
  flex-direction: column;

  &:hover{
    background: #CCE0DE; 
    color: #0F7669;
    border: 1px solid #0F7669;
  }
`

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items:center;
  width: 100%;
  border-radius: 20px;
`;


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
const VerticalDivider = styled.div`
    height: 2rem;
    width:100%;
`

function ProfessionalForm8({handleNextClick}){

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
      "uploadedFiles":false,
      "avatarSelfie":false,
      "form":true,
    });
    const [errorMessage, setErrorMessage] = useState({
        "uploadedFiles":null,
        "avatarSelfie":false,
    });

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [filename, setFilename] = useState("");
  
    const handleFileUpload = (e) => {
      if (!e.target.files) {
        return;
      }
      const file = e.target.files[0];
      const { name } = file;
      setFilename(name);
    };


    function submitHandler(event){
        event.preventDefault();
        
        if(uploadedFiles.length > 0 ){
            isValid.form = true; 
        }

        if(isValid.form){
          const clientData = {
            uploadedFiles: isValid.form
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
              <b>Let&apos;s make your profile</b>
            </Typography>
            <Typography component="p" align="center">
                Fill out your profile for clients to better understand your services.
            </Typography>
            <VerticalDivider/>
            <Text color="green">Upload your document</Text>
            <Typography component="p" align="center">
              We will need to verify your identity. Kindly upload a scanned ID (Either your Passport, Government ID, or Driver’s License)
            </Typography>
            <VerticalDivider />
            <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3, width:"100%"}}>
              <Grid container spacing={2} sx={{marginBottom:"2rem"}}>
                <Grid item xs={12}>
                <UploadButton
                    component="label"
                    variant="outlined"
                    sx={{ marginRight: "1rem" }}
                    startIcon={<StyledUploadIcon />}
                  >
                    <br/>
                    Drag or click to upload your document
                    <input type="file" accept="image/*,.pdf" hidden onChange={handleFileUpload} multiple/>
                  </UploadButton>
                  {errorMessage.uploadedFiles && (
                        <Error >{errorMessage.uploadedFiles }</Error>
                   )}
                </Grid>       
              </Grid>
              <Grid container spacing={2} sx={{marginBottom:"2rem"}}>
                <Grid item xs={12}>
                  <AvatarUpload onClick={toggleOpenCameraModal}> <Text color="green">Upload a photo</Text> </AvatarUpload>
                  {errorMessage.documentSelfie && (
                        <Error >{errorMessage.documentSelfie }</Error>
                   )}
                </Grid>       
              </Grid>
             
              <ButtonContainer>
                <Text>
                    <BackIcon isabsolute={false}/>
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

export default ProfessionalForm8;