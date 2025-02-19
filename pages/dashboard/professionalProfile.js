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
  Dots,
} from '../../components/shared/Icon';
import StarRating from '../../components/shared/StarRating';
import Footer from '../../components/section/Footer';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  getClientData,
  getClientDataBids,
} from '../../components/forms/formService';
import ImageSlider from '../../components/shared/ImageSlider';
import ReviewBox from '../../components/shared/ReviewBox';
import { CheckSquareIcon } from '../../components/shared/Icon';
import moment from 'moment';

import BidFreelancerForm2 from '../../components/forms/BidFreelancerForm2';
import Modal2 from '../../components/shared/Modal2';
import Settings from '../../components/shared/Settings';
import Wallet from '../../components/shared/Wallet';

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
const ButtonSkills = styled.div`
  background: #e2f2f0;
  border-radius: 30px;
  padding: 4px 7px;
  font-size: 12.3px;
  color: #4aa398;
  width: 50px;
  display: flex;
`;
const DivB = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const DivButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 80px 0 0;
`;
const LoginHoverBox = styled.div`
  background: white;
  position: absolute;
  width: 16rem;
  visibility: ${(props) => (props.hover ? '' : 'hidden')};
  opacity: ${(props) => (props.hover ? '1' : '0.6')};
  transition: 0.3s;
  padding: 2px 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  cursor: pointer;
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
const ColumnCon = styled.div`
  width: 100%;
`;

const DivCon = styled.div``;
const ProfessionalProfile = () => {
  const router = useRouter();
  let imgPath = '/assets/img/avatars/';
  const [clientData, setClientData] = useState([]);
  const [clientBids, setClientBids] = useState([]);
  const [selectedClientBid, setSelectedClientBid] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [accountType, setAccountType] = useState();
  const { fid, val } = router.query;
  // console.log(fid);
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

  const projectDetails = {
    attachments: [
      'project-temp-1.jpeg',
      'project-temp-2.jpeg',
      'project-temp-3.jpeg',
      'project-temp-4.jpeg',
    ],
  };

  useEffect(() => {
    const clientData = fid
      ? {
          id: fid,
        }
      : { id: localStorage.getItem('hinyn-cid') };
    const client = {
      id: localStorage.getItem('hinyn-cid'),
    };
    console.log(fid);
    getClientData(clientData).then((res) => {
      if (res?.data?.data) {
        setClientData(res?.data?.data?.attributes);
      }
    });
    getClientData(client).then((res) => {
      if (res?.data?.data) {
        setAccountType(res.data.data.attributes.accountType);
      }
    });
    getClientDataBids(client).then((res) => {
      if (res) {
        setClientBids(() => []);
        const Bids = res.data.data.attributes.bids.data;

        Bids.map((x, id) => {
          const temp = { id: x.id };
          setClientBids((prev) =>
            prev.concat({
              ...x?.attributes,
              ...temp,
            })
          );
          if (id === 0) {
            setSelectedClientBid(x?.attributes.title);
          }
        });
      }
    });
  }, []);

  const handleChangeTab = (val) => {
    setCurrentTab(val);
    router.push('/dashboard');
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleBidSubmit = () => {
    setOpen(() => false);
  };
  const loginHover = () => {
    setHover(true);
  };

  const loginHoverOut = () => {
    setHover(false);
  };
  const loginHoverBoxEnter = () => {
    setHover(true);
  };

  const loginHoverBoxLeave = () => {
    setHover(false);
  };
  return (
    <Box sx={{ background: '#EBEBEB', height: 'auto' }}>
      <DashboardHeader
        setTabChange={handleChangeTab}
        currentTab={currentTab}
        account={accountType}
      />
      {val == 0 ? (
        <Container maxWidth="xxl">
          <Grid
            container
            spacing={4}
            sx={{
              padding: '5rem 0 7rem 0',

              justifyContent: 'center',
            }}
          >
            <Grid item xs={7.5}>
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
                  <ColumnCon>
                    <DivButton>
                      <Row
                        sx={{
                          gap: '14px',
                          alignItems: 'center',
                        }}
                      >
                        <Name color="green">
                          <b>
                            {clientData?.firstName} {clientData?.lastName}
                          </b>
                        </Name>
                        <GrayText size="large">
                          {' '}
                          {clientData?.instagramProfile ??
                            '@' + clientData?.firstName}
                        </GrayText>
                      </Row>
                      {/* <Button onClick={handleOpen}>Send Bid</Button> */}
                      {fid ? (
                        <DivCon>
                          <Dots
                            color="red"
                            onMouseEnter={loginHover}
                            onMouseLeave={loginHoverOut}
                          />
                          <LoginHoverBox
                            hover={hover}
                            onMouseEnter={loginHoverBoxEnter}
                            onMouseLeave={loginHoverBoxLeave}
                          >
                            {' '}
                            <CustomText hover={hover}>
                              Add to My Freelancers
                            </CustomText>
                            <a onClick={handleOpen}>
                              <CustomText hover={hover}>send a bid</CustomText>
                            </a>
                            <CustomText hover={hover}>
                              send a message
                            </CustomText>
                            <CustomText hover={hover}>Report</CustomText>
                          </LoginHoverBox>
                        </DivCon>
                      ) : (
                        ''
                      )}
                    </DivButton>
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
                          {moment(clientData?.createdAt).format(
                            'MMMM YYYY'
                          )}{' '}
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
                      <GrayText>{clientData?.description}</GrayText>
                    </Row>
                  </ColumnCon>
                </Row>
              </ContentBox>
              <VerticalDivider />
              <ContentBox
                hasHeader={true}
                headerTitle="Portfolio"
                headerColor="green"
              >
                <VerticalDivider />
                <Row>
                  <ImageSlider images={projectDetails?.attachments} />
                </Row>
              </ContentBox>
              <VerticalDivider />
              <ContentBox
                hasHeader={true}
                headerTitle="Reviews"
                headerColor="green"
                isScrollable={false}
              >
                <Column sx={{ rowGap: '1rem', margin: '1.5rem 0' }}>
                  {reviews &&
                    reviews.map((review, idx) => {
                      return (
                        <ReviewBox borderColor="green" key={'review-' + idx}>
                          <i>
                            <Text>{review?.desc}</Text>
                          </i>
                          <GrayText
                            component="span"
                            sx={{ marginRight: '1rem' }}
                          >
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
                headerColor="green"
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
              <ContentBox
                hasHeader={true}
                headerTitle="Skills"
                headerColor="green"
              >
                <DivB>
                  <ButtonSkills>{clientData.skills}</ButtonSkills>
                  <ButtonSkills>Skills</ButtonSkills>
                  <ButtonSkills>Skills</ButtonSkills>
                </DivB>
              </ContentBox>
            </Grid>
          </Grid>
          <Modal2 handleClose={handleClose} isOpen={open} maxWidth="md">
            <BidFreelancerForm2
              handleBidSubmit={handleBidSubmit}
              data={clientData}
              bidData={clientBids}
              selectedBid={selectedClientBid}
              Id={fid}
            />
          </Modal2>
        </Container>
      ) : val == 1 ? (
        <Settings />
      ) : val == 2 ? (
        <Wallet />
      ) : (
        ''
      )}

      <Footer />
    </Box>
  );
};

export default ProfessionalProfile;
