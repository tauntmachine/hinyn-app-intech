import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  TextareaAutosize,
} from '@mui/material';
import styled from '@emotion/styled';
import Text, { SmallText } from '../shared/Typography';
import Button, { GreenButton } from '../shared/Button';
import StyledTextField from '../shared/Textfield';
import Dropdown from '../shared/Dropdown';
import { addProposal, updateBidData } from './formService';
import DropdownO from '../shared/DropdownO';

const StyledButton = styled(Button)``;

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
  width: 100%;
  border-radius: 20px;
`;

const Error = styled.p`
  color: red;
  font-size: 0.75rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const VerticalDivider = styled.div`
  height: 1rem;
`;

const CustomDropdown = styled(Dropdown)`
  .MuiInputBase-root {
    border-radius: 10px;
    background: red;
  }
`;

const CustomTextField = styled(StyledTextField)`
  .MuiInputBase-root {
    border-radius: 10px;
    background-color: #f2f2f2;
    border: none;
    color: #4aa398;

    &:focus {
      border: none;
      outline: none;
    }
  }
`;

const GrayText = styled(Text)`
  color: #949494;
`;

const StyledTextArea = styled(TextareaAutosize)`
  resize: none;
  width: 100%;
  min-height: 7rem;
  border-radius: 20px;
  padding: 10px;
  font-family: inherit;
  background-color: #e6e6e6;
  opacity: 1;
  border: none;
  color: #949494;

  &:focus {
    border: none;
    outline: none;
  }
`;

const BidOnProjectForm = ({ handleSubmit, proposals }) => {
  const [selectedCurrency, setSelectedCurrency] = useState([]);
  const currencies = [
    {
      title: 'AED',
      value: 'AED',
    },
    {
      title: 'USD',
      value: 'USD',
    },
  ];

  const router = useRouter();
  const { project } = router.query;

  const [enteredBidDescription, setBidDescription] = useState('');

  const [isValid, setValid] = useState({
    bidAmount: null,
    bidDescription: null,
    form: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    bidAmount: null,
    bidDescription: null,
  });
  const bidAmountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredBidAmount = bidAmountInputRef.current.value;

    if (!enteredBidAmount) {
      setErrorMessage((prevState) => ({
        ...prevState,
        ['bidAmount']: 'Invalid bid amount',
      }));
      setValid((prevState) => ({
        ...prevState,
        ['form']: false,
      }));
    }

    if (!enteredBidDescription) {
      setErrorMessage((prevState) => ({
        ...prevState,
        ['bidDescription']: 'Provide bid description',
      }));
      setValid((prevState) => ({
        ...prevState,
        ['form']: false,
      }));
    }

    if (
      enteredBidAmount &&
      enteredBidDescription &&
      enteredBidAmount !== '' &&
      enteredBidDescription !== ''
    ) {
      isValid.form = true;
    }

    if (isValid.form) {
      const clientId = localStorage.getItem('hinyn-cid');
      const proposalData = {
        status: 1,
        budget: enteredBidAmount,
        description: enteredBidDescription,
        client: clientId,
        bid: project,
        isDirectBidAssignment: false,
      };

      let existingProposals = proposals?.data.map((item) => item.id) ?? [];
      addProposal(proposalData).then((res) => {
        if (res?.data) {
          let newProposal = { proposals: [res?.data?.id] };
          if (existingProposals) {
            existingProposals.push(res?.data?.id);
            newProposal.proposals = existingProposals;
          }
          if (newProposal) {
            updateBidData(newProposal, project).then((result) => {
              if (result?.data) handleSubmit(true);
            });
          }
        } else handleSubmit(false);
      });

      //
    }
  };
  const handleCurrencyChange = (val) => {
    setSelectedCurrency(() => val);
  };
  return (
    <>
      <Container maxWidth="lg" sx={{ margin: '2rem 0' }}>
        <CssBaseline />
        <FormContainer>
          <Text color="red" size="large">
            <b>Application to the bid</b>
          </Text>
          <Container maxWidth="sm">
            <Text align="center">
              Interested with this project? Place a bid now and leave a message
              for the client on why you&apos;re the right person for this job!
            </Text>
          </Container>
          <VerticalDivider />
          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 3, width: '100%' }}
          >
            <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
              <Grid item xs={12}>
                <GrayText>Bid</GrayText>
                <Box
                  sx={{
                    display: 'flex',
                    position: 'relative',
                    alignItems: 'center',
                  }}
                >
                  <CustomDropdown
                    hasLabel={false}
                    items={currencies}
                    width="100%"
                    type="outlined"
                    setHandleOnChange={handleCurrencyChange}
                    selected={selectedCurrency}
                  />
                  <CustomTextField
                    required
                    fullWidth
                    type="number"
                    id="bidAmount"
                    label=""
                    name="bidAmount"
                    inputRef={bidAmountInputRef}
                    onChange={(event) => {
                      const { value } = event.target;
                      if (value) {
                        setErrorMessage((prevState) => ({
                          ...prevState,
                          ['bidAmount']: null,
                        }));
                      }
                    }}
                  />
                </Box>
                {errorMessage.bidAmount && (
                  <Error>{errorMessage.bidAmount}</Error>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
              <Grid item xs={12}>
                <GrayText>Bid Proposal </GrayText>
                <StyledTextArea
                  rowsMin={3}
                  // placeholder="Enter bid proposal"
                  id="bidDescription"
                  name="bidDescription"
                  maxLength={500}
                  onChange={(event) => {
                    const { value } = event.target;
                    setBidDescription(() => value);
                    if (value) {
                      setErrorMessage((prevState) => ({
                        ...prevState,
                        ['bidDescription']: null,
                      }));
                    }
                  }}
                />
                {errorMessage.bidDescription && (
                  <Error>{errorMessage.bidDescription}</Error>
                )}
                <SmallText>
                  <GrayText>
                    <i>Max: 500 characters</i>
                  </GrayText>
                </SmallText>
              </Grid>
            </Grid>
            <ButtonContainer>
              <GreenButton>Submit</GreenButton>
            </ButtonContainer>
          </Box>
        </FormContainer>
      </Container>
    </>
  );
};

export default BidOnProjectForm;
