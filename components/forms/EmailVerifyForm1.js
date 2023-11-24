import React, { useRef, useState, useEffect } from 'react';
import { CssBaseline, Grid, Box, Typography, Container } from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal from '../shared/Modal';

import { BackIcon, EmailIcon } from '../shared/Icon';
import { getUserData } from './formService';

const StyledButton = styled(Button)``;
const Div2 = styled.div`
  margin: auto;
  margin-top: 30px;
  width: 7rem;
  margin-bottom: 30px;
`;
const StyledEmailIcon = styled(EmailIcon)`
  font-size: 20px;
  color: #ffffff;
`;
const FieldVerify = styled.div`
  background: white;
  border: 1px solid #d8d8d8;
  border-radius: 40px;
  width: 25rem;
  color: cyan;
  justify-content: center;
  padding: 10px 0;
  margin: auto;
`;
const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 20px;
`;

const EmailIconContainer = styled.div`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background: #4aa398;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 4px 10px #4aa39820;
`;

const Error = styled.p`
  color: purple;
  font-size: 0.75rem;
  font-family: 'Roboto', sans-serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 75%;
  margin: auto;
`;
const VerticalDivider = styled.div`
  height: 2rem;
  width: 100%;
`;
const BackCon = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;
function EmailVerifyForm1({ handleNextClick, handleBack, name, email }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ marginBottom: '2rem', marginTop: '5rem' }}>
        <CssBaseline />
        <FormContainer>
          <Text size="xl">
            <b>Almost there, {name ? name : 'Samantha'}!</b>
          </Text>
          <VerticalDivider />
          <EmailIconContainer>
            <StyledEmailIcon />
          </EmailIconContainer>
          <VerticalDivider />
          <Text size="large">Check your email to Verify </Text>
          <Text size="large">your account</Text>
          <Box sx={{ mt: 3, width: '100%' }}>
            <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
              <Grid item xs={12}>
                <FieldVerify>
                  <Text color="green" style={{ marginLeft: '14px' }}>
                    {email ? email : 'Samantha12@gmail.com'}
                  </Text>
                </FieldVerify>
                <Div2>
                  {' '}
                  <Text color="red" fontSize="14px">
                    {' '}
                    Resend Email
                  </Text>
                  <Text color="#dbdbdb" marginTop="12px" fontSize="14px">
                    {' '}
                    Change Email
                  </Text>
                </Div2>

                {/* <StyledTextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  value={data.email}
                  disabled="true"
                /> */}
              </Grid>
            </Grid>

            <ButtonContainer>
              <BackCon onClick={handleBack}>
                <BackIcon
                  isabsolute={false}
                  style={{ margin: 'auto', fontSize: '16.5px' }}
                />
                <Text
                  style={{
                    marginLeft: '1rem',
                    fontSize: '12.5px',
                    marginTop: '2px',
                  }}
                >
                  Go Back
                </Text>
              </BackCon>
              <StyledButton onClick={handleNextClick}>NEXT</StyledButton>
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
    </>
  );
}

export default EmailVerifyForm1;
