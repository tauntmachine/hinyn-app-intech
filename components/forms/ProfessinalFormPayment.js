import { useEffect, useRef, useState } from 'react';
import Text from '../shared/Typography';
import { Button, Container } from '@mui/material';
import styled from '@emotion/styled';
import { CheckIcon, CheckSquareIcon, LockIcon } from '../shared/Icon';
import { BiCheckCircle } from 'react-icons/bi';

const ButtonDiv = styled.div`
  height: 3rem;
  width: 14rem;
  background: red;

  margin: 25px auto;
`;
const ContainersMain = styled.div`
  width: 41rem;
  height: 35rem;
  //   background: green;
  margin: auto;
  display: flex;
  gap: 0 16px;
  direction: row;
  padding: 0 6px;
`;
const ContainerBox = styled.div`
  width: 20rem;
  height: 27rem;
  background: white;
  border: 1px solid lightgray;
  border-radius: 10px;
`;
const EmailIconContainer = styled.div`
  margin: 32px auto 0 auto;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background: #4aa398;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 4px 10px #4aa39820;
`;
const StyledEmailIcon = styled(LockIcon)`
  font-size: 20px;
  color: #ffffff;
`;
const StyledCheckIcon = styled(BiCheckCircle)`
  font-size: 20px;
  color: #4aa398;
`;
const TextCenter = styled.div`
  margin: 1rem 5.5rem;
`;
const IconText = styled.div`
  display: flex;
  direction: row;
  margin: 6px 2rem;
`;
const ButtonOuline = styled.div`
  color: red;
  border-radius: 40px;
  border: 1px solid red;
  padding:7px 16px:
  width:8rem;
`;
const StyledButton = styled()`
  margin: auto;
  width: 100%;
  margin-top: 2rem;
`;
function ProfessionalFormPayment({ handleNextClick }) {
  return (
    <>
      <Container maxWidth="md" sx={{ marginBottom: '2rem', marginTop: '5rem' }}>
        <Text fontSize="35px" fontWeight="bold" marginLeft="10rem">
          Maximize your success earnings!
        </Text>
        <Text marginLeft="20rem" fontSize="13px">
          Try a <span>HINYN</span> Membership to enjoy greater benefits
        </Text>
        <ButtonDiv></ButtonDiv>
        <ContainersMain>
          <ContainerBox>
            <EmailIconContainer>
              <StyledEmailIcon />
            </EmailIconContainer>
            <TextCenter>
              <Text color="green">Trial Membership</Text>
              <Text fontSize="18px" fontWeight="bold">
                0 AED<span>/month</span>
              </Text>
            </TextCenter>
            <IconText>
              <StyledCheckIcon />
              <Text marginLeft="8px">1 Contract</Text>
            </IconText>
            <IconText>
              <StyledCheckIcon />
              <Text marginLeft="8px">3 Bids</Text>
            </IconText>
            <IconText>
              <StyledCheckIcon />
              <Text marginLeft="8px">Limited Notifications</Text>
            </IconText>
            <IconText>
              <StyledCheckIcon />
              <Text marginLeft="8px">Contract Recomendations</Text>
            </IconText>
            <IconText>
              <StyledCheckIcon />
              <Text marginLeft="8px">Preffered professional</Text>
            </IconText>
            {/* <ButtonOuline>Start Free Trial</ButtonOuline> */}
            <StyledButton>Start Free Trial</StyledButton>
          </ContainerBox>
          <ContainerBox></ContainerBox>
        </ContainersMain>
      </Container>
    </>
  );
}

export default ProfessionalFormPayment;
