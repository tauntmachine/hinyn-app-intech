import DashboardHeader from '../../components/section/DashboardHeader';
import { Box, Container, Grid } from '@mui/material';
import ContentBox from '../../components/shared/ContentBox';
import styled from '@emotion/styled';
import Image from 'next/image';
import Text, { GrayText } from '../../components/shared/Typography';
import {
  LocationIcon,
  AwardIcon,
  RoundChatIcon,
} from '../../components/shared/Icon';
import StarRating from '../../components/shared/StarRating';
import Footer from '../../components/section/Footer';
import { StaticPill, PillWithIcon } from '../../components/shared/Pill';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getClientData, getUserData } from '../../components/forms/formService';
import ImageSlider from '../../components/shared/ImageSlider';
import ReviewBox from '../../components/shared/ReviewBox';
import { CheckSquareIcon } from '../../components/shared/Icon';
import moment from 'moment';

const Row = styled(Box)`
  display: flex;
`;

const Column = styled(Box)`
  display: flex;
  flex-direction: column;
`;
const ImageContainer = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  position: relative;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0px 3px 6px #00000029;
  cursor: pointer;
`;

const Name = styled(Text)`
  font-size: 32px;
`;

const StyledImage = styled(Image)`
  border-radius: 50%;
`;
const LeftBorder = styled.div`
  margin: 0 16px;
  border-left: 1px solid #e96e3f;
`;

const CustomStaticPill = styled(StaticPill)`
  color: #4aa398;
`;

const LargeIcon = styled.div`
  font-size: 20px !important;

  svg {
    color: #4aa398;
  }

  .chatIcon {
    font-size: 18px;
  }
`;

const VerticalDivider = styled.div`
  height: 2rem;
