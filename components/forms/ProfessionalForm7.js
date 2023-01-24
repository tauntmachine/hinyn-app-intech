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


function ProfessionalForm7({handleNextClick}){

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  
    const [isValid, setValid] = useState({
      "otpNumber":false,
      "form":false,
    });
    const [errorMessage, setErrorMessage] = useState({
        "otpNumber":null,
    });
    const otpNumberInputRef = useRef();


    function submitHandler(event){
        event.preventDefault();
        const enteredOtpNumber = otpNumberInputRef.current.value;
    

        
        if(enteredOtpNumber && enteredOtpNumber !== '' && enteredOtpNumber.length === 6 ){
            isValid.form = true; 
        }

        if(isValid.form){
          const clientData = {
            otpNumber: enteredOtpNumber
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
            <Text color="green">Verify your phone number</Text>
            <Typography component="p" align="center">
              We have sent an OTP (One time passcode) to
            </Typography>
            <Text color="red">+971 50 1234567</Text>
            <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3, width:"100%"}}>
              <Grid container spacing={2} sx={{marginBottom:"2rem"}}>
                <Grid item xs={12}>
                  <StyledTextField
                    required
                    fullWidth
                    id="otpNumber"
                    placeholder="Enter 6-digit OTP"
                    name="otpNumber"
                    inputRef={otpNumberInputRef}
                  />
                  {errorMessage.otpNumber && (
                        <Error >{errorMessage.otpNumber}</Error>
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
</>
    );

}

export default ProfessionalForm7;