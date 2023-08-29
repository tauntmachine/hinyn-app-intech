import React, { useRef, useState } from 'react';
import {
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  TextareaAutosize,
} from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import StyledTextField2, { OutlinedTextField } from '../shared/Textfield';

import { BackIcon } from '../shared/Icon';

const StyledButton = styled(Button)``;

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

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const VerticalDivider = styled.div`
  height: 2rem;
  width: 100%;
`;

function ProfessionalForm7({ handleNextClick }) {
  const [open, setOpen] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const otpInputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const handleOtpDigitChange = (index, value) => {
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);

    // Move focus to the next input field if available
    if (index < otpInputRefs.current.length - 1 && value !== '') {
      otpInputRefs.current[index + 1].current.focus();
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [isValid, setValid] = useState({
    otpNumber: false,
    form: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    otpNumber: null,
  });
  const otpNumberInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredOtp = otpDigits.join('');

    if (enteredOtp.length === 6) {
      handleNextClick(true);
    } else {
      setOpen(true);
    }

    // if(isValid.form){
    //   const clientData = {
    //     otpNumber: enteredOtpNumber
    //     };
    //     handleNextClick(true);
    // }else{
    //     setOpen(true)
    // }
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ marginBottom: '2rem', marginTop: '5rem' }}>
        <CssBaseline />
        <FormContainer>
          <Text fontSize="34px">
            <b>Let&apos;s make your profile</b>
          </Text>
          <Text marginTop="6px">
            Fill out your profile for clients to better understand your
          </Text>
          <Text>services.</Text>
          <VerticalDivider />
          <Text color="green">Verify your phone number</Text>
          <Text marginTop="6px">
            We have sent an OTP (One time passcode) to
          </Text>
          <Text color="red" fontSize="18px" marginTop="6px">
            +971 50 1234567
          </Text>
          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 3, width: '100%' }}
          >
            <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
              {otpDigits.map((digit, index) => (
                <Grid item xs={2} key={index}>
                  <OutlinedTextField
                    required
                    fullWidth
                    name={`otpDigit${index}`}
                    value={digit}
                    inputRef={otpInputRefs.current[index]}
                    onChange={(e) =>
                      handleOtpDigitChange(index, e.target.value)
                    }
                  />
                </Grid>
              ))}
            </Grid>

            <ButtonContainer>
              <Text>
                <BackIcon isabsolute={false} />
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
        <div>Wrong ott</div>
      </Modal>
    </>
  );
}

export default ProfessionalForm7;
