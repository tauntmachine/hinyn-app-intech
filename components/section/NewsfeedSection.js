import { Box, Grid, Typography } from '@mui/material';
import ContentBox from '../../components/shared/ContentBox';
import {
  ProjectIcon,
  RightChevronIcon,
  RssIcon,
  UsersIcon,
} from '../../components/shared/Icon';
import { GrayButton, RedButton } from '../../components/shared/Button';
import styled from '@emotion/styled';
import AlertBox from '../../components/shared/AlertBox';
import ClickableStarRating from '../../components/shared/ClickableStarRating';
import ProgressBar from '../../components/shared/ProgressBar';
import Text, { GrayText } from '../../components/shared/Typography';
import { useEffect, useState } from 'react';
import { getBidsOfClient, getClientDataBids } from '../forms/formService';

import { useRouter } from 'next/router';
const ContainerDiv = styled.div`
  padding-top: 2rem;
  // padding-left: 16rem;
`;
const ProjectsBox = styled(Box)`
  display: 'flex';
  flex-direction: 'column';
  max-height: 28rem;

  width: 100%;
`;

const Title = styled(Typography)`
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;

  .green-text {
    color: #4aa398;
  }
`;
const TimeStamp = styled.span`
  color: #949494;
  font-size: 12px;
`;

const VerticalDivider = styled.div`
  height: 18px;
`;
const UploadIdBox = styled.div`
  background: #ebebeb;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 20px 25px;
  margin: 16px 0;
`;
const ListItem = styled.div`
  color: #555555;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  padding: 14px 10px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    color: #eb4c60;
  }
  &:hover .right-icon {
    color: #eb4c60;
  }
`;

const HR = styled.hr`
  border: 1px solid #eee;
  opacity: 0.6;
  width: 120%;
  margin: 0;
  left: -32px;
  position: relative;
`;

const StyledPill = styled.div`
  background: ${(props) =>
    props.status === 'upcoming'
      ? '#ECF6F5'
      : props.status === 'active'
      ? '#FFEBAA'
      : props.status === 'completed'
      ? '#FFEEEF'
      : '#4CC0EB'};
  color: #555555;
  border-radius: 13px;
  display: flex;
  padding: 0.43rem 1.2rem;
  font-size: 10.5px;
`;

