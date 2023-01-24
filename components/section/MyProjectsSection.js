import { Container, Box, Grid, Pagination, Stack} from "@mui/material";
import ProjectCard from "../shared/myProjects/ProjectCard";
import styled from "@emotion/styled";
import Dropdown from "../shared/Dropdown";
import { useRouter } from "next/router";


const CustomPagination = styled(Pagination)`
  button{
    color: #4AA398;
  }
`

const MyProjectsSection = () => {
    const router = useRouter();
    
    const myProjects = [
        {
            projectId: "1235670808857",
            status: "upcoming",
            title: "Kate and Joeys Spanish Wedding",
            price: 500,
            currency: "USD",
            location: "Fairmont, The Palm Dubai",
            date: "Nov 7, 2023"
        },
        {
            projectId: "1235670808857",
            status: "active",
            title: "Kate and Joeys Spanish Wedding",
            price: 500,
            currency: "AED",
            location: "Fairmont, The Palm Dubai",
            date: "Nov 7, 2023"
        },
        {
            projectId: "1235670808857",
            status: "completed",
            title: "Kate and Joeys Spanish Wedding",
            price: 500,
            currency: "USD",
            location: "Fairmont, The Palm Dubai",
            date: "Nov 7, 2023"
        },
        {
            projectId: "1235670808857",
            status: "cancelled",
            title: "Kate and Joeys Spanish Wedding",
            price: 500,
            currency: "AED",
            location: "Fairmont, The Palm Dubai",
            date: "Nov 7, 2023"
        },
        {
            projectId: "1235670808857",
            status: "upcoming",
            title: "Kate and Joeys Spanish Wedding",
            price: 500,
            currency: "USD",
            location: "Fairmont, The Palm Dubai",
            date: "Nov 7, 2023"
        },
        {
            projectId: "1235670808857",
            status: "active",
            title: "Kate and Joeys Spanish Wedding",
            price: 500,
            currency: "AED",
            location: "Fairmont, The Palm Dubai",
            date: "Nov 7, 2023"
        },
        {
            projectId: "1235670808857",
            status: "cancelled",
            title: "Kate and Joeys Spanish Wedding",
            price: 500,
            currency: "USD",
            location: "Fairmont, The Palm Dubai",
            date: "Nov 7, 2023"
        },
        {
            projectId: "1235670808857",
            status: "completed",
            title: "Kate and Joeys Spanish Wedding",
            price: 500,
            currency: "USD",
            location: "Fairmont, The Palm Dubai",
            date: "Nov 7, 2023"
        }
    ]

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
    ]
    


  return (
    <Box sx={{background:'#EBEBEB', height:'auto'}}>
        <Container sx={{display:'flex',gap:'1rem',marginTop:'1rem'}} maxWidth="xl">
            <Dropdown hasLabel={true} label="Show" items={showOptions}/>
            <Dropdown hasLabel={true} label="Sort" items={sortOptions}/>
        </Container>
        <Container sx={{paddingBottom:'2rem'}} maxWidth="lg">
            <Grid container spacing={4} sx={{marginTop:'0.25rem'}}>
            {myProjects.map( (card,idx) => (
                <Grid key={'project-card-'+idx} item xs={12} sm={6} lg={4} sx={{position:'relative'}}>
                    <ProjectCard data={card} />
                </Grid>
                ))       
            }
        </Grid>
        {myProjects && myProjects.length > 9
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

export default MyProjectsSection;