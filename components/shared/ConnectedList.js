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

const ConnectedList = () => {
  const projects = [
    {
        title: 'Lorem Ipsum Dolor sit Amet 1',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        timestamp:'1 minute ago',
        bids:21,
        bidPrice:{
            average: 92,
            max: 100,
            currency: 'USD'
        },
        categories:[
            'Photography',
            'Make-up Artist',
        ],
        rating: 4
    },
    {
        title: 'Lorem Ipsum Dolor sit Amet 2',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        timestamp:'1 minute ago',
        bids:21,
        bidPrice:{
            average: 92,
            max: 100,
            currency: 'USD'
        },
        categories:[
            'Photography',
            'Make-up Artist',
        ],
        rating: 5
    },
    {
        title: 'Lorem Ipsum Dolor sit Amet 3',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        timestamp:'1 minute ago',
        bids:21,
        bidPrice:{
            average: 92,
            max: 100,
            currency: 'USD'
        },
        categories:[
            'Photography',
            'Make-up Artist',
            'Videography',
        ],
        rating: 3
    },
    {
        title: 'Lorem Ipsum Dolor sit Amet 4',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        timestamp:'1 minute ago',
        bids:21,
        bidPrice:{
            average: 92,
            max: 100,
            currency: 'USD'
        },
        categories:[
            'Photography',
            'Videography',
        ],
        rating: 2
    },
    {
        title: 'Lorem Ipsum Dolor sit Amet 5',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
        timestamp:'1 minute ago',
        bids:21,
        bidPrice:{
            average: 92,
            max: 100,
            currency: 'USD'
        },
        categories:[
            'Photography',
        ],
        rating: 5
    },
  ];  
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
                            <Text color="green">${project?.bidPrice.average} {project?.bidPrice?.currency}</Text>
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
                        <GreenButton size="small">Place a bid</GreenButton>
                    </Row>
                </Row>
            </ProjectContainer>
        })}
  </Box>      
  )
}

export default ConnectedList;