const StatusText = styled.div`
  text-transform: capitalize;
`;
const WelcomeCon = styled.div`
  // padding: 0 10rem;
`;
const ListItemDiv = styled.div`
  color: #707070;
  padding: 15px 0;
  align-items: center;
  display: flex;
  width: 91%;
  justify-content: space-between;
  // font-weight: bold;
  cursor: pointer;
`;
const GridCustom = styled.div`
  display: flex;
  gap: 30px;
  width: auto;
  @media (max-width: 769px) {
    flex-direction: column;
  }
`;
const BoxCustom = styled.div`
  display: flex;

  justify-content: center;
  padding: 3% 0;
  @media (max-width: 769px) {
    flex-direction: column;
    padding: 4%;
  }
`;
const StyledGrid = styled(Grid)`
  @media (max-width: 768px) {
    // margin: auto;
  }
`;
const NewsfeedSection = ({ accountType }) => {
  const [open, setOpen] = useState(false);
  const [userProjects, setUserProjects] = useState([]);
  const router = useRouter();
  const showDetails = (projectId) => {
    router.push(`/dashboard?screen=details&project=${projectId}`);
  };

  const clientId = localStorage.getItem('hinyn-cid');
  const clientData = {
    id: clientId,
  };

  useEffect(() => {
    accountType === 2
      ? getClientDataBids(clientData).then((res) => {
          if (res) {
            setUserProjects(res.data.data.attributes.bids.data);
            console.log(res.data.data.attributes.bids.data);
          }
        })
      : // : getClientDataProposals(clientData).then((res) => {
        //     if (res) {
        //       setUserProjects(res.data.data.attributes.proposals.data);
        //       console.log(res.data.data.attributes.proposals.data);
        //     }
        //   });
        getBidsOfClient().then((res) => {
          let resList = [];
          if (res?.data?.data) {
            res?.data?.data.map((item) => {
              let resObj = { id: item?.id, ...item?.attributes };
              resList = [...resList, resObj];
            });
            // console.log('list -- ', resList);
            setUserProjects(resList);
          }
        });
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleSubmit = () => {
    handleClose();
  };

  const professionalNewsfeedData = [
    {
      type: 'action-required',
      desc: 'Welcome to HINYN! We’re happy you’re here. Please upload a valid identification card to finalize your registration.',
      time: 'about 16 hours ago',
      alert: {
        title: 'ID is required',
        desc: 'Kindly upload a valid ID for verification. It can be your passport, driver’s license, or country ID.',
        type: 'action-button',
        actionText: 'Upload an ID',
      },
    },
    {
      type: 'bid-success',
      project: 'Wedding Day Photography',
      time: 'about 13 hours ago',
    },
    {
      type: 'bid-fail',
      project: 'Professional Photography in London',
      time: 'about 12 hours ago',
    },
    {
      type: 'project-complete',
      project: 'Kayla’s Wedding Photography',
      time: 'about 12 hours ago',
      alert: {
        desc: " Don't worry, Your rating will be kept anonymous.",
        professional: 'Kayla',
        type: 'action-rate',
      },
    },
  ];

  const clientNewsfeedData = [
    {
      type: 'action-required',
      desc: 'Hi! Please upload a valid identification card',
      time: 'about 16 hours ago',
      alert: {
        title: 'ID is required',
        desc: 'Kindly upload a valid ID for verification. It can be your passport, drivers license, or country ID.',
        type: 'action-button',
        actionText: 'Upload an ID Asad',
      },
    },
    {
      type: 'action-required',
      desc: 'Hi! Please verify your email address to continue posting your project Wedding day photography',
      time: 'about 16 hours ago',
      alert: {
        title: 'Email verification required',
        desc: 'Please click ‘Verify email address’ on the email address we sent to samantha.doe@domain.com to complete your verification.',
        type: 'action-button',
        actionText: 'Resend Email',
      },
    },
    {
      type: 'bid-reply',
      project: 'Wedding Day Photography',
      professional: 'Andrea Levine',
      time: 'about 13 hours ago',
    },
    {
      type: 'bid-reply',
      project: 'Wedding Day Photography',
      professional: 'Andrea Levine',
      time: 'about 13 hours ago',
    },
    {
      type: 'bid-reply',
      project: 'Wedding Day Photography',
      professional: 'Andrea Levine',
      time: 'about 13 hours ago',
    },
  ];

  const userData = {
    progress: 50,
    balance: 123456,
    currency: 'USD',
  };

  const getNewsFeedByType = (item) => {
    if (item.type === 'action-required') {
      return (
        <>
          <Title component="p">{item?.desc}</Title>
          <TimeStamp>{item?.time}</TimeStamp>
          <VerticalDivider />
          {item.alert && (
            <WelcomeCon>
              <AlertBox>
                <Typography component="p" sx={{ fontWeight: 600 }}>
                  {item?.alert?.title}
                </Typography>
                <Typography component="p">{item?.alert?.desc}</Typography>
                {item?.alert?.type && item?.alert?.type === 'action-button' ? (
                  <>
                    <VerticalDivider />
                    <GrayButton variant="outlined">
                      {item?.alert?.actionText}
                    </GrayButton>
                  </>
                ) : null}
              </AlertBox>
            </WelcomeCon>
          )}
        </>
      );
    } else if (item.type === 'bid-success') {
      return (
        <>
          <Title>
            Your bid on the project ‘
            <span className="green-text">{item.project}</span>’ has been
            accepted!
          </Title>
          <TimeStamp>{item?.time}</TimeStamp>
          <VerticalDivider />
          <GrayButton variant="outlined">View Project</GrayButton>
        </>
      );
    } else if (item.type === 'bid-fail') {
      return (
        <>
          <Title>
            Sorry, your bid on ‘
            <Text color="green" component="span">
              {item.project}
            </Text>
            ’ was rejected.
          </Title>
          <TimeStamp>{item?.time}</TimeStamp>
        </>
      );
    } else if (item.type === 'bid-reply') {
      return (
        <>
          <Title>
            <Text color="green" component="span">
              {item.professional}
            </Text>{' '}
            replied to your bid on your project{' '}
            <Text color="red" component="span">
              {item.project}
            </Text>
          </Title>
          <TimeStamp>{item?.time}</TimeStamp>
        </>
      );
    } else if (item.type === 'project-complete') {
      return (
        <>
          <Title>
            Your project ‘<span className="green-text">{item.project}</span>’ is
            completed!
          </Title>
          <TimeStamp>{item?.time}</TimeStamp>
          <VerticalDivider />
          {item.alert && (
            <AlertBox>
              <Typography component="p" sx={{ fontWeight: 600 }}>
                Please rate {item?.alert?.professional} as a client
              </Typography>
              <Typography component="p">{item?.alert?.desc}</Typography>
              {item?.alert?.type && item?.alert?.type === 'action-rate' ? (
                <>
                  <VerticalDivider />
                  <ClickableStarRating />
                </>
              ) : null}
            </AlertBox>
          )}
        </>
      );
    }
  };

  const getUserData = () => {
    return (
      <ContentBox
        isScrollable={false}
        hasHeader={true}
        headerTitle="Your Account"
        headerColor={'gray'}
        headerIcon={<UsersIcon />}
        hasBodyIcon={false}
        setWidth={true}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text fontWeight="bold">Setup your account</Text>
            <div>{userData?.progress}%</div>
          </Box>
          <ProgressBar
            progress={userData?.progress}
            color="red"
            height="15px"
          />
          <UploadIdBox>
            <Text color="red">Upload an ID</Text>
            <div>+5%</div>
          </UploadIdBox>
          <VerticalDivider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Text>
                <b>Account Balance</b>
              </Text>
              <Typography component="p" sx={{ color: '#949494' }}>
                {userData.balance.toLocaleString()}{' '}
                {userData?.currency ?? 'AED'}
              </Typography>
            </Box>
            <RedButton variant="outlined">
              {accountType === 1 ? 'Withdraw' : 'Deposit Funds'}
            </RedButton>
          </Box>
        </Box>
      </ContentBox>
    );
  };
  const headerName =
    accountType === 1 ? 'Your current projects' : 'Your projects';

  const getUserProjects = () => {
    return (
      <ContentBox
        isScrollable={false}
        hasHeader={true}
        headerTitle={headerName}
        headerColor={'gray'}
        headerIcon={<ProjectIcon />}
        hasBodyIcon={false}
        padding={true}
        setWidth={true}
      >
        <ProjectsBox>
          {userProjects.length > 0 ? (
            userProjects.map((project, idx) => (
              <>
                {accountType === 1 ? (
                  <ListItemDiv
                    key={'userprojects-' + idx}
                    onClick={() => showDetails(project.id)}
                  >
                    {project?.title}{' '}
                    <RightChevronIcon className="right-caret" />
                  </ListItemDiv>
                ) : (
                  <ListItem
                    key={'userprojects-' + idx}
                    onClick={() => showDetails(project.id)}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      {project?.attributes.title}
                      {accountType === 2 ? (
                        <Box
                          sx={{
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'center',
                            marginTop: '8px',
                          }}
                        >
                          <GrayText size="small">
                            <Text component="span">{project?.proposals}</Text>{' '}
                            Total Bids
                          </GrayText>
                          <StyledPill status={project?.status}>
                            <StatusText>{project?.status}</StatusText>
                          </StyledPill>
                        </Box>
                      ) : null}
                    </Box>
                  </ListItem>
                )}
                <HR />
              </>
            ))
          ) : (
            <div>No Projects Available.</div>
          )}
        </ProjectsBox>
      </ContentBox>
    );
  };

  const newsfeedData =
    accountType === 1 ? professionalNewsfeedData : clientNewsfeedData;

  return (
    <>
      <BoxCustom>
        {/* <ContainerDiv> */}
        <GridCustom>
          <Grid item xs={6} sx={{}}>
            {newsfeedData &&
              newsfeedData.map((item, idx) => {
                return idx === 0 ? (
                  <ContentBox
                    hasHeader={true}
                    headerTitle="Newsfeed"
                    headerColor={'gray'}
                    headerIcon={<RssIcon />}
                    hasBodyIcon={true}
                  >
                    {getNewsFeedByType(item)}
                  </ContentBox>
                ) : (
                  <ContentBox hasBodyIcon={true}>
                    {getNewsFeedByType(item)}
                  </ContentBox>
                );
              })}
          </Grid>
          <StyledGrid item xs={4}>
            {userProjects.length > 0 && getUserProjects()}
            {userData && getUserData()}
          </StyledGrid>
        </GridCustom>
        {/* </ContainerDiv> */}
      </BoxCustom>
    </>
  );
};

export default NewsfeedSection;
