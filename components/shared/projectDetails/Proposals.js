import { Box} from "@mui/material";
import styled from "@emotion/styled";
import Text from "../Typography";
import Image from "next/image";
import { LocationIcon } from "../Icon";
import StarRating from "../StarRating";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from "react";
import { getBidData, getBidProposals, getProposals } from "../../forms/formService";
import { useRouter } from "next/router";


const MainWrapper = styled.div`
  padding: 2.5rem 5rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.25rem;
  max-height:90vh;
  overflow: auto;
`

const Row = styled(Box)`
  display: flex;

  &.green-bg{
    background: #ECF6F5;
    padding: 10px 20px;
    border-radius: 10px;
  }
`

const CustomPagination = styled(Pagination)`
  button{
    color: #4AA398;
  }
`

const ProjectContainer = styled(Box)`
    display: flex;
    border-bottom: 1px solid #ddd;
    padding: 30px 0;

    &:last-child{
        border-bottom: 0;
    }
`

const ImageContainer = styled.div`
    width: 5rem;
    height: 5rem;
    position: relative;
    border-radius: 9px;
    box-shadow: 0px 3px 6px #00000029;
`
const StyledImage = styled(Image)`
    border-radius: 9px;
`

const Column = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`

const GrayText = styled(Text)`
  color : #949494;
`

const Proposals = ({projectId}) => {
    const router = useRouter();
 const projectDetails = {
    id: "1235670808857",
    bidders:[
        {
            name: "Samantha Davis",
            handle: "@sampleFreelancer",
            location: "Dubai, United Arab Emirates",
            rating: 4,
            category: "Photographer",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque.",
            photo: "img-avatar2.png",
            bid:{
                amount: 520,
                currency: "USD"
            }
        },
        {
            name: "Samantha Davis",
            handle: "@sampleFreelancer",
            location: "Dubai, United Arab Emirates",
            rating: 5,
            category: "Photographer",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque.",
            photo: "img-avatar2.png",
            bid:{
                amount: 590,
                currency: "USD"
            }
        },
        {
            name: "Samantha Davis",
            handle: "@sampleFreelancer",
            location: "Dubai, United Arab Emirates",
            rating: 2,
            category: "Photographer",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque.",
            photo: "img-avatar2.png",
            bid:{
                amount: 500,
                currency: "USD"
            }
        },
        {
            name: "Samantha Davis",
            handle: "@sampleFreelancer",
            location: "Dubai, United Arab Emirates",
            rating: 3,
            category: "Photographer",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque.",
            photo: "img-avatar2.png",
            bid:{
                amount: 500,
                currency: "USD"
            }
        },
        {
            name: "Samantha Davis",
            handle: "@sampleFreelancer",
            location: "Dubai, United Arab Emirates",
            rating: 5,
            category: "Photographer",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque.",
            photo: "img-avatar2.png",
            bid:{
                amount: 650,
                currency: "USD"
            }
        },
        {
            name: "Samantha Davis",
            handle: "@sampleFreelancer",
            location: "Dubai, United Arab Emirates",
            rating: 3,
            category: "Photographer",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque.",
            photo: "img-avatar2.png",
            bid:{
                amount: 600,
                currency: "USD"
            }
        },
        {
            name: "Samantha Davis",
            handle: "@sampleFreelancer",
            location: "Dubai, United Arab Emirates",
            rating: 2,
            category: "Photographer",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque.",
            photo: "img-avatar2.png",
            bid:{
                amount: 500,
                currency: "USD"
            }
        }
    ]
  }

 const imgPath = '/assets/img/avatars/';

  return (    
    <MainWrapper>
        {projectDetails.bidders.map((bidder,idx)=> {
            return <ProjectContainer key={'project-bid-'+idx}>
                <Row sx={{gap:'2rem'}}>
                    <Column>
                        <ImageContainer>
                            <StyledImage
                            src={bidder?.client?.displayPhoto ? imgPath+bidder?.client?.displayPhoto : imgPath+'img-avatar2.png'}
                            layout="fill"
                            alt="icon-img"
                            />
                        </ImageContainer>
                    </Column>
                    <Column>
                        <Row sx={{gap:'14px',justifyContent:'space-between'}}>
                            <Box>
                                <Text color="red"><b>{bidder?.name}</b></Text>
                                <GrayText> ({bidder?.handle}) </GrayText>
                            </Box>
                            <Box>
                                <Text color="green"><b>{bidder?.bid?.amount} {bidder?.bid?.currency}</b></Text>
                            </Box>
                        </Row>
                        <Row sx={{gap:'8px'}}>
                            <LocationIcon/>
                            <GrayText> ({bidder?.location}) </GrayText>
                        </Row>
                        <Row>
                            <StarRating data={bidder?.rating} sz="lg"/>
                        </Row>
                        <Row>
                            <GrayText>{bidder?.description}</GrayText>
                        </Row>
                    </Column>
                </Row>
            </ProjectContainer>
        })}
        <Box sx={{display:'flex', justifyContent:'flex-end',marginBottom:'2rem'}}>
            <Stack spacing={2}>
                <CustomPagination count={10}/>
            </Stack>
        </Box>
    </MainWrapper>
  )
}

export default Proposals;