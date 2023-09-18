import { Container, Box, Grid, Pagination, Stack } from '@mui/material';
import ProjectCard from '../shared/myProjects/ProjectCard';
import styled from '@emotion/styled';
import Dropdown2 from '../shared/Dropdown2';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getBidsOfClient, getProposalsOfClient } from '../forms/formService';
import Text from '../shared/Typography';

const CustomPagination = styled(Pagination)`
  button {
    color: #4aa398;
  }
`;

const NoDataContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ClientProjectsSection = () => {
  const router = useRouter();
  const [clientBids, setClientBids] = useState([
    {
      title: 'Kate and Joeys spanish wedding',
      price: '3000',
      location: 'Fairmont, The palm Dubai',
      date: 'Nov, 12 2023',
    },
    {
      title: 'Kate and Joeys spanish wedding',
      price: '3000',
      location: 'Fairmont, The palm Dubai',
      date: 'Nov, 12 2023',
    },
    {
      title: 'Kate and Joeys spanish wedding',
      price: '3000',
      location: 'Fairmont, The palm Dubai',
      date: 'Nov, 12 2023',
    },
    {
      title: 'Kate and Joeys spanish wedding',
      price: '3000',
      location: 'Fairmont, The palm Dubai',
      date: 'Nov, 12 2023',
    },
    {
      title: 'Kate and Joeys spanish wedding',
      price: '3000',
      location: 'Fairmont, The palm Dubai',
      date: 'Nov, 12 2023',
    },
    {
      title: 'Kate and Joeys spanish wedding',
      price: '3000',
      location: 'Fairmont, The palm Dubai',
      date: 'Nov, 12 2023',
    },
  ]);

  const sortOptions = [
    {
      title: 'Newest to Oldest',
      value: 'new-to-old',
    },
    {
      title: 'Oldest to Newest',
      value: 'old-to-new',
    },
    {
      title: 'Expired',
      value: 'expired',
    },
  ];

  const showOptions = [
    {
      title: 'All',
      value: 'all',
    },
    {
      title: 'Upcoming',
      value: 'upcoming',
    },
    {
      title: 'Active',
      value: 'active',
    },
    {
      title: 'Completed',
      value: 'completed',
    },
    {
      title: 'Cancelled',
      value: 'cancelled',
    },
  ];

  //   useEffect(() => {
  //     getBidsOfClient().then((res) => {
  //       setClientBids(() => []);
  //       if (res?.data?.data) {
  //         res?.data?.data.map((item) => {
  //           let temp = { id: item?.id, ...item?.attributes };
  //           setClientBids((prevData) => prevData.concat(item));
  //         });
  //       }
  //     });
  //   }, []);

  return (
    <Box sx={{ background: '#EBEBEB', height: 'auto' }}>
      <Container
        sx={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1rem',
          marginLeft: '13rem',
          marginBottom: '10px',
        }}
        maxWidth="xl"
      >
        <Dropdown2 hasLabel={true} label="Show" items={showOptions} />
        <Dropdown2 hasLabel={true} label="Sort" items={sortOptions} />
      </Container>
      <Container sx={{ paddingBottom: '2rem' }} maxWidth="lg">
        <Grid container spacing={4} sx={{}}>
          {clientBids.map((bid, idx) => {
            return (
              <Grid
                key={'project-card-' + idx}
                item
                xs={12}
                sm={6}
                lg={4}
                sx={{ position: 'relative' }}
              >
                <ProjectCard projectDetail={bid} budget={bid?.budget} />
              </Grid>
            );
          })}
          {clientBids && clientBids.length === 0 ? (
            <NoDataContainer>
              <Text color="red">No available data</Text>
            </NoDataContainer>
          ) : null}
        </Grid>
        {
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '3rem',
            }}
          >
            <Stack spacing={2}>
              <CustomPagination count={3} />
            </Stack>
          </Box>
        }
      </Container>
    </Box>
  );
};

export default ClientProjectsSection;
