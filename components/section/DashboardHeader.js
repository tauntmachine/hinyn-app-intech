import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import Logo from "../shared/Logo";
import { BellIcon, ChatIcon } from "../shared/Icon";
import { GreenButton } from "../shared/Button";
import Text from "../shared/Typography";
import Image from "next/image";


const CustomBox = styled(Box)`
  box-shadow: 0px 3px 6px #00000029;
  background: #EBEBEB;
  height: auto;
  padding: 1rem 0;
  position: sticky;
  top:0;
  left:0;
  right: 0;
  z-index: 10;
`
const Head = styled(Container)`
  display: grid;
  grid-template-columns: 4fr 2fr;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`
const LoginContainer = styled.div`
  display: flex;
  column-gap: 1rem;
  align-items: center;
  padding-left: 20px;
  justify-content: space-between;
`
const LinkText = styled.div`
  cursor: pointer;

  &:hover{
    color: #EB4C60;
  }
`

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    text-align: center;
    gap:50px;
    bottom: -1rem;
    position: relative;
    margin-left: 2rem;
`

const TabItem = styled.div`
    cursor: pointer;

    &.active{
        border-bottom: 4px solid #4AA398;
        color: #4AA398;
    }
`

const ImageContainer = styled.div`
    width: 3rem;
    height: 3rem;
    position: relative;
    background: #ffffff;
    border-radius: 50%;
    box-shadow: 0px 3px 6px #00000029;
`
const StyledImage = styled(Image)`
    border-radius: 50%;
`

const professionalTabs = [
    'Dashboard',
    'Browse',
    'My Projects'
]



function DashboardHeader({currentTab,setTabChange}) {
  
  let imgpath = '/assets/img/avatars/';

  const userData = {
    name: 'Samantha',
    cash: 123456,
    currency: 'USD',
    photo:'img-avatar1.png'
  }

  return (
    <>
    <CustomBox>
      <Head maxWidth="xl">
        <Box sx={{display:'flex',justifyContent:'space-between',borderRight:'1px solid #E3E3E3'}}>
            <Box sx={{display:'flex'}}>
                <Logo />
                <Tabs>
                { professionalTabs.map((tabName,idx) => (
                    <TabItem key={'tab-'+idx} className={idx===currentTab ? "active" : ""} onClick={()=>setTabChange(idx)}>{ tabName} </TabItem>
                ))
                }
                </Tabs>
            </Box>
            <Box sx={{display:'flex',alignItems:'center',fontSize:'20px',gap:'20px',paddingRight:'20px'}}>
                <BellIcon/>
                <ChatIcon/>
            </Box>            
        </Box>
        <LoginContainer>
            <GreenButton>Place a bid</GreenButton>
            <Box sx={{display:'flex', alignItems:'center', gap:'20px'}}>
                <ImageContainer>
                    <StyledImage
                    src={imgpath+userData?.photo}
                    layout="fill"
                    alt="icon-img"
                    />
                </ImageContainer>
                <Box sx={{display:'flex',flexDirection:'column',gap:'6px'}}>
                    <Text color="green">Hi, {userData?.name}</Text>
                    <Text>{userData.cash.toLocaleString()} {userData.currency ?? 'AED'}</Text>
                </Box>
            </Box>
        </LoginContainer>
      </Head>
    </CustomBox>
    </>
  )
}

export default DashboardHeader