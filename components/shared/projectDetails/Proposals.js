import { Box, Container } from '@mui/material';
import styled from '@emotion/styled';
import Text from '../Typography';
import Image from 'next/image';
import { LocationIcon, CheckIcon } from '../Icon';
import StarRating from '../StarRating';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getProposalsOfBid, updateProposalData } from '../../forms/formService';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { RedButton, GreenButton } from '../Button';
import Modal from '../Modal';

const MainWrapper = styled.div`
  padding: 2.5rem 5rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.25rem;
  max-height: 150vh;
`;

const Row = styled(Box)`
  display: flex;

  &.green-bg {
    background: #ecf6f5;
    padding: 10px 20px;
    border-radius: 10px;
  }
`;

const CustomPagination = styled(Pagination)`
  button {
    color: #4aa398;
  }
`;

const CustomRedButton = styled(RedButton)`
  background: #fdeaef;
  color: #eb4c60;
  border: none;
  &.isAwarded {
    pointer-events: none;
    opacity: 0.5;
  }
  &:hover {
    border: none;
  }
`;

const ProjectContainer = styled(Box)`
  // display: flex;
  border-bottom: 1px solid #ddd;
  padding: 30px 0;

  &:last-child {
    border-bottom: 0;
  }
`;

const IconContainer = styled.div`
  background: #dbedea;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  width: 6rem;
  height: 6.1rem;
  position: relative;
  border-radius: 9px;
  box-shadow: 0px 3px 6px #00000029;
`;
const StyledImage = styled(Image)`
  border-radius: 9px;
`;

const Column = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

const GrayText = styled(Text)`
  color: #949494;
  margin: 0 10px;
`;
const CustomCheckIcon = styled(CheckIcon)`
  font-size: 4rem;
`;
const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 115px;
  width: 80px;
