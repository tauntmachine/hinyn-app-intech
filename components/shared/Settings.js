import ContentBox from './ContentBox';
import styled from '@emotion/styled';
import { SimpleTextField } from './Textfield';
import Text from './Typography';
import { useState } from 'react';
import { GreenButton } from '../shared/Button';
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
  padding: 13px 30px;
  color: ${(props) => (props.hovered ? '#eb4c60' : '')};
  background: ${(props) => (props.hovered ? '#f5f5f5' : 'transparent')};
  transition: color 0.3s, background 0.3s;
  cursor: pointer;
  &:hover {
    color: #eb4c60;
    background: #ffedef;
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
function Settings() {
  const [hover, setHover] = useState(false);

  const Profile = () => {};
  return (
    <Wraper>
      <TextCon>
        <Text color="green" size="xl" font="bold">
          Settings
        </Text>
      </TextCon>
      <Wraper2>
        <ContentBox2 sx={{}}>
          <a onClick={Profile}>
            <CustomText hover={hover}>Profile</CustomText>
          </a>
          <a onClick={Profile}>
            <CustomText hover={hover}>Profile</CustomText>
          </a>
          <a onClick={Profile}>
            <CustomText hover={hover}>Profile</CustomText>
          </a>
          <a onClick={Profile}>
            <CustomText hover={hover}>Profile</CustomText>
          </a>
          <a onClick={Profile}>
            <CustomText hover={hover}>Profile</CustomText>
          </a>
        </ContentBox2>
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
                <Text color="green" size="md">
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
                <Text color="green" size="md">
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
      </Wraper2>
    </Wraper>
  );
}

export default Settings;
