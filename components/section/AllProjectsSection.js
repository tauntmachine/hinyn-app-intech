import SimpleSearchBar from '../shared/searchBar/SimpleSearchBar';
import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import styled from '@emotion/styled';
import ContentBox from '../shared/ContentBox';
import ConnectedList from '../shared/ConnectedList';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { useProject } from '../../src/store';
import Text from '../shared/Typography';
import ProjectFilterForm from '../forms/ProjectFilterForm';

const SearchBarContainer = styled.div`
  background: #d8d8d8;
  box-shadow: inset 0px 3px 20px #00000029;
  padding: 54px 0;
  @media (max-width: 769px) {
    padding: 30px 0;
  }
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
  max-height: 85vh;
`;

const CustomPagination = styled(Pagination)`
  button {
    color: #4aa398;
  }
`;
const ContainerCustom = styled.div`
  width: 75%;

  @media (max-width: 769px) {
    width: 100%;
  }
  margin: 0 auto;
  padding: 3rem 0;
`;
const StyledGrid = styled(Grid)`
  @media (max-width: 769px) {
    display: none;
  }
`;
const StyledGrid2 = styled.div`
  display: none;
  @media (max-width: 769px) {
    display: flex;
    justify-content: center;
  }
`;
const StyledGrid3 = styled(Grid)`
  @media (max-width: 769px) {
    display: none;
  }
`;
const AllProjectsSection = ({ handleScreenChange }) => {
  const [searchInput, setSearchInput] = useState('');
  const { project, setProjectFilter } = useProject();

  const handleSearchValue = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    setProjectFilter(e.target.value);
  };

  return (
    <Box sx={{ background: '#EBEBEB', height: 'auto' }}>
      <SearchBarContainer>
        <Text style={{ margin: 'auto', fontWeight: 'bold', fontSize: '34px' }}>
          Browse
        </Text>
        <VerticalDivider />
        <SimpleSearchBar
          handleSearchValue={handleSearchValue}
          placeholderText="Search for projects"
        />
      </SearchBarContainer>
      <Box>
        <ContainerCustom>
          <StyledGrid3 container columnSpacing={4}>
            <StyledGrid item xs={4}>
              <ContentBox
                hasHeader={true}
                headerTitle="Filters"
                headerColor={'darkGray'}
                hasBodyIcon={false}
                noPadding={true}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <ProjectFilterForm />
                </Box>
              </ContentBox>
            </StyledGrid>
            <Grid item xs={8}>
              <ContentBox
                hasHeader={true}
                headerTitle="Results"
                hasBodyIcon={false}
                noPadding={true}
              >
                <ResultsBox>
                  <ConnectedList projects={project} />
                </ResultsBox>
              </ContentBox>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginBottom: '2rem',
                }}
              >
                <Stack spacing={2}>
                  <CustomPagination count={10} />
                </Stack>
              </Box>
            </Grid>
          </StyledGrid3>
          <StyledGrid2>
            <StyledGrid item xs={4}>
              <ContentBox
                hasHeader={true}
                headerTitle="Filters"
                headerColor={'darkGray'}
                hasBodyIcon={false}
                noPadding={true}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <ProjectFilterForm />
                </Box>
              </ContentBox>
            </StyledGrid>
            <Grid item xs={8}>
              <ContentBox
                hasHeader={true}
                headerTitle="Results"
                hasBodyIcon={false}
                noPadding={true}
              >
                <ResultsBox>
                  <ConnectedList projects={project} />
                </ResultsBox>
              </ContentBox>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginBottom: '2rem',
                }}
              >
                <Stack spacing={2}>
                  <CustomPagination count={10} />
                </Stack>
              </Box>
            </Grid>
          </StyledGrid2>
        </ContainerCustom>
      </Box>
    </Box>
  );
};

export default AllProjectsSection;
