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
  @media (max-width: 769px) {
    padding: 2.5rem 1.8rem;
  }
  padding: 2.5rem 5rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.25rem;
  max-height: 90vh;
  overflow: auto;
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
    opacity: 0.6;
  }
  &:hover {
    border: none;
  }
`;

const ProjectContainer = styled(Box)`
  display: flex;
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
  width: 5rem;
  height: 5rem;
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
`;
const CustomCheckIcon = styled(CheckIcon)`
  font-size: 4rem;
`;
const Con1 = styled.div`
  background: #d8ebe8;
  border: 1px solid #4aa398;
  border-radius: 6px;
  padding: 12px 20px;
  display: ${(props) => (props.openSuccessModal ? 'flex' : 'none')};
`;
const Proposals = ({ projectId, bidData, isBidOwner }) => {
  const router = useRouter();
  const [proposals, setProposals] = useState([]);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const imgPath = '/assets/img/avatars/';

  useEffect(() => {
    getProposalsOfBid(projectId).then((res) => {
      setProposals(() => []);
      if (res?.data?.data) {
        let temp = res?.data?.data?.attributes?.proposals;
        if (temp?.data && temp?.data?.length > 0) {
          temp?.data?.map((item) => {
            setProposals((prevData) =>
              prevData.concat({ id: item?.id, ...item?.attributes })
            );
          });
        }
      }
    });
  }, [projectId]);

  const handleClose = (e, reason) => {
    if (openSuccessModal) setOpenSuccessModal(false);
  };

  const listAllProjects = () => {
    router.push('/dashboard');
  };

  const handleAcceptBid = (proposalId) => {
    const proposalData = {
      isDirectBidAssignment: true,
      dateAwarded: new Date(),
    };

    updateProposalData(proposalData, proposalId).then((result) => {
      setOpenSuccessModal(() => true);
      if (result?.data) {
        ('');
      }
    });
  };
  return (
    <>
      <MainWrapper>
        <Con1>
          <Text color="green">You have accepted bid</Text>
        </Con1>
        {proposals &&
          proposals.map((proposal, idx) => {
            let bidder = proposal?.client?.data?.attributes;
            return (
              <ProjectContainer key={'project-bid-' + idx}>
                <Row sx={{ gap: '2rem', width: '100%' }}>
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
                  <Column sx={{ flexBasis: '90%' }}>
                    <Row sx={{ gap: '14px', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex' }}>
                        <Text color="red">
                          <b>
                            {bidder?.firstName} {bidder?.lastName}
                          </b>
                        </Text>
                        <GrayText> {bidder?.instagramProfile ?? ''} </GrayText>
                      </Box>
                      <Box>
                        {isBidOwner ? (
                          <CustomRedButton
                            onClick={() => handleAcceptBid(proposal?.id)}
                            className={
                              proposal?.dateAwarded || openSuccessModal
                                ? 'isAwarded'
                                : ''
                            }
                          >
                            {proposal?.dateAwarded || openSuccessModal
                              ? 'Bid Accepted'
                              : 'Accept Bid'}
                          </CustomRedButton>
                        ) : (
                          <Text color="green">
                            <b>
                              {proposal?.budget} {proposal.currency ?? 'AED'}
                            </b>
                          </Text>
                        )}
                      </Box>
                    </Row>
                    <Row sx={{ gap: '8px' }}>
                      <LocationIcon />
                      <GrayText>
                        {' '}
                        {bidder?.city}, {bidder?.country ?? 'UAE'}
                      </GrayText>
                    </Row>
                    <Row>
                      <Box sx={{ display: 'flex' }}>
                        <StarRating data={bidder?.rating ?? 3} sz="lg" />
                        <GrayText> {bidder?.category ?? ''} </GrayText>
                      </Box>
                    </Row>
                    <Row>
                      <GrayText>{proposal?.description}</GrayText>
                    </Row>
                    {isBidOwner ? (
                      <Row>
                        <GrayText>Bid Price: </GrayText>
                        <Text color="green">
                          <b>
                            {proposal?.budget} {proposal.currency ?? 'AED'}
                          </b>
                        </Text>
                      </Row>
                    ) : null}
                  </Column>
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
      </MainWrapper>
    </>
  );
};

export default Proposals;
