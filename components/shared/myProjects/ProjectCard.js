import styled from "@emotion/styled";
import { Box, Grid, Container } from "@mui/material";
import breakpoint from "../../utils/Breakpoints";
import Pill from "../Pill";
import Text,{GrayText} from "../Typography";
import {GreenButton} from "../Button";
import { useRouter } from "next/router";

const StyledCard = styled.div`
    min-height:26rem;
    box-shadow:1px 1px 10px #aaaaaa20;
    border-radius: 25px;
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 2rem;
    row-gap: 0.75rem;
    background-repeat: no-repeat;
    background-position: bottom right;
    user-select:none;
    height:100%;
    background-color: #FFFFFF;
    position: relative;
    opacity: ${props => (props.status === "cancelled" || props.status === "completed") ? '0.5' : '1'};
    

    @media ${breakpoint.device.lg}{
        margin:0 1rem;
    }
    @media ${breakpoint.device.sm}{
        margin:0;
    }
    &:hover, &:focus{
        box-shadow:1px 1px 10px #0F766950;
        transition: all 0.3s ease-in-out;
    }
`;

const Row = styled(Box)`
    display:flex;
    width:100%;
`

const VerticalDivider = styled.div`
    height: 2rem;
`

const StyledPill = styled.div`
    background: ${props => props.status === 'upcoming' ? '#ECF6F5' 
                            : props.status === 'active' ? '#FDF0EB' 
                            : props.status === 'completed' ? '#FFEEEF' 
                            :'#F0F0F0'};
    color: ${props => props.status === 'upcoming' ? '#4AA398' 
                            : props.status === 'active' ? '#E96E3F' 
                            : props.status === 'completed' ? '#FF5A5F' 
                            :'#7D7E7E'};
    border-radius: 13px;
    display: flex;
    padding: 0.5rem 1.25rem;
    font-size: 12px;
`

const StatusText = styled.div`
    text-transform: capitalize;
`


const ProjectCard = ({data}) => {

    const router = useRouter();

    const showProjectDetails = (projectId) => {
        router.push('/dashboard?screen=details&project='+projectId)
    }
  return (
    <StyledCard status={data?.status}>
        <Row sx={{justifyContent: 'center'}}>
            <StyledPill status={data?.status}>
                <StatusText> {data?.status} </StatusText>
            </StyledPill>
        </Row>
        <Row>
            <Container maxWidth="md">
                <Text color="red" size="large" align="center"><b>{data?.title}</b></Text>
            </Container>
        </Row>
        <Row sx={{justifyContent: 'center'}}>
            <GrayText size="small">Project ID {data?.projectId}</GrayText>
        </Row>
        <VerticalDivider />
        <Row sx={{justifyContent: 'space-between'}}>
            <Text>Price</Text>
            <Text color="green">{data?.price} {data?.currency}</Text>
        </Row>
        <Row sx={{justifyContent: 'space-between'}}>
            <Text>Location</Text>
            <Text color="green">{data?.location}</Text>
        </Row>
        <Row sx={{justifyContent: 'space-between'}}>
            <Text>Date</Text>
            <Text color="green">{data?.date}</Text>
        </Row>
        <VerticalDivider />
        <Row sx={{justifyContent: 'center'}}>
            <GreenButton variant="outlined" onClick={()=>showProjectDetails(data?.projectId)}> View Project </GreenButton>
        </Row>
    </StyledCard>
  )
}

export default ProjectCard