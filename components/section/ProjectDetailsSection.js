import { Box,Grid, Container} from "@mui/material";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { MdKeyboardBackspace } from "react-icons/md";
import Text, { SmallText } from "../shared/Typography";
import { GreenButton } from "../shared/Button";
import { CheckSquareIcon, XSquareIcon, LocationIcon } from "../shared/Icon";
import StarRating from "../shared/StarRating";
import Details from "../shared/projectDetails/Details";
import Proposals from "../shared/projectDetails/Proposals";
import Link from "next/link";
import { getBidData } from "../forms/formService";
import { useRouter } from "next/router";
import moment from "moment";

const HeaderContainer = styled.div`
  background: #4AA398;
  color: #ffffff;
  box-shadow: inset 0px 3px 20px #00000029;
  padding: 54px 0;
  display: flex;
  flex-direction: column;
  min-height:19rem;
`

const BackIcon = styled(MdKeyboardBackspace)`
  font-size: 16px;
  font-weight: 600;
  margin-right: 8px;
`

const BackText = styled.div`
  font-size: 12px;
  font-weight: 600;
`

const VerticalDivider = styled.div`
  height: 1rem;
`
const ContentBoxWrapper = styled(Box)`
  position:relative;
  left: 0;
  right:0;
  margin: auto;
  top:-12rem;
`

const ContentBox = styled.div`
  background: #ffffff;
  border-radius: 15px;

  &.title-wrapper{
    border-radius: 15px 15px 0 0;
    border-bottom: 1px solid #4AA398;
  }

  &.main-wrapper{
    border-radius: 0 0 15px 15px;
  }
`

const TitleWrapper = styled.div`
  padding: 2.5rem 5rem 0 5rem;
  height: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const MainWrapper = styled.div`
  padding: 2.5rem 5rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.25rem;
`

const SideboxWrapper = styled.div`
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`

const BidBoxWrapper = styled.div`
  padding: 1.75rem;
  display: flex;
  flex: 1 2;
`

const Row = styled(Box)`
  display: flex;

  &.green-bg{
    background: #ECF6F5;
    padding: 10px 20px;
    border-radius: 10px;
  }
`

const Column = styled(Box)`
  display: flex;
  flex-direction: column;
`

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    text-align: center;
    gap:20px;
    position: relative;
`

const TabItem = styled.div`
    cursor: pointer;
    padding: 0 1rem 1rem;


    &.active{
        border-bottom: 2px solid #4AA398;
        color: #4AA398;
    }
`

const CustomCheckSquareIcon = styled(CheckSquareIcon)`
    font-size: 1.5rem;
    color: #E96E3F;
`

const CustomXSquareIcon = styled(XSquareIcon)`
    font-size: 1.5rem;
    color: #E96E3F;
`

const Title = styled(Text)`
    font-size: 32px;
`

const SectionTitle = styled(Text)`
  font-size: 20px;
`

const DescTitle = styled.span`
    color: #949494;
`

const CustomLocationIcon = styled(LocationIcon)`
    font-size: 1.5rem;
    margin-right: 1rem;
`

const CustomGreenButton = styled(GreenButton)`
    width: 60%;
`


