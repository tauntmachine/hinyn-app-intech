import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Container } from '@mui/system';
import { useState, useEffect } from 'react';
import Logo2 from '../shared/Logo2';
import {
  BellIcon,
  ChatIcon,
  CloseIconCircle,
  EmailIcon,
  LogoutIcon,
} from '../shared/Icon';
import Button, { GreenButton } from '../shared/Button';
import Text from '../shared/Typography';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { logoutUser } from '../forms/formService';
import { getLoggedInUserData } from '../forms/formService';

const CustomBox = styled(Box)`
  box-shadow: 0px 3px 6px #00000029;
  background: #ebebeb;
  height: auto;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;
const Head = styled(Container)`
  display: grid;
  grid-template-columns: 4fr 2fr;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: ${(props) => (props.account == 1 ? '100%' : '88%')};
`;
const LoginContainer = styled.div`
  display: flex;
  column-gap: ${(props) => (props.account == 1 ? '1rem' : '2.4rem')};
  align-items: center;
  padding-left: 20px;
  
 =
`;
const LoginHoverBox = styled.div`
  background: white;
  position: absolute;
  top: 100%;
  width: 16rem;
  visibility: ${(props) => (props.hover ? '' : 'hidden')};
  opacity: ${(props) => (props.hover ? '1' : '0.6')};
  transition: 0.3s;
  paddding: 2px 0;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const LinkText = styled.div`
  cursor: pointer;

  &:hover {
    color: #eb4c60;
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
  gap: 20px;
  bottom: -1rem;
  position: relative;
  margin-left: 2rem;
`;

const TabItem = styled.div`
  cursor: pointer;
  font-weight: ;

  &.active {
    // border-bottom: 4px solid #ff5a5f;
    border-bottom: ${(props) =>
      props.account == 1 ? ' 4px solid #4AA398' : ' 4px solid #ff5a5f'};
    color: ${(props) => (props.account == 1 ? '  #4AA398' : '  #ff5a5f')};
  }
`;

const ImageContainer = styled.div`
  width: 3rem;
  height: 3rem;
  position: relative;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0px 3px 6px #00000029;
  cursor: pointer;
`;
const StyledImage = styled(Image)`
  border-radius: 50%;
`;

