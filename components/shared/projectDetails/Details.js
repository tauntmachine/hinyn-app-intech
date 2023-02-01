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

const Details = ({ projectId,userDetails }) => {
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
                "Fashion", "Beauty", "Lifestyle", "Wedding"
            ],
            languages: [
                "English", "Arabic"
            ]
        },
        location: "Fairmont, The Palm, Dubai, United Arab Emirates",
        eventDate: "November 7, 2023",
        budget: {
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
        client: {
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
            unverified: [
                "Phone Verified"
            ]
        }
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

    const handleClose = (e, reason) => {
        if (open) setOpen(false);
        if (openSuccessModal) setOpenSuccessModal(false);
        if (openFinishModal) setOpenFinishModal(false);
    };

    const handleSubmit = (clientData) => {
        console.log('submitted', clientData)
        if (clientData && clientData?.isSuccess) {
            setOpen(false);
            setOpenSuccessModal(true);
            setOpenFinishModal(true);
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
                    <PillWithIcon color="green" bg="transparent" category={projectDetails?.requirements?.categoryKey} />
                </Row>
                <Row>
                    <DescTitle>Skills required for this project</DescTitle>
                </Row>
                <Row sx={{ gap: '1rem', flexWrap: 'wrap' }}>
                    {projectDetails?.requirements?.skills.map((skill, idx) => {
                        return <StaticPill bg="green" key={'skill-reqd-' + idx}>{skill}</StaticPill>
                    })}
                </Row>
                <Row>
                    <DescTitle>Languages required for this project</DescTitle>
                </Row>
                <Row sx={{ gap: '1rem', flexWrap: 'wrap' }}>
                    {projectDetails?.requirements?.languages.map((lang, idx) => {
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
                    {projectDetails?.location}
                </Row>
                <Row>
                    <DescTitle>Event Date</DescTitle>
                </Row>
                <Row className="green-bg">
                    {projectDetails?.eventDate}
                </Row>
                <Row>
                    <DescTitle>Budget Range</DescTitle>
                </Row>
                <Row className="green-bg">
                    {projectDetails?.budget?.amount} {projectDetails?.budget?.currency}
                </Row>
                <Row>
                    <DescTitle>Description</DescTitle>
                </Row>
                <Row className="green-bg">
                    {projectDetails?.description}
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
                    {projectDetails?.deliverables}
                </Row>
                <Row>
                    <DescTitle>Deadline</DescTitle>
                </Row>
                <Row className="green-bg">
                    {projectDetails?.deadline}
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