import SimpleSearchBar from '../shared/searchBar/SimpleSearchBar';
import { Box, Typography, Grid, Container } from '@mui/material';
import { useState } from 'react';
import styled from '@emotion/styled';
import ContentBox from '../shared/ContentBox';
import ConnectedList from '../shared/ConnectedList';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { useFreelancer, useProject } from '../../src/store';
import FreelancerConnectedList from '../shared/FreelancerConnectedList';
import Text from '../shared/Typography';

import ProjectFilterForm from '../forms/ProjectFilterForm';

const SearchBarContainer = styled.div`
  background: #d8d8d8;
  box-shadow: inset 0px 3px 20px #00000029;
  padding: 54px 0;
  display: flex;
  flex-direction: column;
`;

const VerticalDivider = styled.div`
  height: 2rem;
`;
const ResultsBox = styled(Box)`
  display: flex;
  flex-direction: column;
  overflow: auto;
  max-height: 150vh;
`;

const CustomContentBox = styled(ContentBox)``;

const CustomPagination = styled(Pagination)`
  button {
    color: #4aa398;
  }
`;

const MyFreelancersSection = () => {
  const [searchInput, setSearchInput] = useState('');
  const { freelancer, filter, setFilter } = useFreelancer();

  const handleSearchValue = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    setFilter(e.target.value);
  };

  return (
    <Box sx={{ background: '#EBEBEB', height: 'auto' }}>
      <SearchBarContainer>
        <Text fontSize="31px" fontWeight="bold" margin="auto">
          Browse
        </Text>
        <VerticalDivider />
        <SimpleSearchBar
          handleSearchValue={handleSearchValue}
          iconColor="red"
          placeholderText="Search for freelancers"
        />
      </SearchBarContainer>
      <Box>
        <Container sx={{ marginTop: '4rem' }}>
          <Grid container columnSpacing={4}>
            <Grid item xs={4}>
              <ContentBox
                hasHeader={true}
                headerTitle="Filters"
                headerColor={'darkGray'}
                hasBodyIcon={false}
                noPadding={true}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <ProjectFilterForm filterType="freelancer" />
                </Box>
              </ContentBox>
            </Grid>
            <Grid item xs={8}>
              <CustomContentBox
                hasHeader={true}
                headerTitle="Results"
                hasBodyIcon={false}
                noPadding={true}
                giveh={true}
                headerColor="red"
              >
                <ResultsBox>
                  <FreelancerConnectedList />
                </ResultsBox>
              </CustomContentBox>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginBottom: '2rem',
                }}
              >
                {/* <Stack spacing={2}>
                  <CustomPagination count={10} />
                </Stack> */}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default MyFreelancersSection;
