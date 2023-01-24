import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Box, Container } from "@mui/material";
import Text from "./Typography";
import Pill from "./Pill";
import StarRating from "./StarRating";
import { GreenButton } from "./Button";

const ProjectContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #ddd;
    row-gap: 16px;
    padding: 32px;
`

const Row = styled(Box)`
    display: flex;
`
const Column = styled(Box)`
    display: flex;
    flex-direction: column;
`
const Title = styled.span`
    color: #EB4C60;
    font-weight: 600;
    font-size: 14px;
`
const SmallText  = styled.span`
    font-size: 12px;
    color : ${props => props.color === 'green' ? "#4AA398" : "#949494"};
`
const Desc = styled.div`
    overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 12px;
    color : ${props => props.color === 'green' ? "#4AA398" : "#949494"};
`

const ConnectedList = ({projects}) => {

  const router = useRouter();

  const showProjectDetails = (projectId) => {
    router.push('/dashboard?screen=details&project='+projectId)
  }
  return (
    <Box>
        {projects.map((project,idx)=> {
            return <ProjectContainer key={idx}>
                <Row sx={{justifyContent: 'space-between'}}>
                    <Column>
                        <Title>{project?.title}</Title>
                        <SmallText>{project?.bidPrice?.max}{project?.bidPrice?.currency}</SmallText>
                    </Column>
                    <Box sx={{gap:'1rem', display:'flex'}}>
                        <Column>
                            <SmallText><b>{project?.bids} Bids</b></SmallText>
                        </Column>
                        <Column sx={{alignItems:'flex-end'}}>
                            <Text color="green">${project?.bidPrice?.average} {project?.bidPrice?.currency}</Text>
                            <SmallText color="green">Average Bid</SmallText>
                        </Column>
                    </Box>
                </Row>
                <Row>
                    <Desc>{project?.desc}</Desc>
                </Row>
                <Row sx={{columnGap:'8px'}}>
                    {project?.categories?.map((category,id)=>{
                        return <Pill key={'pill'+id} color="green">{category}</Pill>
                    })}
                </Row>
                <Row sx={{justifyContent:'space-between',alignItems:'center'}}>
                    <Row sx={{columnGap:'16px'}}>
                        <StarRating data={project?.rating} sz="lg"/>
                        <SmallText>{project?.timestamp}</SmallText>
                    </Row>
                    <Row>
                        <GreenButton size="small" onClick={()=>showProjectDetails(project.id)}>Place a bid</GreenButton>
                    </Row>
                </Row>
            </ProjectContainer>
        })}
  </Box>      
  )
}

export default ConnectedList;