import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {
  CssBaseline,
  Grid,
  Box,
  Container,
  TextareaAutosize,
} from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';

import StyledTextField from '../shared/Textfield';
import Dropdown3 from '../shared/Dropdown3';
import Image from 'next/image';
import { addProposal } from './formService';

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
  margin: 20px 0 0 0;
`;
const VerticalDivider = styled.div`
  height: 1rem;
`;

const CustomDropdown = styled(Dropdown3)`
  .MuiInputBase-root {
    border-radius: 10px;
  }
`;

const CustomTextField = styled(StyledTextField)`
  .MuiInputBase-root {
    border-radius: 8px;
    background-color: #f2f2f2;
    border: none;
    color: #ff5a5f;

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

  border-radius: 10px;

  padding: ${(props) => (props.typeh === 'less' ? '1rem' : '3rem')};
  font-family: inherit;
  background-color: #e6e6e6;
  opacity: 0.7;
  border: none;
  color: #949494;

  &:focus {
    border: none;
    outline: none;
  }
`;

const ImageContainer = styled.div`
  width: 4rem;
  height: 4rem;
  position: relative;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0px 3px 6px #00000029;
  cursor: pointer;
`;
const StyledImage = styled(Image)`
  border-radius: 50%;
`;

const BidFreelancerForm = ({ handleBidSubmit, data }) => {
  let imgpath = '/assets/img/avatars/';

  const currencies = [
    {
      title: 'USD',
      value: 'usd',
    },
    {
      title: 'AED',
      value: 'aed',
    },
    {
      title: 'PKR',
      value: 'pkr',
    },
  ];

  const router = useRouter();
  const { pid } = router.query;
  console.log(pid);
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

  function submitHandler(event) {
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
      console.log('okay');
      const clientId = localStorage.getItem('hinyn-cid');
      const clientData = {
        status: 1,
        Amount: enteredBidAmount,
        Description: enteredBidDescription,
        client: clientId,
        bid: pid,
        isDirectBidAssignment: false,
      };
      console.log('proposal dta', clientData);
      addProposal(clientData).then((res) => {
        if (res) {
          console.log(res);
          handleBidSubmit(clientData);
        }
      });
    }
  }
  return (
    <>
      <Container maxWidth="lg" sx={{ margin: '1rem 0' }}>
        <CssBaseline />
        <FormContainer>
          <ImageContainer>
            <StyledImage
              src={
                data?.img ? imgpath + data?.img : imgpath + 'img-avatar1.png'
              }
              layout="fill"
              alt="icon-img"
            />
          </ImageContainer>
          <Text color="red" size="large">
            <b>
              Put a bid for {data?.attributes.firstName}{' '}
              {data?.attributes.lastName}
            </b>
          </Text>
          <Container maxWidth="sm">
            <Text align="center" fontSize="12px" color="lightgray">
              Would you like to work with this professional specifically on your
              project? Send a bid and tell them what your project is all about.
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
                <GrayText>
                  <b>Bid</b>
                </GrayText>
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
                    selected="usd"
                    color="red"
                  />
                  {/* <StyledTextArea
                    required
                    fullWidth
                    type="number"
                    id="bidAmount"
                    typeh="less"
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
                  /> */}
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

                  {errorMessage.bidAmount && (
                    <Error>{errorMessage.bidAmount}</Error>
                  )}
                </Box>
                {errorMessage.bidAmount && (
                  <Error>{errorMessage.bidAmount}</Error>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
              <Grid item xs={12}>
                <GrayText>
                  <b>Bid Proposal</b>
                </GrayText>
                <StyledTextArea
                  rowsMin={3}
                  placeholder="Enter bid proposal"
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
              </Grid>
            </Grid>
            <GrayText>
              <b>Mile payments</b>
            </GrayText>
            <StyledTextArea
              placeholder="Milestone"
              typeh="less"
              // rowsMin={3}

              // id="bidDescription"
              // name="bidDescription"
              // maxLength={500}
              // onChange={(event) => {
              //   const { value } = event.target;
              //   setBidDescription(() => value);
              //   if (value) {
              //     setErrorMessage((prevState) => ({
              //       ...prevState,
              //       ['bidDescription']: null,
              //     }));
              //   }
              // }}
            />
            {errorMessage.bidDescription && (
              <Error>{errorMessage.bidDescription}</Error>
            )}
            <ButtonContainer>
              <Container sx={{ width: '25%' }}>
                <Button width="100%">Submit</Button>
              </Container>
            </ButtonContainer>
          </Box>
        </FormContainer>
      </Container>
    </>
  );
};

export default BidFreelancerForm;