const StyledLogoutIcon = styled(LogoutIcon)`
  font-size: 1.5rem;
  cursor: pointer;
`;
const TopBar = styled.div`
  background: #4aa398;
  height: 50px;
  padding: 0 8rem;
  width: 100%;
`;
const Text1 = styled.div`
  color: white;
  font-size: 12.5px;
  margin-left: 8px;
`;
const Text2 = styled.div`
  color: white;
  font-size: 10px;
  margin: 2px 27px;
`;
const Text3 = styled.div`
  color: white;
  font-size: 10px;
  padding: 9px 25px;
  border: 1px solid white;
  border-radius: 40px;
`;
const Text3Con = styled.div`
  margin: auto;
`;
const StyledCloseIcon = styled(CloseIconCircle)`
  color: #525252;
  font-size: 25px;
  cursor: pointer;
  margin: auto 20px;
`;
const Box2 = styled.div`
  display: flex;
  align-items: center;
`;
const Box3 = styled.div`
  display: flex;
`;
const IconsDiv = styled.div`
  width: 30rem;
  background: green;
`;
const CustomText = styled.div`
  padding: 13px 20px;
  color: ${(props) => (props.hovered ? '#eb4c60' : '')};
  background: ${(props) => (props.hovered ? '#f5f5f5' : 'transparent')};
  transition: color 0.3s, background 0.3s;

  &:hover {
    color: #eb4c60;
    background: #ffedef;
  }
`;
const Line = styled.div`
  width: 100%;
  background: #eb4c60;
  height: 3px;
`;
const Line2 = styled.div`
  width: 70%;
  background: #eb4c60;
  height: 0.5px;
  opacity: 0.3;
  margin: auto;
`;
const ContainerHover = styled.div`
  width: 15rem;
`;
function DashboardHeader({ currentTab, setTabChange, account }) {
  const imgpath = '/assets/img/avatars/';
  const [userData, setUserData] = useState({});
  // const [account, setaccount] = useState(account);
  const [hover, setHover] = useState(false);

  const router = useRouter();

  const showUserProfile = () => {
    if (account === 1) router.push('/dashboard/professionalProfile');
    else router.push('/dashboard/clientProfile');
  };
  const loginHover = () => {
    setHover(true);
  };

  const loginHoverOut = () => {
    setHover(false);
  };
  const showBrowseProjects = () => {
    router.push('/dashboard?screen=browse');
  };

  const showPostProject = () => {
    router.push('/dashboard/client/postProject');
  };

  const handleLogoutUser = () => {
    logoutUser();
    router.push('/');
  };

  useEffect(() => {
    const clientId = localStorage.getItem('hinyn-cid');
    if (clientId) {
      getLoggedInUserData().then((res) => {
        if (res.data) {
          setUserData(() => res.data.client);
          // setaccount(() => res.data?.client?.account);
          // console.log(account);
        }
      });
    }
  }, []);

  const professionalTabs = ['Dashboard', 'Browse', 'My Projects'];

  const clientTabs = ['Dashboard', 'Browse', 'My Freelancers', 'My Projects'];

  const showTabs = () => {
    const tabs = account === 1 ? professionalTabs : clientTabs;
    return (
      <Tabs>
        {tabs.map((tabName, idx) => (
          <TabItem
            key={'tab-' + idx}
            className={idx === currentTab ? 'active' : ''}
            onClick={() => setTabChange(idx)}
          >
            {tabName}
          </TabItem>
        ))}
      </Tabs>
    );
  };

  const showCTAButton = () => {
    if (account === 1) '';
    else
      return (
        <Button width="11rem" onClick={() => showPostProject()}>
          Post a Project
        </Button>
      );
  };

  return (
    <>
      {currentTab == 0 ? (
        <TopBar>
          <Box display="flex" justifyContent="space-between">
            <Box padding="10px">
              <Box2>
                <EmailIcon color="white" fontSize="20px" />
                <Text1>Email verification required</Text1>
              </Box2>
              <Text2>
                To activate your account, please click verify your email adresss
                on the Emial we sent to
                <span>samantha12@gmail.com</span>
              </Text2>
            </Box>
            <Box3>
              <Text3Con>
                <Text3>Resend Email</Text3>
              </Text3Con>

              <StyledCloseIcon color="white" />
            </Box3>
          </Box>
        </TopBar>
      ) : null}
      <CustomBox>
        <Head maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              borderRight: '1px solid #E3E3E3',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Logo2 />
              {showTabs()}
            </Box>
            {/* {account === 1 ? <IconsDiv></IconsDiv> : ''} */}
          </Box>
          <LoginContainer>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '20px',
                gap: '20px',
                paddingRight: '20px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '20px',
                  gap: '20px',
                }}
              >
                {/* <IconsDiv> */}
                <BellIcon />
                <ChatIcon />
                {/* </IconsDiv> */}
              </Box>
            </Box>
            {showCTAButton()}

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                cursor: 'pointer',
                marginLeft: '26px',
              }}
              onMouseEnter={loginHover}
              onMouseLeave={loginHoverOut}
            >
              <ImageContainer>
                <StyledImage
                  src={
                    userData?.displayPhoto
                      ? imgpath + userData?.displayPhoto
                      : imgpath + 'img-avatar1.png'
                  }
                  layout="fill"
                  alt="icon-img"
                />
              </ImageContainer>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '8rem',
                }}
              >
                <Text color={account === 1 ? 'green' : 'red'}>
                  <b> Hi, {userData?.firstName}!</b>
                </Text>
                <Text>
                  {userData?.cash?.toLocaleString() ?? ''} {'$49,320 USD'}
                </Text>
              </Box>
              <LoginHoverBox hover={hover}>
                <Line></Line>
                <a onClick={showUserProfile}>
                  {' '}
                  <CustomText hover={hover}>Profile</CustomText>
                </a>

                <CustomText hover={hover}>Settings</CustomText>
                <CustomText hover={hover}>Wallet</CustomText>
                <CustomText hover={hover}>Support</CustomText>
                <Line2></Line2>
                <a onClick={handleLogoutUser}>
                  <CustomText hover={hover}>Logout</CustomText>
                </a>
              </LoginHoverBox>
            </Box>
          </LoginContainer>
        </Head>
      </CustomBox>
    </>
  );
}

export default DashboardHeader;
