import { Box,Grid,Container, Typography } from "@mui/material";
import ContentBox from "../../components/shared/ContentBox";
import DashboardHeader from "../../components/section/DashboardHeader";
import {  RightChevronIcon, RssIcon, UsersIcon } from "../../components/shared/Icon";
import {GrayButton,RedButton} from "../../components/shared/Button";
import styled from "@emotion/styled";
import AlertBox from "../../components/shared/AlertBox";
import ClickableStarRating from "../../components/shared/ClickableStarRating";
import ProgressBar from "../../components/shared/ProgressBar";
import Text from "../../components/shared/Typography";



const Title = styled(Typography)`
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;

    .green-text{
        color: #4AA398;
    }
`
const TimeStamp = styled.span`
    color: #949494;
    font-size: 12px;
`

const VerticalDivider = styled.div`
    height: 18px;
`
const UploadIdBox = styled.div`
    background: #EBEBEB;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    padding: 20px 25px;
`

const ListItem = styled.div`
    color : #555555;
    display: flex;
    justify-content: space-between;
    padding: 18px 0;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover{
        transform: translateY(-2px);
        color: #EB4C60;
    }
    &:hover .right-icon{
        color: #EB4C60;
    }
`

const HR = styled.hr`
    border: 1px solid #eee;
    opacity: 0.6;
    width: 120%;
    margin: 0;
    left: -32px;
    position: relative;
`

const NewsfeedSection = () => {

    const newsfeedData = [
        {
            type: 'action-required',
            desc: 'Welcome to HINYN! We’re happy you’re here. Please upload a valid identification card to finalize your registration.' ,
            time: 'about 16 hours ago',
            alert: {
                title: 'ID is required',
                desc: 'Kindly upload a valid ID for verification. It can be your passport, driver’s license, or country ID.',
                type: 'action-button',
                actionText:'Upload an ID'
            },
        },
        {
            type:'bid-success',
            project: 'Wedding Day Photography',
            time: 'about 13 hours ago',
        },
        {
            type:'bid-fail',
            project: 'Professional Photography in London',
            time: 'about 12 hours ago',
        },
        {
            type:'project-complete',
            project: 'Kayla’s Wedding Photography',
            time: 'about 12 hours ago',
            alert: {
                desc:' Don\'t worry, Your rating will be kept anonymous.',
                professional: 'Kayla',
                type: 'action-rate',
            },
        }
    ];
    
    const userData = {
        progress: 50,
        balance: 123456,
        currency: 'USD'
    }

    const userProjects = [
        {
            id:10001,
            title: 'Wedding Day Photography in Abu Dhabi'
        },
        {
            id:10002,
            title: 'Models required for fitness app'
        },
        {
            id:10003,
            title: 'Hand models required for jewelry shoot'
        },
        {
            id:10004,
            title: 'Bridal make-up artist required'
        },
        
    ]


    const getNewsFeedByType = (item) =>{
        if(item.type === 'action-required'){
            return <>
                <Title component="p">{item?.desc}</Title>
                <TimeStamp>{item?.time}</TimeStamp>
                <VerticalDivider />
                {item.alert && 
                    <AlertBox>
                        <Typography component="p" sx={{fontWeight:600}}>{item?.alert?.title}</Typography>
                        <Typography component="p">{item?.alert?.desc}</Typography>
                        {item?.alert?.type && item?.alert?.type === 'action-button' 
                        ?   <>
                            <VerticalDivider />
                            <GrayButton variant="outlined">{item?.alert?.actionText}</GrayButton>
                            </>
                            : null
                        }
                    </AlertBox>
                }
            </>
        }else if(item.type === 'bid-success'){
            return <>
                <Title>Your bid on the project ‘<span className="green-text">{item.project}</span>’ has been accepted!</Title>
                <TimeStamp>{item?.time}</TimeStamp>
                <VerticalDivider />
                <GrayButton variant="outlined">View Project</GrayButton>
            </>
        }
        else if(item.type === 'bid-fail'){
            return <>
                <Title>Sorry, your bid on ‘<span className="green-text">{item.project}</span>’  was rejected.</Title>
                <TimeStamp>{item?.time}</TimeStamp>
            </>
        }
        else if(item.type === 'project-complete'){
            return <>
                <Title>Your project  ‘<span className="green-text">{item.project}</span>’ is completed!</Title>
                <TimeStamp>{item?.time}</TimeStamp>
                <VerticalDivider />
                {item.alert && 
                    <AlertBox>
                        <Typography component="p" sx={{fontWeight:600}}>Please rate {item?.alert?.professional} as a client</Typography>
                        <Typography component="p">{item?.alert?.desc}</Typography>
                        {item?.alert?.type && item?.alert?.type === 'action-rate' 
                        ?   <>
                            <VerticalDivider />
                            <ClickableStarRating />
                            </>
                            : null
                        }
                    </AlertBox>
                }
            </>
        } 
    }

    const getUserData = () => {
        return <ContentBox hasHeader={true} headerTitle="Your Account" headerColor={"gray"} headerIcon={<UsersIcon/>} hasBodyIcon={false}>
        <Box sx={{display:'flex',flexDirection:'column'}}>
             <Box sx={{display:'flex', justifyContent:'space-between'}}>
                 <div>Setup your account</div>
                 <div>{userData?.progress}%</div>
             </Box>
             <ProgressBar progress={userData?.progress} color="red" height="15px"/>
             <UploadIdBox>
                 <Text color="red">Upload an ID</Text>
                 <div>+5%</div>
             </UploadIdBox>
             <VerticalDivider/>
             <Box sx={{display:'flex', justifyContent:'space-between'}}>
                 <Box sx={{display:'flex',flexDirection:'column'}}>
                     <Text><b>Account Balance</b></Text>
                     <Typography component="p" sx={{color:'#949494'}}>{userData.balance.toLocaleString()} {userData?.currency ?? 'AED' }</Typography>
                 </Box>
                 <RedButton variant="outlined"> Withdraw </RedButton>
             </Box>
        </Box>
     </ContentBox>
    }

    const getUserProjects = () => {
        return <ContentBox hasHeader={true} headerTitle="Your Account" headerColor={"gray"} headerIcon={<UsersIcon/>} hasBodyIcon={false}>
        <Box sx={{display:'flex',flexDirection:'column'}}>
            {userProjects.length > 0 
            ? userProjects.map((project) => 
            <>
            <ListItem>{project?.title}<RightChevronIcon className="right-caret"/></ListItem>
            <HR/>
            </>
            )
            : 'No Projects Available.'
            }     
        </Box>
        </ContentBox>
    }

  return (
    <Box sx={{background:'#EBEBEB', height:'auto'}}>
        <Container sx={{marginTop:'5rem'}}>
            <Grid container columnSpacing={4}>
                <Grid item xs={8}>
                    {
                        newsfeedData && newsfeedData.map((item,idx) => {
                            return idx === 0 
                            ? <ContentBox hasHeader={true} headerTitle="Newsfeed" headerColor={"gray"} headerIcon={<RssIcon/>} hasBodyIcon={true}>
                                {getNewsFeedByType(item)}
                            </ContentBox>
                            :
                            <ContentBox hasBodyIcon={true}>
                                {getNewsFeedByType(item)}
                            </ContentBox>
                        })
                    }
                </Grid>
                <Grid item xs={4}>
                    { userData && 
                        getUserData()     
                    }
                    {
                        userProjects && getUserProjects()
                    }
                </Grid>       
            </Grid>
        </Container>
    </Box>
  )
}

export default NewsfeedSection