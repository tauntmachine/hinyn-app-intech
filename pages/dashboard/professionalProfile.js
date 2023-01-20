import DashboardHeader from "../../components/section/DashboardHeader";
import { Box,Container,Grid } from "@mui/material"; 
import ContentBox from "../../components/shared/ContentBox";
import styled from "@emotion/styled";
import Image from "next/image";
import Text, {GrayText} from "../../components/shared/Typography";
import { LocationIcon, AwardIcon,RoundChatIcon } from "../../components/shared/Icon";
import StarRating from "../../components/shared/StarRating";
import Footer from "../../components/section/Footer";
import { PillWithIcon } from "../../components/shared/Pill";

const Row = styled(Box)`
  display:flex;
`

const Column = styled(Box)`
  display:flex;
  flex-direction: column;
`
const ImageContainer = styled.div`
    width: 7.5rem;
    height: 7.5rem;
    position: relative;
    background: #ffffff;
    border-radius: 50%;
    box-shadow: 0px 3px 6px #00000029;
    cursor: pointer;
`

const Name = styled(Text)`
  font-size: 32px;
`

const StyledImage = styled(Image)`
    border-radius: 50%;
`
const LeftBorder = styled.div`
  margin: 0 16px;
  border-left: 1px solid #E96E3F;
`

const LargeIcon = styled.div`
  font-size: 20px !important;

  svg{
    color: #4AA398;
  }

  .chatIcon{
    font-size: 18px;
  }
`

const VerticalDivider = styled.div`
  height: 2rem;
`

const professional = () => {
  let imgPath = '/assets/img/avatars/';

  const userData = {
    userId: 1,
    isLoggedIn: true,
    photo:'img-avatar1.png',
    name: 'Samantha Davidson',
    handle: '@samdavidson',
    rating: 4,
    jobsCompleted: 32,
    categories: [
      'photographer',
      'model'
    ],
    location: 'Dubai, United Arab Emirates',
    joinDate: 'January 2023',
    languages: [
      'English', 
      'Arabic'
    ],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    portfolios:[
      {
        category: 'photographer',
        title: 'Photographer Portfolio',
        projects:[

        ]
      },
      {
        category: 'model',
        title: 'Model Portfolio',
        projects:[

        ]
      },
    ]
  }
  return (
    <Box sx={{background:'#EBEBEB', height:'auto'}}>
        <DashboardHeader />
        <Container maxWidth="xl">
        <Grid container spacing={4} sx={{padding:"5rem 0 7rem 0"}}>
            <Grid item xs={8}>
                <ContentBox>
                  <Row sx={{gap:'2rem'}}>
                      <Column>
                          <ImageContainer>
                              <StyledImage
                              src={imgPath+userData?.photo}
                              layout="fill"
                              alt="icon-img"
                              />
                          </ImageContainer>
                      </Column>
                      <Column>
                          <Row sx={{gap:'14px',alignItems:'center'}}>
                                <Name color="green"><b>{userData?.name}</b></Name>
                                <GrayText size="large"> ({userData?.handle}) </GrayText>
                          </Row>
                          <Row sx={{gap:'16px', alignItems: 'center'}}>
                              <StarRating data={userData?.rating} sz="xl"/>
                              <GrayText> {userData?.jobsCompleted} Jobs Completed</GrayText>
                          </Row>
                          <Column sx={{rowGap:'10px',margin:'1.5rem 0'}}>
                              <Row sx={{gap:'8px',flexWrap:'wrap'}}>
                                {userData.categories && userData?.categories.map((category,idx)=>{
                                  return <>
                                    <LargeIcon><PillWithIcon key={"user-category-"+idx} category={category} noPadding color="gray"/></LargeIcon>
                                    {userData?.categories.length  > 1 && userData?.categories.length-1 !== idx ? <LeftBorder /> : null}
                                  </>
                                })}
                              </Row>
                              <Row sx={{gap:'8px'}}>
                                <LargeIcon><LocationIcon/></LargeIcon>
                                  <GrayText> {userData?.location} </GrayText>
                              </Row>
                              <Row sx={{gap:'8px'}}>
                                <LargeIcon><AwardIcon/></LargeIcon>
                                  <GrayText> Member Since {userData?.joinDate} </GrayText>
                              </Row>
                              <Row sx={{gap:'8px'}}>
                                <LargeIcon><RoundChatIcon className="chatIcon"/></LargeIcon>
                                {userData.languages && userData?.languages.map((language,idx)=>{
                                  return <>
                                    <GrayText key={'user-language-'+idx}>{language}</GrayText>
                                  </>
                                })}
                              </Row>
                            </Column>
                          <Row>
                              <GrayText>{userData?.description}</GrayText>
                          </Row>
                      </Column>
                  </Row>
                </ContentBox>
                <VerticalDivider />
                {
                  userData?.portfolios && userData?.portfolios?.map((category,idx)=>{
                    return <>
                            <ContentBox key={'portfolio-'+idx} hasHeader={true} headerTitle={category?.title}>
                              {category?.title}
                            </ContentBox>
                            <VerticalDivider />
                            </>
                  })
                }
                <ContentBox hasHeader={true} headerTitle="Reviews">
                    Reviews
                </ContentBox>
                <VerticalDivider />
                <ContentBox hasHeader={true} headerTitle="Experience">
                    Experience
                </ContentBox>
                <VerticalDivider />
                <ContentBox hasHeader={true} headerTitle="Education">
                    Education
                </ContentBox>
                <VerticalDivider />
            </Grid>
            <Grid item xs={4}>
                <ContentBox hasHeader={true} headerTitle="Verifications">
                  this is the content2
                </ContentBox>
                <VerticalDivider />
                <ContentBox hasHeader={true} headerTitle="Skills">
                  this is the content2
                </ContentBox>
            </Grid>
        </Grid>
            
        </Container>
        <Footer />
    </Box>
  )
}

export default professional