`;
const FirstDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 48rem;
`;
const SecondDiv = styled.div`
  width: 14rem;
  height: 15rem;
`;
const InnerDiv = styled.div`
  width: 38rem;
  display: flex;
`;
const InnerDesc = styled.div`
  width: 42rem;
  display: flex;
  padding: 17px 5px;
  margin: 14px 0 0 0;
  font-size: 13px;
  color: #909497;
`;
const ButtonsDiv = styled.div`
  width: 11rem;
  height: 7rem;
  margin: 72px 0 0 40px;
`;
const PillButton = styled.div`
  padding: 10px 45px;
  border: 1px solid #eb4c60;
  border-radius: 40px;
  color: #eb4c60;
  margin: 10px 0 0 0;
`;
const PillButton2 = styled.div`
  padding: 10px 33px;
  background: #f9dfe2;
  border-radius: 40px;
  color: #eb4c60;
  margin: auto;
  font-size: 13px;
`;
const Proposals = ({ projectId, bidData, isBidOwner }) => {
  const router = useRouter();
  const [proposals, setProposals] = useState([
    {
      firstName: 'Samantha',
      lastName: 'Davidson',
      instagramProfile: 'samantha123',
      city: 'Dubai',
      country: 'United Arab Emirates',
      profession: 'Photographer',
    },
    {
      firstName: 'Samantha',
      lastName: 'Davidson',
      instagramProfile: 'samantha123',
      city: 'Dubai',
      country: 'United Arab Emirates',
      profession: 'Photographer',
    },
    {
      firstName: 'Samantha',
      lastName: 'Davidson',
      instagramProfile: 'samantha123',
      city: 'Dubai',
      country: 'United Arab Emirates',
      profession: 'Photographer',
    },
    {
      firstName: 'Samantha',
      lastName: 'Davidson',
      instagramProfile: 'samantha123',
      city: 'Dubai',
      country: 'United Arab Emirates',
      profession: 'Photographer',
    },
  ]);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const imgPath = '/assets/img/avatars/';

  //  useEffect(()=>{

  //     getProposalsOfBid(projectId).then((res)=>{
  //         setProposals(()=>[]);
  //         if(res?.data?.data){
  //           let temp = res?.data?.data?.attributes?.proposals;
  //           if(temp?.data && temp?.data?.length > 0){
  //             temp?.data?.map((item)=>{
  //                 setProposals((prevData)=> prevData.concat({"id":item?.id,...item?.attributes}))
  //             })
  //           }
  //         }
  //       })

  //  },[projectId])

  const handleClose = (e, reason) => {
    if (openSuccessModal) setOpenSuccessModal(false);
  };

  const listAllProjects = () => {
    router.push('/dashboard');
  };

  const handleAcceptBid = (proposalId) => {
    const proposalData = {
      dateAwarded: new Date(),
    };
    updateProposalData(proposalData, proposalId).then((result) => {
      if (result?.data) {
        setOpenSuccessModal(() => true);
      }
    });
  };
  return (
    <MainWrapper>
      {proposals &&
        proposals.map((proposal, idx) => {
          let bidder = proposal;
          return (
            <ProjectContainer key={'project-bid-' + idx}>
              <Row
                sx={{
                  gap: '0rem',
                  width: '100%',
                }}
              >
                <FirstDiv>
                  <InnerDiv>
                    <Column sx={{ flexBasis: '10%' }}>
                      <ImageContainer>
                        <StyledImage
                          src={
                            bidder?.displayPhoto
                              ? imgPath + bidder?.displayPhoto
                              : imgPath + 'img-avatar2.png'
                          }
                          layout="fill"
                          alt="icon-img"
                        />
                      </ImageContainer>
                    </Column>
                    <Column
                      sx={{
                        flexBasis: '50%',
                        marginLeft: '20px',
                      }}
                    >
                      <Row
                        sx={{ gap: '14px', justifyContent: 'space-between' }}
                      >
                        <Box sx={{ display: 'flex' }}>
                          <Text color="red">
                            <b>
                              {bidder?.firstName} {bidder?.lastName}
                            </b>
                          </Text>
                          <GrayText>
                            {' '}
                            {bidder?.instagramProfile ?? ''}{' '}
                          </GrayText>
                        </Box>
                        <Box>
                          {isBidOwner ? (
                            <CustomRedButton
                              onClick={() => handleAcceptBid(proposal?.id)}
                              className={
                                proposal?.dateAwarded ? 'isAwarded' : ''
                              }
                            >
                              {proposal?.dateAwarded
                                ? 'Bid Accepted'
                                : 'Accept Bid'}
                            </CustomRedButton>
                          ) : (
                            ''
                            // <Text color="green" fontSize="20px">
                            //   <b>
                            //     {/* {proposal?.budget} {proposal.currency ?? 'AED'} */}
                            //     $520
                            //   </b>
                            // </Text>
                          )}
                        </Box>
                      </Row>
                      <Row>
                        <LocationIcon />
                        <GrayText>
                          {' '}
                          {bidder?.city}, {bidder?.country ?? 'UAE'}
                        </GrayText>
                      </Row>
                      <Row>
                        <Box sx={{ display: 'flex' }}>
                          <StarRating data={bidder?.rating ?? 3} sz="lg" />
                          <GrayText> {bidder?.profession ?? ''} </GrayText>
                        </Box>
                      </Row>

                      {/* {isBidOwner ? (
                    <Row>
                      <GrayText>Bid Price: </GrayText>
                      <Text color="green">
                        <b>
                          {proposal?.budget} {proposal.currency ?? 'AED'}
                        </b>
                      </Text>
                    </Row>
                  ) : null} */}
                    </Column>
                  </InnerDiv>
                  <InnerDesc>
                    You have accepted the bid. Contact them now to start the
                    projectYou have accepted the bid. Contact them now to start
                    the projectYou have accepted the bid. Contact them now to
                    start the projectYou have accepted the bid. Contact them now
                    to start the projectYou have accepted the bid. Contact them
                    now to start the project to start the projectYou have
                    accepted the bid. Contact them now to start the project to
                    start the projectYou have accepted the bid.
                  </InnerDesc>
                </FirstDiv>
                <SecondDiv>
                  <TextDiv>
                    <Text color="green" fontSize="23px" marginLeft="20px">
                      <b>
                        {/* {proposal?.budget} {proposal.currency ?? 'AED'} */}
                        $520
                      </b>
                    </Text>
                    <Text fontSize="12px" marginLeft="20px" color="gray">
                      Bids Price
                    </Text>
                  </TextDiv>
                  <ButtonsDiv>
                    <PillButton2>Accepted Bid</PillButton2>
                    <PillButton>Message</PillButton>
                  </ButtonsDiv>
                </SecondDiv>
              </Row>
            </ProjectContainer>
          );
        })}
      {proposals && proposals.length === 0 ? (
        <ProjectContainer>
          <Text color="red">No proposals for this project yet.</Text>
        </ProjectContainer>
      ) : null}
      {proposals && proposals.length > 9 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '2rem',
          }}
        >
          <Stack spacing={2}>
            <CustomPagination count={10} />
          </Stack>
        </Box>
      ) : null}

      <Modal handleClose={handleClose} isOpen={openSuccessModal} maxWidth="md">
        <Box sx={{ padding: '5rem 0' }}>
          <Column sx={{ alignItems: 'center' }}>
            <Row>
              <IconContainer>
                <CustomCheckIcon variant="green" />
              </IconContainer>
            </Row>
            <Row>
              <Text color="green" size="large">
                <b>Bid Accepted</b>
              </Text>
            </Row>
            <Row>
              <Container maxWidth="sm">
                <GrayText align="center">
                  You have accepted the bid. Contact them now to start the
                  project
                </GrayText>
              </Container>
            </Row>
            <Row>
              <GreenButton onClick={listAllProjects}>
                {' '}
                Browse more projects
              </GreenButton>
            </Row>
          </Column>
        </Box>
      </Modal>
    </MainWrapper>
  );
};

export default Proposals;
