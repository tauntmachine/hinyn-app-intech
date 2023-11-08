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
const GridDiv = styled.div`
  display: flex;
  margin-bottom: 2rem;
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
  width: 77%;
  margin: 4rem 4.5rem;
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

function Location({ handleNextClick, handleBack }) {
  const [open, setOpen] = useState(false);
  // const [selectedCountry, setSelectedCountry] = useState(null);
  // const [selectedCity, setSelectedCity] = useState(null);
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
  const countryInputRef = useRef();
  const stateInputRef = useRef();
  const zipcodeInputRef = useRef();
  const cityInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const selectedCountry = countryInputRef.current.value;
    const selectedState = stateInputRef.current.value;
    const selectedZipcode = zipcodeInputRef.current.value;
    const selectedCity = cityInputRef.current.value;

    if (selectedCountry !== '') {
      isValid.form = true;
    } else {
      setOpen(true);
    }

    if (isValid.form) {
      const clientData = {
        city: selectedCity,
        country: selectedCountry,
        countryCode: selectedZipcode,
      };
      handleNextClick(clientData);
    } else {
      setOpen(true);
    }
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ marginBottom: '2rem', marginTop: '5rem' }}>
        <CssBaseline />
        <FormContainer>
          <Text fontSize="34px">
            <b>Let&apos;s make your profile</b>
          </Text>
          <Text>
            Fill out your profile for clients to better understand your
          </Text>
          <Text>services.</Text>
          <VerticalDivider />
          <Text color="green" marginBottom="8px">
            Where are you located?
          </Text>
          <Text fontSize="12px">
            Please use your real address as this will be used for identity
            verification.
          </Text>
          <Text fontSize="12px">
            Only your city and country will be shown publicly.
          </Text>
          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 3, width: '100%' }}
          >
            <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
              <Grid item xs={9} sx={{ width: '100%', marginLeft: '70px' }}>
                <StyledTextField
                  required
                  fullWidth
                  id="locationOptions"
                  placeholder="Country"
                  inputRef={countryInputRef}
                  // name="languages"

                  // onChange={(event) => {
                  //   setSelectedCountry(() => event.target.innerText);
                  // }}
                  // defaultValue={selectedCountry}
                  // onChange={(event) => {
                  //   const { value } = event.target;
                  //   setSelectedCountry(() => value);
                  // }}
                />
                {errorMessage.location && (
                  <Error>{errorMessage.location}</Error>
                )}
                {/* <Autocomplete
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
                )} */}
              </Grid>
            </Grid>
            <GridDiv>
              <Grid container spacing={2} sx={{}}>
                <Grid item xs={9} sx={{ width: '100%', marginLeft: '70px' }}>
                  <StyledTextField
                    required
                    fullWidth
                    id="locationOptions"
                    placeholder="State/Province"
                    inputRef={stateInputRef}
                    // name="languages"

                    // onChange={(event) => {
                    //   setSelectedCity(() => event.target.innerText);
                    // }}
                  />
                  {errorMessage.location && (
                    <Error>{errorMessage.location}</Error>
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{}}>
                <Grid item xs={8} sx={{ width: '100%', marginLeft: '20px' }}>
                  <StyledTextField
                    required
                    fullWidth
                    id="locationOptions"
                    placeholder="zip code"
                    inputRef={zipcodeInputRef}
                    // name="languages"

                    // onChange={(event) => {
                    //   setSelectedLocation(() => event.target.innerText);
                    // }}
                  />
                  {errorMessage.location && (
                    <Error>{errorMessage.location}</Error>
                  )}
                </Grid>
              </Grid>
            </GridDiv>
            <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
              <Grid item xs={9} sx={{ width: '100%', marginLeft: '70px' }}>
                <StyledTextField
                  required
                  fullWidth
                  id="locationOptions"
                  placeholder="City"
                  inputRef={cityInputRef}
                  // name="languages"

                  // onChange={(event) => {
                  //   setSelectedCity(() => event.target.innerText);
                  // }}
                  // defaultValue={selectedCity}
                  // onChange={(event) => {
                  //   const { value } = event.target;
                  //   setSelectedCity(() => value);
                  // }}
                />
                {errorMessage.location && (
                  <Error>{errorMessage.location}</Error>
                )}
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
                  }}
                >
                  Go Back
                </Text>
              </BackCon>
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

export default Location;
