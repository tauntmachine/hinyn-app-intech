import styled from '@emotion/styled';
import { Box } from '@mui/material';

import { useState, useEffect } from 'react';
import Logo2 from '../shared/Logo2';
import { BellIcon, ChatIcon, CloseIconCircle, EmailIcon } from '../shared/Icon';
import Button from '../shared/Button';
import Text from '../shared/Typography';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { logoutUser } from '../forms/formService';
import { getLoggedInUserData } from '../forms/formService';
import { FaBars, FaTimes } from 'react-icons/fa';
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
const Head = styled.div`
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: ${(props) => (props.account == 1 ? '93%' : '85%')};
`;
const LoginContainer = styled.div`
  display: flex;
  column-gap: ${(props) => (props.account == 1 ? '1rem' : '2.4rem')};
  align-items: center;
  padding-left: 20px;
  @media (max-width: 768px) {
    display: none;
  }
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

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
  gap: 30px;
  bottom: -1rem;
  position: relative;
  margin-left: 2rem;
  @media (max-width: 769px) {
    margin-left: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
    bottom: 0;
    padding: 10px 0;
  }
`;

const TabItem = styled.div`
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;
  &.active {
    color: ${(props) => (props.account === 1 ? '#4AA398' : '#ff5a5f')};
  }
  @media (max-width: 769px) {
    padding: 16px 0;
    &.active {
      font-weight: bold;
      border-bottom: 1px solid #a7d4ce;
      color: ${(props) => (props.account === 1 ? '#4AA398' : '#ff5a5f')};
    }
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

const TopBar = styled.div`
  background: #4aa398;
  height: 50px;
  padding: 0 8rem;
  width: 100%;
  @media (max-width: 768px) {
    display: none;
  }
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

const CustomText = styled.div`
  padding: 13px 20px;
  color: ${(props) => (props.hovered ? '#eb4c60' : '')};
  background: ${(props) => (props.hovered ? '#f5f5f5' : 'transparent')};
  transition: color 0.3s, background 0.3s;

  &:hover {
    color: #eb4c60;
    background: #ffedef;
    cursor: pointer;
  }
`;
const Line = styled.div`
  width: 100%;
  background: ${(props) => (props.account === 1 ? '#4AA398' : '#eb4c60')};
  height: 3px;
`;
const Line2 = styled.div`
  width: 70%;
  background: #eb4c60;
  height: 0.5px;
  opacity: 0.3;
  margin: auto;
`;
const MobileMenuIcon = styled(FaBars)`
  font-size: 24px;
  cursor: pointer;

  @media (min-width: 769px) {
    display: none; // Hide the icon on larger screens
  }
`;
const MobileMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  // top: 0;
  width: 100%;
  padding: 1px 1px;
  background-color: #fff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  background: white;
  border-top: 1px solid #a6a6a6;
  @media (min-width: 769px) {
    display: none;
  }
`;

const CustomPhoneText = styled.div`
  padding: 18px 30px;
  width: 100%;
  background: #ebebeb;
  cursor: pointer;
  color: #4aa398;
`;
const LinkText = styled.div`
  cursor: pointer;

  &:hover {
    color: #4aa398;
  }
`;
const BurgerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 769px) {
    display: none;
  }
`;
const BoxCon = styled.div`
  display: flex;
  gap: 3rem;
  @media (max-width: 769px) {
    display: none;
  }
`;
const CloseIcon = styled(FaTimes)`
  font-size: 24px;
  cursor: pointer;
  display: ${(props) => (props.isMobileMenuOpen ? 'block' : 'none')};
`;
const BoxCustom = styled.div`
  width: 100%;
`;
const CustomTextPhone = styled.div``;
function DashboardHeader({ currentTab, setTabChange, account }) {
  const imgpath = '/assets/img/avatars/';
  const [userData, setUserData] = useState({});

  const [hover, setHover] = useState(false);

  const router = useRouter();

  const showUserProfile = () => {
    if (account === 1) router.push('/dashboard/professionalProfile?val=' + 0);
    else router.push('/dashboard/clientProfile');
  };
  const showSettings = () => {
    // if (account === 1)
    router.push('/dashboard/professionalProfile?val=' + 1);
    // else
    // router.push('/dashboard/');
  };
  const showWallet = () => {
    // if (account === 1)
    router.push('/dashboard/professionalProfile?val=' + 2);
    // else
    // router.push('/dashboard/');
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
        }
      });
    }
  }, []);

  const professionalTabs = ['Dashboard', 'Browse', 'My Projects'];

  const clientTabs = ['Dashboard', 'Browse', 'My Freelancers', 'My Projects'];

  const showTabs = (account) => {
    const tabs =
      account === 1
        ? professionalTabs
        : account === 2
        ? clientTabs
        : clientTabs;

    return (
      <Tabs>
        {tabs.map((tabName, idx) => (
          <TabItem
            key={'tab-' + idx}
            account={account} // Pass the account prop here
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
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  const showForm = (form) => {
    setOpen(true);
    setCurrentForm(form);
  };
  const handleLogging = () => {
    if (isLoggedIn) logoutUser();
    else showForm('login');
    setIsLoggedIn(() => !isLoggedIn);
    return localStorage.getItem('hinyn-cjwt') ? true : false;
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
        <Head>
          <BoxCustom>
            <BurgerHeader>
              <Logo2 />
              {isMobileMenuOpen ? (
                <CloseIcon
                  onClick={closeMobileMenu}
                  isMobileMenuOpen={isMobileMenuOpen}
                />
              ) : (
                <MobileMenuIcon
                  onClick={handleMobileMenuToggle}
                  isMobileMenuOpen={isMobileMenuOpen}
                />
              )}
            </BurgerHeader>
            <BoxCon>
              <Logo2 />
              {showTabs(account)}
            </BoxCon>
          </BoxCustom>
          <LoginContainer>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '20px',
                gap: '20px',
                paddingRight: '20px',
                borderRight: '2px solid #E3E3E3',
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

                <CustomText hover={hover} onClick={showSettings}>
                  Settings
                </CustomText>
                <CustomText hover={hover} onClick={showWallet}>
                  Wallet
                </CustomText>
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
      {isMobileMenuOpen ? (
        <MobileMenuContainer id="mobileMenuContainer">
          {showTabs(account)}
        </MobileMenuContainer>
      ) : (
        ''
      )}
    </>
  );
}

export default DashboardHeader;
