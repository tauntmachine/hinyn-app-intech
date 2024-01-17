import { Container, Box, Grid, Pagination, Stack } from '@mui/material';
import ProjectCard from '../shared/myProjects/ProjectCardClient';
import styled from '@emotion/styled';
import Dropdown2 from '../shared/Dropdown2';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getBidsOfClient } from '../forms/formService';
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
const ContainerCustom = styled.div`
  width: 82%;
  margin: auto;
  @media (max-width: 769px) {
    width: 92%;
  }
`;
const ContainerStyle = styled(Container)`
  @media (max-width: 769px) {
    flex-direction: column;
    gap: 0px;
    margin-top: 10px;
  }

  gap: 40px;
  margin-top: 30px;
`;
const ClientProjectsSection = () => {
  const [clientBids, setClientBids] = useState([]);

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

  useEffect(() => {
    getBidsOfClient().then((res) => {
      let resList = [];
      if (res?.data?.data) {
        res?.data?.data.map((item) => {
          let resObj = { id: item?.id, ...item?.attributes };
          resList = [...resList, resObj];
        });
        console.log('list -- ', resList[0]);
        setClientBids(resList);
      }
    });
  }, []);

  return (
    <Box sx={{ background: '#EBEBEB', height: 'auto' }}>
      <ContainerCustom>
        <ContainerStyle
          sx={{
            display: 'flex',
            gap: '2rem',
            marginTop: '3rem',
          }}
          maxWidth="xl"
        >
          <Dropdown2 hasLabel={true} label="Show" items={showOptions} />
          <Dropdown2 hasLabel={true} label="Sort" items={sortOptions} />
        </ContainerStyle>
        <Grid
          container
          columnSpacing={4}
          rowSpacing={3}
          sx={{ marginTop: '1.5rem' }}
        >
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
      </ContainerCustom>
    </Box>
  );
};

export default ClientProjectsSection;
