import {useRef, useState} from 'react';
import { CssBaseline, Grid, Box, Typography, Container, TextareaAutosize} from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import StyledTextField from '../shared/Textfield';
import { BackIcon } from '../shared/Icon';


const StyledButton = styled(Button)`
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

const StyledTextArea = styled(TextareaAutosize)`
    resize: none;
    width: 100%;
    min-height: 15rem;
    border-radius: 20px;
    border-color: #ccc;
    padding: 10px;
    font-family: inherit;
`



function UnverifiedAccountForm({handleNextClick}){

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const firstName = 'Samantha'; //fetch from API

    const [isValid, setValid] = useState({
      "description":false,
      "form":false,
    });
    const [errorMessage, setErrorMessage] = useState({
        "description":null,
    });
    const descriptionInputRef = useRef();


    function submitHandler(event){
        event.preventDefault();
        const enteredDescription = descriptionInputRef.current.value;

        
        if(enteredDescription && enteredDescription !== ''){
            isValid.form = true; 
        }

        if(isValid.form){
          const clientData = {
            description: enteredDescription,
            };
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
              <b>Hello, {firstName}!</b>
            </Typography>
            <VerticalDivider/>
            <Text color="red">It seems that you haven&apos;t verified your email yet.</Text>
            <Text color="green">Check your email to verify your account.</Text>
            <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3, width:"100%"}}>
              <Grid container spacing={2} sx={{marginBottom:"2rem"}}>
                <Grid item xs={12}>
                </Grid>       
              </Grid>
              <ButtonContainer>
                <Text>
                    <BackIcon isabsolute={false}/>
                    <span style={{marginLeft:'1rem'}}>Go Back</span>
                </Text>
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

export default UnverifiedAccountForm;