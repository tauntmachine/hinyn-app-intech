import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { StaticPill, PillWithIcon } from '../Pill';
import ImageSlider from '../ImageSlider';
import { GreenButton } from '../Button';
import Text from '../Typography';
import { useState } from 'react';
import Modal from '../Modal';
import BidOnProjectForm from '../../forms/BidOnProjectForm';
import { Container } from '@mui/system';
import { CautionIcon, CheckIcon } from '../Icon';
import moment from 'moment';
import Image from 'next/image';

const VerticalDivider = styled.div`
  height: 1rem;
`;

const MainWrapper = styled.div`
  padding: 2.5rem 5rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.25rem;
`;

const Column = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  align-items: center;
`;

const Row = styled(Box)`
  display: flex;

  &.green-bg {
    background: #ecf6f5;
    padding: 10px 20px;
    border-radius: 10px;
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

const CustomCheckIcon = styled(CheckIcon)`
  font-size: 4rem;
`;

const CustomCautionIcon = styled(CautionIcon)`
  font-size: 4rem;
`;

const SectionTitle = styled(Text)`
  font-size: 20px;
`;

const DescTitle = styled.span`
  color: #949494;
`;

const GrayText = styled(Text)`
  color: #949494;
`;
const CustomGreenButton = styled(GreenButton)`
  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
const PillButton = styled.div`
  padding: 7px 20px;
  cursor: pointer;
  border: 1px solid #4aa398;
  border-radius: 40px;
  color: #4aa398;
  display: flex;
  .Asad {
  }
  .Qwe {
    margin: 5px 0 0 12px;
  }
`;
const ImgDiv = styled.div`
  .icon-img-box img {
    filter: red;
  }
`;
const Details = ({ userDetails, bidData, userHasProposal, isBidOwner }) => {
  // console.log(bidData);
  const projectDetails = {
    attachments: [
      'project-temp-1.jpeg',
      'project-temp-2.jpeg',
      'project-temp-3.jpeg',
    ],
  };

  const modalTexts = {
    projBid: {
      title: 'Application Successful!',
      desc: 'This is to let you know that your bid is successfully placed and we have sent it to the client. We will be notifying you if your bid is approved or not.',
    },
    projComplete: {
      title: 'Project completed',
      desc: 'We will confirm with the client as well if everything is done before closing the project. Once they confirm, we will release your funds to your wallet.',
    },
  };

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openFinishModal, setOpenFinishModal] = useState(false);

  const handleClose = (e, reason) => {
    if (open) setOpen(false);
    if (openSuccessModal) setOpenSuccessModal(false);
    if (openFinishModal) setOpenFinishModal(false);
  };

  const handleSubmit = (isSuccess) => {
    if (isSuccess) {
      setOpen(false);
      setOpenSuccessModal(true);
      // setOpenFinishModal(true);
    }
  };

  const listAllProjects = () => {
    router.push('/dashboard');
  };

  return (
    <>
      <MainWrapper>
        <Row>
          <DescTitle>Looking for</DescTitle>
        </Row>
        <Row>
          {/* <PillWithIcon color="green" bg="transparent" category={bidData} /> */}
          <PillButton>
            <Image
              src={require('../../../public/assets/img/categories/icon-videographer.svg')}
              alt="icon-img"
              width="30px"
              height="30px"
              className="Asad"
            />
            <Text
              color="green"
              marginBottom="10px"
              display="flex"
              className="Qwe"
            >
              Photographer
            </Text>
          </PillButton>
        </Row>
        <Row>
          <DescTitle>Skills required for this project</DescTitle>
        </Row>
        <Row sx={{ gap: '1rem', flexWrap: 'wrap' }}>
          {Array.isArray(bidData) &&
            bidData.map((skill, idx) => (
              <StaticPill bg="green" key={'skill-reqd-' + idx}>
                {skill?.role}
              </StaticPill>
            ))}
        </Row>
        <Row>
          <DescTitle>Languages required for this project</DescTitle>
        </Row>
        <Row sx={{ gap: '1rem', flexWrap: 'wrap' }}>
          {['English'].map((lang, idx) => {
            return (
              <StaticPill bg="green" key={'lang-reqd-' + idx}>
                {lang}
              </StaticPill>
            );
          })}
        </Row>
        <VerticalDivider />
        <Row>
          <SectionTitle color="green">Project Details</SectionTitle>
        </Row>
        <Row>
          <DescTitle>Location</DescTitle>
        </Row>
        <Row className="green-bg">
          {bidData?.city} {bidData?.country ?? 'N/A'}
          {/* Fairmont, The Palm Dubai, United Arab Emirates */}
        </Row>
        <Row>
          <DescTitle>Event Date</DescTitle>
        </Row>
        <Row className="green-bg">
          {bidData?.deliveryDate
            ? moment(bidData?.deliveryDate).format('DD-MMM-YYYY')
            : 'NA'}
          {/* November, 7 2023 */}
        </Row>
        <Row>
          <DescTitle>Budget Range</DescTitle>
        </Row>
        <Row className="green-bg">
          {bidData?.minBudget} - {bidData?.maxBudget} AED
          {/* $500+ */}
        </Row>
        <Row>
          <DescTitle>Description</DescTitle>
        </Row>
        <Row className="green-bg">
          {bidData?.description}
          {/* You can start editing the page by modifying pages/index.tsx. The page
          auto-updates as you edit the file. API routes can be accessed on This
          endpoint can be edited in page sapi hello.ts. The pages/api directory
          is mapped to api. Files in this directory You can start editing the
          page by modifying pages/index.tsx. The page auto-updates as you edit
          the file. */}
        </Row>
        <Row>
          <DescTitle>Attachments</DescTitle>
        </Row>
        <Row>
          <ImageSlider images={projectDetails?.attachments} />
        </Row>
        <Row>
          <DescTitle>Deliverables</DescTitle>
        </Row>
        <Row className="green-bg">
          {bidData?.numDeliverables ?? 0}
          {/* 5,000 Pictures */}
        </Row>
        <Row>
          <DescTitle>Deadline</DescTitle>
        </Row>
        <Row className="green-bg">
          {bidData?.deliveryDate ?? 'NA'}
          {/* November, 7 2023 */}
        </Row>
        <Row sx={{ display: 'flex', justifyContent: 'center' }}>
          {userHasProposal ? (
            userDetails?.isProposedProject ? (
              <CustomGreenButton onClick={() => setOpenFinishModal(true)}>
                Complete Project
              </CustomGreenButton>
            ) : (
              <CustomGreenButton className="disabled">
                Applied
              </CustomGreenButton>
            )
          ) : isBidOwner ? (
            <CustomGreenButton onClick={() => setOpen(true)}>
              Apply
            </CustomGreenButton>
          ) : null}
          {/* {userDetails?.isProposedProject  
                    ?  <CustomGreenButton onClick={() => setOpenFinishModal(true)}>Complete Project</CustomGreenButton>
                    : <CustomGreenButton onClick={() => setOpen(true)}>Apply</CustomGreenButton>
                } */}
        </Row>
      </MainWrapper>
      <Modal handleClose={handleClose} isOpen={open} maxWidth="md">
        <BidOnProjectForm
          handleSubmit={handleSubmit}
          proposals={bidData?.proposals}
        />
      </Modal>
      <Modal handleClose={handleClose} isOpen={openSuccessModal} maxWidth="md">
        <Box sx={{ padding: '5rem 0' }}>
          <Column>
            <Row>
              <IconContainer>
                <CustomCheckIcon variant="green" />
              </IconContainer>
            </Row>
            <Row>
              <Text color="green" size="large">
                <b>
                  {userDetails?.isProposedProject
                    ? modalTexts.projComplete.title
                    : modalTexts.projBid.title}
                </b>
              </Text>
            </Row>
            <Row>
              <Container maxWidth="sm">
                <GrayText align="center">
                  {userDetails?.isProposedProject
                    ? modalTexts.projComplete.desc
                    : modalTexts.projBid.desc}
                </GrayText>
              </Container>
            </Row>
            <VerticalDivider />
            <VerticalDivider />
            <Row>
              <GreenButton onClick={listAllProjects}>
                {' '}
                Browse more projects
              </GreenButton>
            </Row>
          </Column>
        </Box>
      </Modal>
      <Modal handleClose={handleClose} isOpen={openFinishModal} maxWidth="md">
        <Box sx={{ padding: '5rem 0' }}>
          <Column>
            <Row>
              <CustomCautionIcon variant="red" />
            </Row>
            <Row>
              <Text color="red" size="large">
                <b>Project Complete?</b>
              </Text>
            </Row>
            <Row>
              <Container maxWidth="sm">
                <GrayText align="center">
                  Were thrilled to know that you completed your project! We will
                  confirm with the client as well if everything is done before
                  closing the project. Once they confirm, we will release your
                  funds to your wallet.
                </GrayText>
              </Container>
            </Row>
            <VerticalDivider />
            <Row>
              <Container maxWidth="sm">
                <GrayText align="center">
                  By clicking the button below, you agree that you have finished
                  the project with the client and have provided all
                  deliverables.
                </GrayText>
              </Container>
            </Row>
            <VerticalDivider />
            <Row>
              <GreenButton
                onClick={() => {
                  handleClose();
                  setOpenSuccessModal(true);
                }}
              >
                {' '}
                Mark Project as Complete
              </GreenButton>
            </Row>
          </Column>
        </Box>
      </Modal>
    </>
  );
};

export default Details;
