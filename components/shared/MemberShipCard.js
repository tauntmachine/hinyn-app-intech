import Text from '../shared/Typography';
import styled from '@emotion/styled';
import { LockIcon } from '../shared/Icon';
import { BiCheckCircle } from 'react-icons/bi';
import { Button } from '../shared/Button';
import { BsFillCheckCircleFill } from 'react-icons/bs';

const StyledButton = styled.div`
  margin: 2rem auto;

  width: 11rem;
  background: linear-gradient(104deg, #ff5a5f 0%, #a52226 100%);
  color: white;
  border-radius: 40px;
  cursor: pointer;
`;
const ContainerBox = styled.div`
  height: 28rem;
  background: white;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 35px 22px;
`;
const EmailIconContainer = styled.div`
  margin: auto;
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
const StyledCheckIcon = styled(BsFillCheckCircleFill)`
  color: #4aa398;
  font-size: 16px;
`;
// const StyledCheckIcon2 = styled(BsFillCheckCircleFill)`
//   color: #b5b5b5;
// `;
const TextCenter = styled.div`
  width: 11rem;
  margin: auto;
  padding: 9px 0;
`;
const IconText = styled.div`
  display: flex;
  direction: row;
  margin: 6px 2rem;
`;

const DivText = styled.div`
  display: flex;
  flex-direction: row;
  width: 12rem;
  margin-left: 10px;
`;

const StyledButton2 = styled.div`
  margin: 2rem auto;
  width: 11rem;
  background: white;
  border: 1px solid #eb4c60;
  border-radius: 40px;
  cursor: pointer;
`;
const Text3 = styled.div`
  margin-left: 30px;
  margin: 10px 29px;
  color: #eb4c60;
`;
const Text4 = styled.div`
  padding: 11px 25px;
`;
const IconsCon = styled.div`
  width: 18rem;
`;
const TextCon = styled.div`
  width: 8rem;
  margin-left: 16px;
  margin-top: 3px;
`;
const MainTextCon = styled.div`
  margin: auto;
  width: 11rem;
`;
export default function MemberShipCard({
  onClick,
  Title,
  Amount,
  Time,
  btn,
  btnText,
}) {
  return (
    <>
      <ContainerBox>
        <EmailIconContainer>
          <StyledEmailIcon />
        </EmailIconContainer>
        <TextCenter>
          <MainTextCon>
            <TextCon>
              <Text color="green" style={{ fontWeight: 'semibold' }}>
                {Title}
              </Text>
            </TextCon>

            <DivText>
              <Text size="large" fontWeight="bold">
                {Amount} AED
              </Text>
              <Text
                marginLeft="10px"
                marginTop="6px"
                fontSize="14px"
                fontWeight="bold"
              >
                /{Time}
              </Text>
            </DivText>
          </MainTextCon>
        </TextCenter>
        <IconsCon>
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
        </IconsCon>
        {/* <ButtonOuline>Start Free Trial</ButtonOuline> */}
        {btn === 'true' ? (
          <StyledButton>
            <Text4>
              <a href="https://secure.telr.com/gateway/ql/RelityGroup_736370.html">
                {btnText}
              </a>
            </Text4>
          </StyledButton>
        ) : (
          <StyledButton2 onClick={onClick}>
            <Text3>Start Free Trial</Text3>
          </StyledButton2>
        )}
      </ContainerBox>
    </>
  );
}
