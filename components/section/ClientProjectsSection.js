import { Container, Box, Grid, Pagination, Stack} from "@mui/material";
import ProjectCard from "../shared/myProjects/ProjectCard";
import styled from "@emotion/styled";
import Dropdown from "../shared/Dropdown";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getBidsOfClient, getProposalsOfClient } from "../forms/formService";
import Text from "../shared/Typography";


const CustomPagination = styled(Pagination)`
  button{
    color: #4AA398;
  }
`

const NoDataContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`

const ClientProjectsSection = () => {
    const router = useRouter();
    const [clientBids, setClientBids] = useState([]);
    
    const sortOptions = [
        {
            title: 'Newest to Oldest',
            value: 'new-to-old'
        },
        {
            title: 'Oldest to Newest',
            value: 'old-to-new'
        },
        {
            title: 'Expired',
            value: 'expired'
        }
    ];

    const showOptions = [
        {
            title: 'All',
            value: 'all'
        },
        {
            title: 'Upcoming',
            value: 'upcoming'
        },
        {
            title: 'Active',
            value: 'active'
        },
        {
            title: 'Completed',
            value: 'completed'
        },
        {
            title: 'Cancelled',
            value: 'cancelled'
        }
    ];


    useEffect(()=>{
        getBidsOfClient().then((res)=>{
            setClientBids(()=>[]);
            if(res?.data?.data){ 
                res?.data?.data.map((item)=>{
                    let temp = {"id":item?.id, ...item?.attributes};
                    setClientBids((prevData)=> prevData.concat(item));
                });
            }
        });
      },[])
    


  return (
    <Box sx={{background:'#EBEBEB', height:'auto'}}>
        <Container sx={{display:'flex',gap:'1rem',marginTop:'1rem'}} maxWidth="xl">
            <Dropdown hasLabel={true} label="Show" items={showOptions}/>
            <Dropdown hasLabel={true} label="Sort" items={sortOptions}/>
        </Container>
        <Container sx={{paddingBottom:'2rem'}} maxWidth="lg">
            <Grid container spacing={4} sx={{marginTop:'0.25rem'}}>
            {clientBids.length > 0 && clientBids.map((bid, idx)=>{
                return (bid?.attributes?.status < 99 )&& <Grid key={'project-card-'+idx} item xs={12} sm={6} lg={4} sx={{position:'relative'}}>
                            <ProjectCard projectDetail={bid} budget={bid?.budget} />
                        </Grid>
            })}
            { clientBids && clientBids.length === 0 ? <NoDataContainer><Text color="red">No available data</Text></NoDataContainer> : null }
        </Grid>
        {clientBids && clientBids.length > 9
            ?  <Box sx={{display:'flex', justifyContent:"center", marginTop:'3rem'}}>
                    <Stack spacing={2}>
                        <CustomPagination count={10}/>
                    </Stack>
                </Box>
            : null
        }
        </Container>
    </Box>
  )
}

export default ClientProjectsSection;