import { useState } from 'react';
import Text from '../shared/Typography';
import { Container } from '@mui/material';
import { Button as CustomButton } from '@mui/material';
import styled from '@emotion/styled';
import { BackIcon, CheckIcon, CheckSquareIcon, LockIcon } from '../shared/Icon';
import { BiCheckCircle } from 'react-icons/bi';
import Button from '../shared/Button';
import { useRouter } from 'next/router';

const StyledButton = styled(Button)`
  margin: 2rem auto;
  width: 11rem;
`;
const StyledButton2 = styled.div`
  margin: 2rem auto;
  width: 11rem;
  background: white;
  border: 1px solid #eb4c60;
  border-radius: 40px;
`;
// const ButtonDiv = styled.div`
//   height: 3rem;
//   width: 14rem;
//   background: red;

//   margin: 25px auto;
// `;
const ContainersMain = styled.div`
  width: 44rem;
  height: 35rem;
  //   background: green;
  margin: auto;
  display: flex;
  gap: 0 16px;
  direction: row;
  padding: 0 13px;
`;
const ContainerBox = styled.div`
  width: 20rem;
  height: 28rem;
  background: white;
  border: 1px solid lightgray;
  border-radius: 10px;
`;
const EmailIconContainer = styled.div`
  margin: 32px auto 0 auto;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background: ${(props) => (props.active ? '#eb4c60' : '#4aa398')};
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
const DivText = styled.div`
  display: flex;
  direction: row;
  width: 12rem;
`;
const ButtonDiv = styled.div`
  height: 3rem;
  width: 40rem;
  margin: 25px auto;

  cursor: pointer;
  display: flex;
  direction: row;
`;
// const RedButton = styled(Button)`
//   margin: auto;
//   width: 100%;
//   margin-top: 2rem;
// `;
const SwitchDiv = styled.div`
  width: 62px; /* Set the width of the switch */
  height: 30px; /* Set the height of the switch */
  background-color: ${(props) =>
    props.active ? '#ebd1d4' : '#cdf7f2'}; /* Default background color */
  border-radius: 40px; /* Rounded corners */
  border: ${(props) =>
    props.active ? '1px solid #eb4c60' : '1px solid #4aa398'};
  display: flex;
  align-items: center;
  padding: 2px;
  cursor: pointer; /* Add cursor pointer to indicate it's clickable */
  transition: background-color 0.3s ease; /* Add a smooth transition effect */

  /* Styling for the switch button */
  .switch-button {
    width: 21px; /* Set the width of the switch button */
    height: 21px; /* Set the height of the switch button */
    margin: 0px 0 0 2px;
    background-color: ${(props) =>
      props.active ? '#eb4c60' : '#4aa398'}; /* Button color */
    border-radius: 50%; /* Rounded button */
    transition: transform 0.3s ease; /* Add a smooth transition effect for sliding */
    transform: translateX(
      ${(props) => (props.active ? '32px' : '0')}
    ); /* Slide the button when active */
  }
`;
const Text1 = styled.div`
  color: ${(props) => (props.active ? '' : '#4aa398')};
  margin: 0.5rem 1.2rem 0 12rem;
`;
const Text2 = styled.div`
  color: ${(props) => (props.active ? '#eb4c60' : '')};
  margin: 0.5rem 0 0 1.2rem;
`;
const Text3 = styled.div`
  margin-left: 30px;
  margin: 10px 29px;
  color: #eb4c60;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width:
  justify-content: space-between;
`;
function ProfessionalForm11({ handleNextClick }) {
  const [switchActive, setSwitchActive] = useState(false);

  const router = useRouter();
  const toggleSwitch = () => {
    setSwitchActive(!switchActive);
  };

  function submitHandler(event) {
    event.preventDefault();

    handleNextClick(true);
  }
  const Next = () => {
    router.push('/dashboard');
  };

  return (
    <>
      <Container maxWidth="md" sx={{ marginBottom: '2rem', marginTop: '4rem' }}>
        <Text fontSize="35px" fontWeight="bold" marginLeft="10rem">
          Maximize your success earnings!
        </Text>
        <Text marginLeft="20rem" fontSize="13px">
          Try a <span>HINYN</span> Membership to enjoy greater benefits
        </Text>
        <ButtonDiv active={switchActive} onClick={toggleSwitch}>
          <Text1 active={switchActive}>Pay Monthly</Text1>
          {/* Display the switch state */}
          <SwitchDiv active={switchActive}>
            <div className="switch-button"></div>
          </SwitchDiv>
          <Text2 active={switchActive}>Pay Yearly</Text2>
        </ButtonDiv>
        <ContainersMain>
          <ContainerBox>
            <EmailIconContainer>
              <StyledEmailIcon />
            </EmailIconContainer>
            <TextCenter>
              <Text color="green">Trial Membership</Text>
              <DivText>
                <Text fontSize="21px" fontWeight="bold">
                  0 AED
                </Text>
                <Text marginLeft="10px" marginTop="6px" fontSize="15px">
                  /month
                </Text>
              </DivText>
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
            <StyledButton2>
              <Text3>Start Free Trial</Text3>
            </StyledButton2>
          </ContainerBox>
          <ContainerBox>
            <EmailIconContainer active={switchActive}>
              <StyledEmailIcon />
            </EmailIconContainer>
            <TextCenter>
              <Text color="green" marginLeft="20px">
                Professional
              </Text>
              <DivText>
                <Text fontSize="21px" fontWeight="bold" active={switchActive}>
                  {switchActive ? '499 AED' : '60 AED'}
                </Text>
                <Text marginLeft="9px" marginTop="6px" fontSize="15px">
                  /Year
                </Text>
              </DivText>
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
            <StyledButton onClick={Next}>Signup for Today</StyledButton>
          </ContainerBox>
        </ContainersMain>
        <ButtonContainer>
          <Text marginLeft="9rem">
            <BackIcon isabsolute={false} />
            <span style={{ marginLeft: '.5rem' }}>Go Back</span>
          </Text>
        </ButtonContainer>
      </Container>
    </>
  );
}

export default ProfessionalForm11;
