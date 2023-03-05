import { Box} from "@mui/material";
import styled from "@emotion/styled";
import Text from "../Typography";
import Image from "next/image";
import { LocationIcon } from "../Icon";
import StarRating from "../StarRating";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getBidData, getProposalsOfBid, getProposals } from "../../forms/formService";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


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

    const [proposals, setProposals] = useState([]);

 const imgPath = '/assets/img/avatars/';

 useEffect(()=>{
   
    getProposalsOfBid(projectId).then((res)=>{
        setProposals(()=>[]);
        if(res?.data?.data){ 
          let temp = res?.data?.data?.attributes?.proposals;
          if(temp?.data && temp?.data?.length > 0){
            temp?.data?.map((item)=>{
                setProposals((prevData)=> prevData.concat(item?.attributes))
                
            })
          }
        }
      })

 },[projectId])
  return (    
    <MainWrapper>
        {proposals && proposals.map((proposal,idx)=> {
            let bidder = proposal?.client?.data?.attributes;
            return <ProjectContainer key={'project-bid-'+idx}>
                <Row sx={{gap:'2rem',width:'100%'}}>
                    <Column sx={{flexBasis:'10%'}}>
                        <ImageContainer>
                            <StyledImage
                            src={bidder?.displayPhoto ? imgPath+bidder?.displayPhoto : imgPath+'img-avatar2.png'}
                            layout="fill"
                            alt="icon-img"
                            />
                        </ImageContainer>
                    </Column>
                    <Column sx={{flexBasis:'90%'}}>
                        <Row sx={{gap:'14px',justifyContent:'space-between'}}>
                            <Box sx={{display:'flex'}}>
                                <Text color="red"><b>{bidder?.firstName} {bidder?.lastName}</b></Text>
                                <GrayText> {bidder?.instagramProfile ?? ''} </GrayText>
                            </Box>
                            <Box>
                                <Text color="green"><b>{proposal?.budget} {proposal.currency ?? 'AED'}</b></Text>
                            </Box>
                        </Row>
                        <Row sx={{gap:'8px'}}>
                            <LocationIcon/>
                            <GrayText> {bidder?.city}, {bidder?.country ?? 'UAE'}</GrayText>
                        </Row>
                        <Row>
                            <Box sx={{display:'flex'}}>
                                <StarRating data={bidder?.rating ?? 3} sz="lg"/>
                                <GrayText> {bidder?.instagramProfile ?? ''} </GrayText>
                            </Box>
                        </Row>
                        <Row>
                            <GrayText>{proposal?.description}</GrayText>
                        </Row>
                    </Column>
                </Row>
            </ProjectContainer>
        })}
         {
            (proposals && proposals.length === 0) ? <ProjectContainer><Text color="red">No proposals for this project yet.</Text></ProjectContainer> : null
         }
        {
            (proposals && proposals.length > 9)
            ?   <Box sx={{display:'flex', justifyContent:'flex-end',marginBottom:'2rem'}}>
                    <Stack spacing={2}>
                        <CustomPagination count={10}/>
                    </Stack>
                </Box>
            : null
        }
       
    </MainWrapper>
  )
}

export default Proposals;