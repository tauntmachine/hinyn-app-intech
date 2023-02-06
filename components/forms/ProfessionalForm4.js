import {useRef, useState} from 'react';
import { CssBaseline, Grid, Box, Typography, Container} from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import StyledTextField from '../shared/Textfield';
import { BackIcon } from '../shared/Icon';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import { updateClientData } from './formService';


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

function ProfessionalForm4({handleNextClick}){

  const [open, setOpen] = useState(false);
  const [dobValue, setDobValue] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const checkDOB = (dobdate) => {
    const dateFormat = 'YYYY-MM-DD';
    const dob = moment(dobdate, dateFormat, true).isValid();
    const today =  moment().format('YYYY-MM-DD');

    if(dob && moment(today).format('YYYY') > moment(dobdate).format('YYYY')){
      setErrorMessage((prevState) => ({
        ...prevState,
        ['dob']:null
      }))
      setValid((prevState) => ({
        ...prevState,
        ['dob']:true
      }))
      setDobValue(moment(dobdate).format('YYYY-MM-DD'))
    }else{
      setErrorMessage((prevState) => ({
        ...prevState,
        ['dob']:"Invalid date of birth."
      }))
    }
  }



    const [isValid, setValid] = useState({
      "languages":false,
      "dob":false,
      "form":false,
    });
    const [errorMessage, setErrorMessage] = useState({
        "languages":null,
        "dob":null,
    });
    const languagesInputRef = useRef();


    function submitHandler(event){
        event.preventDefault();
        const enteredLanguages = languagesInputRef.current.value;
        
        if(enteredLanguages && dobValue && (enteredLanguages !== '')){
            isValid.form = true; 
        }

        if(isValid.form){
            const clientId = localStorage.getItem('hinyn-cid');
            const clientData = {
              dateOfBirth: dobValue,
            };
              updateClientData(clientData, clientId).then((result)=>{
                if(result?.data) handleNextClick(true);
              });
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
            <Text color="green">WWhat languages do you speak?</Text>
            <Typography component="p" align="center">
              We will use this to help match you with employers who are fluent in these languages.
            </Typography>
            <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3, width:"100%"}}>
              <Grid container spacing={2} sx={{marginBottom:"2rem"}}>
                <Grid item xs={12}>
                  <StyledTextField
                    required
                    fullWidth
                    id="languages"
                    placeholder="example: English"
                    name="languages"
                    inputRef={languagesInputRef}
                  />
                  {errorMessage.languages && (
                        <Error >{errorMessage.languages}</Error>
                   )}
                </Grid>       
              </Grid>
              <VerticalDivider />
              <Text color="green" align="center">When were you born?</Text>
            <Typography component="p" align="center">
            You need to be at least 16 years old to use the website. This information will be used for verification and will be kept confidential.
            </Typography>
              <Grid container spacing={2} sx={{marginBottom:'2rem'}}>
                <Grid item xs={12} sx={{width:'100%'}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  inputFormat="dd/MM/yyyy"
                  value={dobValue}
                  onChange={checkDOB}
                  renderInput={(params) => <StyledTextField {...params} sx={{width:'inherit'}}/>}
                />
                </LocalizationProvider>
                {errorMessage.dob && (
                        <Error >{errorMessage.dob}</Error>
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

export default ProfessionalForm4;