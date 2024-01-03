import styled from '@emotion/styled';
import { SimpleTextField } from './Textfield';
import Text from './Typography';
import { useState } from 'react';
import { GreenButton, RedButton } from '../shared/Button';
import Switch from './Switch';
import { Box, IconButton, InputAdornment } from '@mui/material';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { PhotoIcon, RightArrowIcon } from './Icon';
import Pill2 from './Pill2';

const Wraper = styled.div`
  height: auto;
  padding: 3rem 0 10rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Wraper2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  width: 85%;
`;
const CustomText = styled.div`
  display: flex;
  font-size: 17px;

  color: ${(props) => (props.hovered ? '#eb4c60' : '')};
  background: ${(props) => (props.hovered ? '#f7ebeb' : 'transparent')};
  transition: color 0.3s, background 0.3s;
  cursor: pointer;
  font-weight: ${(props) => (props.hovered ? 'bold' : '')};
  &:hover {
    color: #4aa398;
    background: #e8faf8;
  }
`;
const ContentBox2 = styled.div`
  background: white;
  border-radius: 20px;
  padding: 20px 0;
  width: 24%;
  height: 30%;
`;
const ContentBox3 = styled.div`
  background: white;
  border-radius: 20px;
  padding: 35px 45px;
  width: 72%;
`;
const ContentBox4 = styled.div`
  background: white;
  border-radius: 20px;
  padding: 35px 45px;
  width: 72%;
`;
const InnerView = styled.div`
  margin: 40px 0 0 0;
`;
const Line = styled.div`
  background: #f0f3f4;
  height: 1.5px;
  margin: 18px 0;
`;
const FieldWrap = styled.div`
  display: flex;
  gap: 20px;
`;
const Bdiv = styled.div`
  margin: 50px 0;
  display: flex;
  justify-content: center;
`;
const TextCon = styled.div`
  width: 81%;
  margin: 0 0 10px 0;
`;
const VLine = styled.div`
  width: 6px;
  height: 100%;
  background: #eb4c60;
  margin: auto 0;
`;
const VLine2 = styled.div`
  width: 6px;
  height: 100%;
  background: white;
  margin: auto 0;
`;
const Cover = styled.div`
  display: flex;
  gap: 0 24px;

  height: 50px;
`;
const TextC = styled.div`
  margin: auto 0;
`;
const SwitchWrapper = styled.div`
  gap: 40px;
  display: flex;
  margin: 20px 0;
`;
const ConInput = styled.div`
  margin: 10px;
`;
const Score = styled.div`
  background: #d8e8e6;
  border-radius: 11px;
  margin: 30px auto;
  display: flex;
  width: 23rem;
  padding: 7px 18px;
  gap: 11px;
`;
const ScoreDiv = styled.div`
  border-radius: 4px;
  display: flex;
  background: white;
  padding: 6px 30px;
  color: #c5e8e4;
  gap: 8px;
  font-size: 17px;
  align-items: center;
`;
const Verdiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;
const TextDivV = styled.div`
  display: flex;
  gap: 22px;
`;
const VerWrap = styled.div`
  gap: 20px;
`;
const Item = styled.div`
  border: 1px solid #d8d8d8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background: #fcfcfc;
  border-radius: 24px;
  column-gap: 2rem;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${(props) => (props.type === 'client' ? '#FDEAEF' : '#ECF6F5')};
    border: ${(props) =>
      props.type === 'client' ? '1px solid #EB4C60' : '1px solid #4AA398'};

    .right-arrow {
      opacity: 1;
    }
  }
`;
const StyledRightArrowIcon = styled(RightArrowIcon)`
  opacity: 0;
`;
const TypeDiv = styled.div`
  display: flex;
  margin: 20px 0;
  gap: 20px;
  width: 70%;
`;
const PillDiv = styled.div`
  width: 24%;
`;
const ParaDiv = styled.div`
  background: #f7f5f5;
  border-radius: 12px;
  padding: 23px 34px;
  margin: 40px 0;
`;
function Settings() {
  const [selectedTab, setSelectedTab] = useState('Profile');
  const [pwValues, setPWValues] = useState({
    password: '',
    showPassword: false,
    confirmPassword: '',
    showConfirmPassword: false,
  });
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };
  const handleClickShowConfirmPassword = () => {
    setPWValues({
      ...pwValues,
      showConfirmPassword: !pwValues.showConfirmPassword,
    });
  };
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Wraper>
      <TextCon>
        <Text color="green" size="xl" font="bold">
          Settings
        </Text>
      </TextCon>
      <Wraper2>
        <ContentBox2 sx={{}}>
          <a onClick={() => handleTabClick('Profile')}>
            <CustomText hovered={selectedTab === 'Profile'}>
              <Cover>
                {selectedTab === 'Profile' ? (
                  <VLine></VLine>
                ) : (
                  <VLine2></VLine2>
                )}

                <TextC>Profile</TextC>
              </Cover>
            </CustomText>
          </a>
          <a onClick={() => handleTabClick('Email')}>
            <CustomText hovered={selectedTab === 'Email'}>
              <Cover>
                {selectedTab === 'Email' ? <VLine></VLine> : <VLine2></VLine2>}

                <TextC> Email & Notifications</TextC>
              </Cover>
            </CustomText>
          </a>
          <a onClick={() => handleTabClick('Password')}>
            <CustomText hovered={selectedTab === 'Password'}>
              <Cover>
                {selectedTab === 'Password' ? (
                  <VLine></VLine>
                ) : (
                  <VLine2></VLine2>
                )}

                <TextC> Password</TextC>
              </Cover>
            </CustomText>
          </a>
          <a onClick={() => handleTabClick('Trust')}>
            <CustomText hovered={selectedTab === 'Trust'}>
              <Cover>
                {selectedTab === 'Trust' ? <VLine></VLine> : <VLine2></VLine2>}

                <TextC> Trust & Verification</TextC>
              </Cover>
            </CustomText>
          </a>
          <a onClick={() => handleTabClick('Account')}>
            <CustomText hovered={selectedTab === 'Account'}>
              <Cover>
                {selectedTab === 'Account' ? (
                  <VLine></VLine>
                ) : (
                  <VLine2></VLine2>
                )}

                <TextC>Account</TextC>
              </Cover>
            </CustomText>
          </a>
        </ContentBox2>
        {selectedTab === 'Profile' ? (
          <ContentBox3 sx={{}}>
            <Text color="red" size="large" font="bold">
              Name
            </Text>
            <Line></Line>
            <FieldWrap>
              <div style={{ width: '100%' }}>
                <Text color="green" size="md">
                  First Name
                </Text>
                <SimpleTextField />
              </div>
              <div style={{ width: '100%' }}>
                <Text color="green" size="md">
                  Last Name
                </Text>
                <SimpleTextField />
              </div>
            </FieldWrap>
            <InnerView>
              <Text color="red" size="large" font="bold">
                Address
              </Text>
              <Line></Line>
              <Text color="green" size="md">
                Address Line 1
              </Text>
              <SimpleTextField />
              <Text color="green" size="md" sx={{ marginTop: '20px' }}>
                City / Town
              </Text>
              <SimpleTextField />
              <FieldWrap>
                <div style={{ width: '100%' }}>
                  <Text color="green" size="md" sx={{ marginTop: '20px' }}>
                    Zip / Postal Code
                  </Text>
                  <SimpleTextField />
                </div>
                <div style={{ width: '100%' }}>
                  <Text color="green" size="md" sx={{ marginTop: '20px' }}>
                    State / Region
                  </Text>
                  <SimpleTextField />
                </div>
              </FieldWrap>
              <Text color="green" size="md" sx={{ marginTop: '20px' }}>
                Country
              </Text>
              <SimpleTextField />
              <FieldWrap>
                <div style={{ width: '100%' }}>
                  <Text color="green" size="md" sx={{ marginTop: '20px' }}>
                    Timezone
                  </Text>
                  <SimpleTextField />
                </div>
                <div style={{ width: '100%' }}>
                  <Text color="green" size="md" sx={{ marginTop: '20px' }}>
                    Location
                  </Text>
                  <SimpleTextField />
                </div>
              </FieldWrap>
              <Text
                color="red"
                size="large"
                font="bold"
                sx={{ marginTop: '40px' }}
              >
                Contact Details
              </Text>
              <Line></Line>
              <Text color="green" size="md">
                Phone Number
              </Text>
              <SimpleTextField />
              <Bdiv>
                <GreenButton>Submit</GreenButton>
              </Bdiv>
            </InnerView>
          </ContentBox3>
        ) : selectedTab === 'Email' ? (
          <ContentBox4>
            <Text color="red" size="large" font="bold">
              Email
            </Text>
            <Line></Line>
            <FieldWrap>
              <div style={{ width: '100%' }}>
                <Text color="green" size="md">
                  Email
                </Text>
                <SimpleTextField />
              </div>
              <div style={{ width: '100%', marginBottom: '20px' }}>
                <Text color="green" size="md">
                  Password
                </Text>
                <SimpleTextField />
              </div>
            </FieldWrap>
            {/* <GreenButton>Update Email Address</GreenButton> */}
            <PillDiv>
              {' '}
              <Pill2 title="Update Email Address" color="green" />
            </PillDiv>

            <Text
              color="red"
              size="large"
              font="bold"
              sx={{ marginTop: '50px' }}
            >
              Notifications
            </Text>
            <Line></Line>
            <SwitchWrapper>
              <Switch />
              <Text size="large">Messages</Text>
            </SwitchWrapper>
            <SwitchWrapper>
              <Switch />
              <Text size="large">Bid updates</Text>
            </SwitchWrapper>
            <SwitchWrapper>
              <Switch />
              <Text size="large">Projects that match my selected skills</Text>
            </SwitchWrapper>
            <SwitchWrapper>
              <Switch />
              <Text size="large">Marketing Emails</Text>
            </SwitchWrapper>
          </ContentBox4>
        ) : selectedTab === 'Password' ? (
          <ContentBox4>
            <Text color="red" size="large" font="bold">
              Password
            </Text>
            <Line></Line>
            <Text color="green" size="md" marginTop="30px">
              Current Password
            </Text>
            <SimpleTextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ConInput>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                      >
                        {pwValues.showConfirmPassword ? (
                          <FiEyeOff />
                        ) : (
                          <FiEye />
                        )}
                      </IconButton>
                    </ConInput>
                  </InputAdornment>
                ),
              }}
            />
            <Text color="green" size="md" marginTop="30px">
              New Password
            </Text>
            <SimpleTextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ConInput>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                      >
                        {pwValues.showConfirmPassword ? (
                          <FiEyeOff />
                        ) : (
                          <FiEye />
                        )}
                      </IconButton>
                    </ConInput>
                  </InputAdornment>
                ),
              }}
            />
            <Text color="green" size="md" marginTop="30px">
              Confirm Password
            </Text>
            <SimpleTextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ConInput>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                      >
                        {pwValues.showConfirmPassword ? (
                          <FiEyeOff />
                        ) : (
                          <FiEye />
                        )}
                      </IconButton>
                    </ConInput>
                  </InputAdornment>
                ),
              }}
            />
            <Bdiv>
              <GreenButton>Submit</GreenButton>
            </Bdiv>
          </ContentBox4>
        ) : selectedTab === 'Trust' ? (
          <ContentBox4>
            <Text color="red" size="large" font="bold">
              Trust & Verification
            </Text>
            <Line></Line>
            <Text color="green" size="large" marginTop="30px">
              What is a trust score?
            </Text>
            <Text color="gray" marginTop="30px" size="smd">
              The Trust score typically refers to a numerical value or rating
              assigned to an entity, such as a user, website, or transaction, to
              indicate the level of trustworthiness or reliability associated
              with that entity. Trust scores are often used in various online
              platforms and systems to assess the credibility and
              trustworthiness of users or entities based on their behavior,
              history, and other relevant factors.
            </Text>
            <Score>
              <Text size="smd" color="green" font="bold" marginY="auto">
                Your Trust Score
              </Text>
              <ScoreDiv>
                <Text color="green" size="xl" font="bold">
                  45
                </Text>{' '}
                LOW
              </ScoreDiv>
            </Score>
            <VerWrap>
              <Verdiv>
                <Text size="smd">Phone Number</Text>{' '}
                <TextDivV>
                  <Text marginY="auto" color="green" size="smd">
                    VERIFIED
                  </Text>{' '}
                  <RedButton>25 POINTS</RedButton>
                </TextDivV>
              </Verdiv>
              <Verdiv>
                <Text size="smd">Email</Text>{' '}
                <TextDivV>
                  <Text marginY="auto" color="green" size="smd">
                    VERIFIED
                  </Text>{' '}
                  <RedButton>25 POINTS</RedButton>
                </TextDivV>
              </Verdiv>
              <Verdiv>
                <Text size="smd">Identity Document</Text>{' '}
                <TextDivV>
                  <Text marginY="auto" color="green" size="smd">
                    VERIFIED
                  </Text>{' '}
                  <RedButton>25 POINTS</RedButton>
                </TextDivV>
              </Verdiv>
              <Verdiv>
                <Text size="smd">Credit Card / Debit Card</Text>{' '}
                <TextDivV>
                  <Text marginY="auto" color="green" size="smd">
                    VERIFIED
                  </Text>{' '}
                  <RedButton>25 POINTS</RedButton>
                </TextDivV>
              </Verdiv>
            </VerWrap>
          </ContentBox4>
        ) : selectedTab === 'Account' ? (
          <ContentBox4>
            <Text color="red" size="large" font="bold">
              Account
            </Text>
            <Line></Line>
            <Text color="green" size="l2" marginTop="30px">
              Account Type
            </Text>
            <TypeDiv>
              {' '}
              <Item type="client">
                <PhotoIcon variant="red" fontSize={'2.5rem'} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Text className="title">
                    <b>Client</b>
                  </Text>
                  <Text>I want to hire</Text>
                </Box>
                <StyledRightArrowIcon variant="red" className="right-arrow" />
              </Item>
              <Item type="professional">
                <PhotoIcon variant="green" fontSize={'2.5rem'} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Text className="title">
                    <b>Professional</b>
                  </Text>
                  <Text>I want to work</Text>
                </Box>
                <StyledRightArrowIcon variant="green" className="right-arrow" />
              </Item>
            </TypeDiv>
            <Text color="red" size="large" font="bold">
              Deactivate or Delete Account
            </Text>
            <Line></Line>
            <ParaDiv>
              <Text size="smd" font="bold">
                Deactivate
              </Text>
              <Text color="gray" sx={{ marginY: '16px' }}>
                Deactivating your account will cause your profile and listings
                to disappear, and you will not receive any notifications from
                us. This can be undone later.
              </Text>
              <PillDiv>
                <Pill2 title="Deactivate my account" color="green" />
              </PillDiv>
            </ParaDiv>
            <ParaDiv>
              <Text size="smd" font="bold">
                Delete
              </Text>
              <Text color="gray" sx={{ marginY: '16px' }}>
                Delete your account will cause your profile and listings to
                disappear, and you will not receive any notifications from us.
                This can be undone later.
              </Text>
              <PillDiv>
                <Pill2 title="Delete my account" color="green" />
              </PillDiv>
            </ParaDiv>
          </ContentBox4>
        ) : (
          ''
        )}
      </Wraper2>
    </Wraper>
  );
}

export default Settings;
