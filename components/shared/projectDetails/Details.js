import { Box } from "@mui/material";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { StaticPill, PillWithIcon } from "../Pill";
import ImageSlider from "../ImageSlider";
import { GreenButton } from "../Button";
import Text from "../Typography";
import { useState } from "react";
import Modal from "../Modal";
import BidOnProjectForm from "../../forms/BidOnProjectForm";
import { Container } from "@mui/system";
import { CautionIcon, CheckIcon } from "../Icon";
import moment from "moment";

const VerticalDivider = styled.div`
  height: 1rem;
`

const MainWrapper = styled.div`
  padding: 2.5rem 5rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.25rem;
`

const Column = styled(Box)`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    align-items: center;
`

const Row = styled(Box)`
  display: flex;

  &.green-bg{
    background: #ECF6F5;
    padding: 10px 20px;
    border-radius: 10px;
  }
`
const IconContainer = styled.div`
    background: #DBEDEA;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const CustomCheckIcon = styled(CheckIcon)`
    font-size: 4rem;
`

const CustomCautionIcon = styled(CautionIcon)`
    font-size: 4rem;
`

const SectionTitle = styled(Text)`
    font-size: 20px;
`

const DescTitle = styled.span`
    color: #949494;
`

const GrayText = styled(Text)`
    color: #949494;
`

const Details = ({userDetails,bidData }) => {
    const projectDetails = {
        attachments: [
            "project-temp-1.jpeg",
            "project-temp-2.jpeg",
            "project-temp-3.jpeg",
            "project-temp-4.jpeg",
            "project-temp-5.jpeg",
            "project-temp-6.jpeg",
            "project-temp-7.jpeg",
        ]
    }

    const modalTexts = {
        projBid: {
            title: "Application Successful!",
            desc: "This is to let you know that your bid is successfully placed and we have sent it to the client. We will be notifying you if your bid is approved or not.",
        },
        projComplete: {
            title: "Project completed",
            desc: "We will confirm with the client as well if everything is done before closing the project. Once they confirm, we will release your funds to your wallet.",
        },
    }

    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openFinishModal, setOpenFinishModal] = useState(false);
    const cid = localStorage.getItem('hinyn-cid');
    console.log('cid',cid)

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
    }

    const listAllProjects = () => {
        router.push('/dashboard')
    }



    return (
        <>
            <MainWrapper>
                <Row>
                    <DescTitle>Looking for</DescTitle>
                </Row>
                <Row>
                    <PillWithIcon color="green" bg="transparent" category={bidData?.categories?.data[0]?.attributes?.slug} />
                </Row>
                <Row>
                    <DescTitle>Skills required for this project</DescTitle>
                </Row>
                <Row sx={{ gap: '1rem', flexWrap: 'wrap' }}>
                    {bidData?.skills?.data?.map((skill, idx) => {
                        return <StaticPill bg="green" key={'skill-reqd-' + idx}>{skill?.attributes?.title}</StaticPill>
                    })}
                </Row>
                <Row>
                    <DescTitle>Languages required for this project</DescTitle>
                </Row>
                <Row sx={{ gap: '1rem', flexWrap: 'wrap' }}>
                    {['English'].map((lang, idx) => {
                        return <StaticPill bg="green" key={'lang-reqd-' + idx}>{lang}</StaticPill>
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
                </Row>
                <Row>
                    <DescTitle>Event Date</DescTitle>
                </Row>
                <Row className="green-bg">
                    {bidData?.deliveryDate ? moment(bidData?.deliveryDate).format('DD-MMM-YYYY') : 'NA'}
                </Row>
                <Row>
                    <DescTitle>Budget Range</DescTitle>
                </Row>
                <Row className="green-bg">
                    {bidData?.minBudget} - {bidData?.maxBudget} AED
                </Row>
                <Row>
                    <DescTitle>Description</DescTitle>
                </Row>
                <Row className="green-bg">
                    {bidData?.description}
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
                </Row>
                <Row>
                    <DescTitle>Deadline</DescTitle>
                </Row>
                <Row className="green-bg">
                    {bidData?.deliveryDate ?? 'NA'}
                </Row>
                <Row sx={{ display: 'flex', justifyContent: 'center' }}>
                   
                    {userDetails?.isProposedProject  
                        ?  <GreenButton onClick={() => setOpenFinishModal(true)}>Complete Project</GreenButton>
                        : <GreenButton onClick={() => setOpen(true)}>Apply</GreenButton>
                    }
                   
                </Row>
            </MainWrapper>
            <Modal handleClose={handleClose} isOpen={open} maxWidth="md">
                <BidOnProjectForm handleSubmit={handleSubmit} />
            </Modal>
            <Modal handleClose={handleClose} isOpen={openSuccessModal} maxWidth="md">
                <Box sx={{ padding: '5rem 0' }}>
                    <Column>
                        <Row>
                            <IconContainer>
                                <CustomCheckIcon variant="green"/>
                            </IconContainer>
                        </Row>
                        <Row>
                            <Text color="green" size="large">
                                <b>{userDetails?.isProposedProject ? modalTexts.projComplete.title : modalTexts.projBid.title}</b>
                            </Text>
                        </Row>
                        <Row>
                            <Container maxWidth="sm">
                                <GrayText align="center">{userDetails?.isProposedProject ? modalTexts.projComplete.desc : modalTexts.projBid.desc}</GrayText>
                            </Container>
                        </Row>
                        <VerticalDivider />
                        <VerticalDivider />
                        <Row>
                            <GreenButton onClick={listAllProjects}> Browse more projects</GreenButton>
                        </Row>
                    </Column>
                </Box>
            </Modal>
            <Modal handleClose={handleClose} isOpen={openFinishModal} maxWidth="md">
                <Box sx={{ padding: '5rem 0' }}>
                    <Column>
                        <Row>
                            <CustomCautionIcon variant="red"/>
                        </Row>
                        <Row>
                            <Text color="red" size="large"><b>Project Complete?</b></Text>
                        </Row>
                        <Row>
                            <Container maxWidth="sm">
                                <GrayText align="center">Were thrilled to know that you completed your project! We will confirm with the client as well if everything is done before closing the project. Once they confirm, we will release your funds to your wallet.</GrayText>
                            </Container>
                        </Row>
                        <VerticalDivider />
                        <Row>
                            <Container maxWidth="sm">
                                <GrayText align="center">By clicking the button below, you agree that you have finished the project with the client and have provided all deliverables.</GrayText>
                            </Container>
                        </Row>
                        <VerticalDivider />
                        <Row>
                            <GreenButton onClick={()=>{handleClose(); setOpenSuccessModal(true)}}> Mark Project as Complete</GreenButton>
                        </Row>
                    </Column>
                </Box>
            </Modal>
        </>
    )
}

export default Details;