const ProjectDetailsSection = ({projectId}) => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(0);
  const [bidData, setBidData] = useState({});
  const [clientData, setClientData] = useState({});
  const { project } = router.query

  useEffect(()=>{
    getBidData(project).then((res)=>{
      if(res?.data?.data){ 
        let temp = {"id":res?.data?.data?.id, ...res?.data?.data?.attributes};
        setBidData(()=> temp)
        setClientData(()=> temp?.client?.data?.attributes)
      }
    })
  },[])

  const tabs = ['Details', 'Proposals'];

 const projectDetails = {
  id: "1235670808857",
  title: "Kate and Joe's Wedding",
  bid: {
    min: 500,
    max: 600,
    currency: 'USD',
    endDate: '10/01/2023',
    numBids: 76
  },
  requirements: {
    categoryKey: 'photographer',
    skills: [
      "Fashion","Beauty","Lifestyle","Wedding"
    ],
    languages: [
      "English", "Arabic"
    ]
  },
  location: "Fairmont, The Palm, Dubai, United Arab Emirates",
  eventDate: "November 7, 2023",
  budget:{
    amount: 500,
    currency: 'USD'
  },
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum",
  attachments: [
    "project-temp-1.jpeg",
    "project-temp-2.jpeg",
    "project-temp-3.jpeg",
    "project-temp-4.jpeg",
    "project-temp-5.jpeg",
    "project-temp-6.jpeg",
    "project-temp-7.jpeg",
  ],
  deliverables: "5000 pictures",
  deadline: '30/01/2023',
  client:{
    name: "Joe Addams",
    location: "Dubai, United Arab Emirates",
    rating: 4,
    ratingNUmber: 16,
    memberSince: 'November 2020',
    verified: [
      "Identity Verified",
      "Payment Verified",
      "Deposit Made",
      "Email Verified",
      "Profile Completed",
    ],
    unverified:[
      "Phone Verified"
    ]
  }
 }

 const userDetails = {
  isLoggedIn : true,
  isProposedProject: false,
  paymentStatus: 'On-hold',
  paymentDescription: 'HINYN have received the payment from the client and we will release it to your account once the client confirmed that the project is complete.'
 }
  return (
    <Box sx={{background:'#EBEBEB', height:'auto'}}>
      <HeaderContainer>
        <Container sx={{display:'flex'}} maxWidth="xl">
        <BackIcon /> 
          <BackText> 
            <Link href="/dashboard">
                <a>
                  Back to Projects
                </a>
            </Link>
          </BackText>
        </Container>
      </HeaderContainer>
      <ContentBoxWrapper>
        <Container maxWidth="xl">
            <Grid container columnSpacing={1}>
                <Grid item xs={8}>
                  <ContentBox className="title-wrapper">
                    <TitleWrapper>
                      <Box>
                          <Row sx={{justifyContent:'space-between'}}>
                              <Title color="red">{bidData?.title}</Title>
                              <Column>
                                  <Text color="green">{bidData?.minBudget} - {bidData?.maxBudget === 0 ? '' : bidData?.maxBudget } {bidData?.currency ?? 'AED'}</Text>
                                  <Text>{moment(bidData?.createdDate).format('DD-MMM-YYYY')}</Text>
                              </Column>
                          </Row>
                          <VerticalDivider />
                          <Row>
                            <SmallText>Project ID {bidData?.id}</SmallText>
                          </Row>
                      </Box>
                      <Row>
                        <Tabs>
                          {tabs?.map((item,idx)=>{
                            return <TabItem key={'tab-'+idx} className={idx===currentTab ? "active" : ""} onClick={()=>setCurrentTab(idx)}>{item}</TabItem>
                          })
                          }
                        </Tabs>
                      </Row>
                    </TitleWrapper>
                  </ContentBox>
                  <ContentBox className="main-wrapper">
                    {currentTab === 0 
                    ? <Details userDetails={userDetails} bidData={bidData}></Details>
                    : <Proposals projectId={bidData?.id}></Proposals>
                    }
                  </ContentBox>
                </Grid> 
                <Grid item xs={4}>
                  <ContentBox className="title-wrapper">
                    <Box sx={{display: 'flex', padding:'1.75rem'}}>
                      <Text color="green" size="large">Client Information</Text>
                    </Box>
                  </ContentBox>
                  <ContentBox className="main-wrapper">
                    <SideboxWrapper>
                      <Row>
                        <Text color="red">{clientData?.firstName} {clientData?.lastName}</Text>
                      </Row>
                      <Row sx={{alignItems:"center"}}>
                        <CustomLocationIcon color="green"/>
                        <Text>{clientData?.city} {clientData?.country ?? 'United Arab Emirates'}</Text>
                      </Row>
                      <Row sx={{gap:'1rem'}}>
                        <StarRating data={projectDetails?.client?.rating} sz="lg"/>
                        <div>( {projectDetails?.client?.ratingNUmber} )</div>
                      </Row>
                      <Row>
                        <Text>Member since {moment(clientData?.createdDate).format('MMM YYYY')}</Text>
                      </Row>
                      <VerticalDivider />
                      <Text color="green" sx={{fontSize:'16px'}}>Client Verification</Text>
                        {projectDetails?.client?.verified && projectDetails?.client?.verified.map((item,idx)=>{
                          return <Row sx={{alignItems: "center", gap:'1rem'}} key={'verified-item-'+idx}>
                            <CustomCheckSquareIcon/>
                            <Text>{item}</Text>
                          </Row>
                        })}
                        {projectDetails?.client?.unverified && projectDetails?.client?.unverified.map((item,idx)=>{
                          return <Row sx={{alignItems: "center", gap:'1rem'}} key={'unverified-item-'+idx}>
                            <CustomXSquareIcon/>
                            <Text>{item}</Text>
                          </Row>
                        })}
                    </SideboxWrapper>
                  </ContentBox>
                  <VerticalDivider/>
                  {
                    userDetails?.isProposedProject 
                    ?  <ContentBox>
                        <BidBoxWrapper>
                          <Column>
                            <Row>
                              <Text color="green">Payment Status</Text>
                            </Row>
                            <Row>
                              <Text color="red" size="large">{userDetails?.paymentStatus}</Text>
                            </Row>
                            <Row>
                              <Text>{userDetails?.paymentDescription}</Text>
                            </Row>
                          </Column>
                        </BidBoxWrapper>
                      </ContentBox>
                    :  <ContentBox>
                        <BidBoxWrapper>
                          <Column sx={{borderRight: '1px solid #ACCECA', width:'25%',alignItems:'center'}}>
                            <Text>Bids</Text>
                            <Text color="green" size="large">{projectDetails?.bid?.numBids}</Text>
                          </Column>
                          <Column sx={{alignItems:'center', width:'75%', justifyContent:'center'}}>
                              <CustomGreenButton>Apply</CustomGreenButton>
                          </Column>
                        </BidBoxWrapper>
                      </ContentBox>
                  }
                </Grid>
            </Grid>
        </Container>
      </ContentBoxWrapper>
    </Box>
  )
}

export default ProjectDetailsSection