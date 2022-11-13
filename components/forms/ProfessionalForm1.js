import {useRef, useState} from 'react';
import { CssBaseline, TextField, Grid, Box, Typography, Container} from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import { useRouter } from "next/router";
import Modal from '../shared/Modal';
import { LeftArrowIcon } from '../shared/Icon';


const StyledButton = styled(Button)`
`

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items:center;
  width: 100%;
  border-radius: 20px;
`;

const Avatar = styled.div`
    background: #ffffff;
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    box-shadow: 0px 3px 6px #00000029;
    margin: 2rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Error = styled.p`
  color:red;
  font-size:0.75rem;
  font-family: "Roboto", sans-serif;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

function ProfessionalForm1(){

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
 
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
        
        if(enteredFirstname && enteredLastname){
            isValid.form = true; 
        }

        if(isValid.form){
          const clientData = {
            firstname: enteredFirstname,
            lastname: enteredLastname,
        };
        // onUsernameSubmit(clientData)
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
              <b>Let's make your account</b>
            </Typography>
            <Avatar> <Text color="green">Upload a photo</Text> </Avatar>
            <Typography component="p" align="center">
                Please use your real name as this will be required for identity verification.
            </Typography>
            <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3, width:"100%"}}>
              <Grid container spacing={2} sx={{marginBottom:"2rem"}}>
                <Grid item xs={12}>
                  <TextField
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
                  <TextField
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
                    <LeftArrowIcon />
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
</>
    );

}

export default ProfessionalForm1;