`;

const ProfessionalProfile = () => {
  const router = useRouter();
  let imgPath = '/assets/img/avatars/';
  const [clientData, setClientData] = useState([
    {
      firstName: 'Samantha',
      lastName: 'David',
      noJobs: '32',
      insta: 'samantha123',
    },
  ]);
  const [clientCategories, setClientCategories] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const { fid } = router.query;

  const reviews = [
    {
      user: 'Danny Woods',
      project: 'Danny and Kaylas Wedding',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque.',
    },
    {
      user: 'Kayla Woods',
      project: 'Danny and Kaylas Wedding',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque.',
    },
    {
      user: 'Danny Woods',
      project: 'Baby Shower',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque.',
    },
  ];

  const verifications = ['Identity', 'Payment Method', 'Phone', 'Email'];

  const skills = [
    'Fashion',
    'Beauty',
    'Lifestyle',
    'Corporate',
    'E-commerce',
    'Watches / Jewelry',
    'Products',
    'Cars',
    'Sports',
    'Wedding',
    'Event',
    'Kids / Baby',
    'Animal',
    'Architecture / Real estate',
    'Food',
  ];
  const projectDetails = {
    attachments: [
      'project-temp-1.jpeg',
      'project-temp-2.jpeg',
      'project-temp-3.jpeg',
      'project-temp-4.jpeg',
      'project-temp-5.jpeg',
      'project-temp-6.jpeg',
      'project-temp-7.jpeg',
    ],
  };
  const userData = {
    portfolios: [
      {
        category: 'photographer',
        title: 'Photographer Portfolio',
        projectDetails: [
          'project-temp-1.jpeg',
          'project-temp-2.jpeg',
          'project-temp-3.jpeg',
          'project-temp-4.jpeg',
        ],
      },
      {
        category: 'model',
        title: 'Model Portfolio',
        projectDetails: [
          'project-temp-5.jpeg',
          'project-temp-6.jpeg',
          'project-temp-7.jpeg',
          'project-temp-1.jpeg',
        ],
      },
    ],
  };

  // useEffect(() => {
  //   if (fid) {
  //     const clientData = {
  //       user: {
  //         data: {
  //           id: fid,
  //         },
  //       },
  //     };
  //     getClientData(clientData).then((res) => {
  //       if (res?.data?.data) {
  //         console.log('res data', res?.data?.data);
  //       }
  //     });
  //   }
  //   const clientData = {
  //     id: localStorage.getItem('hinyn-cid'),
  //   };
  //   getClientData(clientData).then((res) => {
  //     if (res?.data?.data) {
  //       setClientData(() => res?.data?.data?.attributes);
  //       if (res?.data?.data?.attributes?.categories?.data)
  //         setClientCategories(
  //           () => res?.data?.data?.attributes?.categories?.data
  //         );
  //     }
  //   });
  // }, [fid]);

  const handleChangeTab = (val) => {
    setCurrentTab(val);
    router.push('/dashboard');
  };

  return (
    <Box sx={{ background: '#EBEBEB', height: 'auto' }}>
      <DashboardHeader setTabChange={handleChangeTab} currentTab={currentTab} />
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ padding: '5rem 0 7rem 0' }}>
          <Grid item xs={7.5} sx={{ margin: '0 0 0 5.9rem' }}>
            <ContentBox>
              <Row sx={{ gap: '2rem' }}>
                <Column>
                  <ImageContainer>
                    <StyledImage
                      src={
                        clientData?.displayPhoto
                          ? imgPath + clientData?.displayPhoto
                          : imgPath + 'img-avatar2.png'
                      }
                      layout="fill"
                      alt="avatar-img"
                    />
                  </ImageContainer>
                </Column>
                <Column>
                  <Row sx={{ gap: '14px', alignItems: 'center' }}>
                    <Name color="red">
                      <b>
                        {/* {clientData?.firstName} {clientData?.lastName} */}
                        Steve Washington
                      </b>
                    </Name>
                    <GrayText size="large">
                      {' '}
                      {/* {clientData?.instagramProfile ??
                        '@' + clientData?.firstName} */}
                      @samantha123{' '}
                    </GrayText>
                  </Row>
                  <Row sx={{ gap: '16px', alignItems: 'center' }}>
                    <StarRating data={clientData?.rating ?? 3} sz="xl" />
                    <GrayText>
                      {' '}
                      {clientData?.jobsCompleted} 32 Projects Completed
                    </GrayText>
                  </Row>
                  <Column sx={{ rowGap: '10px', margin: '1.5rem 0' }}>
                    <Row sx={{ gap: '8px' }}>
                      <LargeIcon>
                        <LocationIcon />
                      </LargeIcon>
                      <GrayText>
                        {' '}
                        {clientData?.city}{' '}
                        {clientData?.country ?? 'United Arab Emirates'}{' '}
                      </GrayText>
                    </Row>
                    <Row sx={{ gap: '8px' }}>
                      <LargeIcon>
                        <AwardIcon />
                      </LargeIcon>
                      <GrayText>
                        {' '}
                        Member Since{' '}
                        {moment(clientData?.createdAt).format('MMMM YYYY')}{' '}
                      </GrayText>
                    </Row>
                    <Row sx={{ gap: '8px' }}>
                      <LargeIcon>
                        <RoundChatIcon className="chatIcon" />
                      </LargeIcon>
                      <GrayText key={'user-language'}>English</GrayText>
                    </Row>
                  </Column>
                  <Row>
                    <GrayText>
                      {/* {clientData?.headline ?? 'Headline'} */}
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam non orci vestibulum, congue est et, lacinia neque.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam non orci vestibulum, congue est et, lacinia neque.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </GrayText>
                  </Row>
                </Column>
              </Row>
            </ContentBox>
            <VerticalDivider />
            <ContentBox
              hasHeader={true}
              headerTitle="Business Profile"
              headerColor="red"
            >
              <Text color="red">Name of Business</Text>
              <GrayText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                non orci vestibulum, congue est et, lacinia neque. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Aliquam non orci
                vestibulum, congue est et, lacinia neque. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit.
              </GrayText>
              <VerticalDivider />
              <Row>
                <ImageSlider images={projectDetails?.attachments} />
              </Row>
            </ContentBox>
            <VerticalDivider />
            <ContentBox
              hasHeader={true}
              headerTitle="Reviews"
              headerColor="red"
              isScrollable={true}
            >
              <Column sx={{ rowGap: '1rem', margin: '1.5rem 0' }}>
                {reviews &&
                  reviews.map((review, idx) => {
                    return (
                      <ReviewBox borderColor="green" key={'review-' + idx}>
                        <i>
                          <Text>{review?.desc}</Text>
                        </i>
                        <GrayText component="span" sx={{ marginRight: '1rem' }}>
                          {review?.user}
                        </GrayText>
                        <Text color="red" component="span">
                          {review?.project}
                        </Text>
                      </ReviewBox>
                    );
                  })}
              </Column>
            </ContentBox>
            <VerticalDivider />
          </Grid>
          <Grid item xs={2.9}>
            <ContentBox
              hasHeader={true}
              headerTitle="Verifications"
              headerColor="red"
            >
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                {verifications.map((item, idx) => {
                  return (
                    <Row
                      key={'verification-' + idx}
                      sx={{ justifyContent: 'space-between' }}
                    >
                      <GrayText>{item}</GrayText>
                      <Box
                        sx={{
                          display: 'flex',
                          gap: '1rem',
                          alignItems: 'center',
                        }}
                      >
                        <CheckSquareIcon variant="green" />
                        <Text color="green">Verified</Text>
                      </Box>
                    </Row>
                  );
                })}
              </Box>
            </ContentBox>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default ProfessionalProfile;
