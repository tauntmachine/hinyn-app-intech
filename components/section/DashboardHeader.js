import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Container } from '@mui/system';
import { useState, useEffect } from 'react';
import Logo2 from '../shared/Logo2';
import {
  BellIcon,
  ChatIcon,
  CloseIconCircle,
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
  width: 88%;
`;
const LoginContainer = styled.div`
  display: flex;
  column-gap: 1rem;
  align-items: center;
  padding-left: 20px;
  justify-content: space-between;
`;
const LoginHoverBox = styled.div`
  background: green;
  position: absolute;
  top: 100%; /* Position it below the parent element */
  left: 0;
  width: 100%;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.3s, opacity 0.3s;
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
    border-bottom: 4px solid #ff5a5f;
    color: #ff5a5f;
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
  margin: 2px 23px;
`;
const Text3 = styled.div`
  color: white;
  font-size: 10px;
  padding: 10px 25px;
  border: 1px solid white;
  border-radius: 40px;
`;
const StyledCloseIcon = styled(CloseIconCircle)`
  color: #525252;
  font-size: 25px;
  cursor: pointer;
  margin: auto 20px;
`;

function DashboardHeader({ currentTab, setTabChange }) {
  const imgpath = '/assets/img/avatars/';
  const [userData, setUserData] = useState({});
  const [accountType, setAccountType] = useState(1);
  const [hover, setHover] = useState(false);
  const router = useRouter();

  const showUserProfile = () => {
    if (accountType === 2) router.push('/dashboard/professionalProfile');
    else router.push('/dashboard/clientProfile');
  };
  const loginHover = () => {
    setHover(true);
  };

  const showBrowseProjects = () => {
    router.push('/dashboard?screen=browse');
  };

  const showPostProject = () => {
    router.push('/dashboard/client/postProject');
  };

  const handleLogoutUser = () => {
    logoutUser();
    router.push('index');
  };

  // useEffect(() => {
  //   const clientId = localStorage.getItem('hinyn-cid');
  //   if(clientId){
  //     getLoggedInUserData().then((res)=>{
  //       if(res.data){
  //         setUserData(()=>res.data?.client)
  //         setAccountType(()=>res.data?.client?.accountType)
  //       }
  //     })
  //   }
  // }, [])

  const professionalTabs = ['Dashboard', 'Browse', 'My Projects'];

  const clientTabs = ['Dashboard', 'Browse', 'My Freelancers', 'My Projects'];

  const showTabs = () => {
    const tabs = accountType === 2 ? professionalTabs : clientTabs;
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
    if (accountType === 2)
      return (
        <GreenButton onClick={() => showBrowseProjects()}>
          Place a bid
        </GreenButton>
      );
    else
      return (
        <Button width="10rem" onClick={() => showPostProject()}>
          Post a Project
        </Button>
      );
  };

  return (
    <>
      <TopBar>
        <Box display="flex">
          <Box padding="10px" marginLeft="8rem">
            <Box display="flex">
              <ChatIcon />
              <Text1>Email verification required</Text1>
            </Box>
            <Text2>
              To activate your account, please click 'verify your email adresss'
              on the Emial we sent to <span>samantha12@gmail.com</span>
            </Text2>
          </Box>
          <Box paddingY="8px" marginLeft="44rem" display="flex">
            <Text3>Resend Email</Text3>
            <StyledCloseIcon color="white" />
          </Box>
        </Box>
      </TopBar>
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
                <BellIcon />
                <ChatIcon />
              </Box>
            </Box>
          </Box>
          <LoginContainer onFocus={loginHover}>
            {showCTAButton()}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <ImageContainer onClick={() => showUserProfile()}>
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
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Text color={accountType === 2 ? 'green' : 'red'}>
                  Hi, Steve
                </Text>
                <Text>
                  {userData?.cash?.toLocaleString() ?? ''} {'$49,320 USD'}
                </Text>
              </Box>
              <Box>
                <StyledLogoutIcon onClick={handleLogoutUser} />
              </Box>
            </Box>
          </LoginContainer>
          {/* <LoginHoverBox></LoginHoverBox> */}
        </Head>
      </CustomBox>
    </>
  );
}

export default DashboardHeader;
