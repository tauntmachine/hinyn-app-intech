import { useRef, useState } from 'react';
import {
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  Autocomplete,
} from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import StyledTextField from '../shared/Textfield';
import { BackIcon } from '../shared/Icon';
import { updateClientData } from './formService';

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

const locations = {
  data: [
    {
      key: 'dubai',
      label: 'Dubai',
    },
    {
      key: 'abudhabi',
      label: 'Abu Dhabi',
    },
    {
      key: 'sharjah',
      label: 'Sharjah',
    },
    {
      key: 'ajman',
      label: 'Ajman',
    },
    {
      key: 'umm-al-quwain',
      label: 'Umm Al Quwain',
    },
    {
      key: 'fujairah',
      label: 'Fujairah',
    },
    {
      key: 'ras-al-khaimah',
      label: 'Ras Al Khaimah',
    },
  ],
};

function ProfessionalForm5({ handleNextClick }) {
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const [isValid, setValid] = useState({
    location: false,
    form: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    location: null,
  });

  function submitHandler(event) {
    event.preventDefault();
    handleNextClick(true);
    // if (selectedLocation && selectedLocation !== null) {
    //   isValid.form = true;
    // }

    // if (isValid.form) {
    //   const clientId = localStorage.getItem('hinyn-cid');
    //   const clientData = {
    //     city: selectedLocation,
    //     country: "United Arab Emirates",
    //   };
    //   updateClientData(clientData, clientId).then((result) => {
    //     if (result?.data) handleNextClick(true);
    //   });
    // } else {
    //   setOpen(true);
    // }
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ marginBottom: '2rem', marginTop: '5rem' }}>
        <CssBaseline />
        <FormContainer>
          <Typography component="h1" variant="h4">
            <b>Let&apos;s make your profile</b>
          </Typography>
          <Typography component="p" align="center">
            Fill out your profile for clients to better understand your
            services.
          </Typography>
          <VerticalDivider />
          <Text color="green">Where are you located?</Text>
          <Typography component="p" align="center">
            Please use your real address as this will be used for identity
            verification. <br />
            Only your city and country will be shown publicly.
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 3, width: '100%' }}
          >
            <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
              <Grid item xs={12} sx={{ width: '100%' }}>
                <Autocomplete
                  disablePortal
                  id="locationOptions"
                  options={locations.data}
                  sx={{ width: 'inherit' }}
                  renderInput={(params) => (
                    <StyledTextField {...params} label="Location" />
                  )}
                  onChange={(event) => {
                    setSelectedLocation(() => event.target.innerText);
                  }}
                />
                {errorMessage.location && (
                  <Error>{errorMessage.location}</Error>
                )}
              </Grid>
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
        <div>Oops! All fields are required.</div>
      </Modal>
    </>
  );
}

export default ProfessionalForm5;
