import { useRef, useState } from 'react';
import { CssBaseline, Grid, Box, Typography, Container } from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import StyledTextField from '../shared/Textfield';
import { BackIcon, EmailIcon } from '../shared/Icon';

const StyledButton = styled(Button)``;

const StyledEmailIcon = styled(EmailIcon)`
  font-size: 20px;
  color: #ffffff;
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
const FieldVerify = styled.div`
  background: white;
  border: 1px solid #d8d8d8;
  border-radius: 40px;
  width: 25rem;
  color: cyan;
  justify-content: center;
  height: 40px;
  margin: auto;
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
  width: 75%;
  margin: auto;
`;
const VerticalDivider = styled.div`
  height: 2rem;
  width: 100%;
`;

function ProfessionalForm9({ handleNextClick }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const data = {
    firstName: 'Samantha',
    email: 'test@email.com',
  };

  function submitHandler(event) {
    event.preventDefault();

    handleNextClick(true);
  }
  return (
    <>
      <Container maxWidth="sm" sx={{ marginBottom: '2rem', marginTop: '5rem' }}>
        <CssBaseline />
        <FormContainer>
          <Text fontSize="38px">
            <b>Thanks, {data.firstName}!</b>
          </Text>
          <VerticalDivider />
          <EmailIconContainer>
            <StyledEmailIcon />
          </EmailIconContainer>
          <VerticalDivider />
          <Text fontSize="28px">Your email is verified</Text>
          <Box sx={{ mt: 3, width: '100%' }}>
            <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
              <Grid item xs={12}>
                <FieldVerify>
                  <Text marginTop="8px" marginLeft="120px" color="green">
                    {data.email}
                  </Text>
                </FieldVerify>
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
              <Text>
                <BackIcon isabsolute={false} />
                <span style={{ marginLeft: '1rem' }}>Go Back</span>
              </Text>
              <StyledButton onClick={submitHandler}>NEXT</StyledButton>
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

export default ProfessionalForm9;
