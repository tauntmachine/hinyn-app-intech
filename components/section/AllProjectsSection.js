import SimpleSearchBar from "../shared/searchBar/SimpleSearchBar";
import { Box, Typography,Grid, Container} from "@mui/material";
import { useState } from "react";
import styled from "@emotion/styled";
import ContentBox from "../shared/ContentBox";
import ConnectedList from "../shared/ConnectedList";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ProjectFilterForm from '../forms/ProjectFilterForm';
import {useProject} from '../../src/store';


const SearchBarContainer = styled.div`
  background: #D8D8D8;
  box-shadow: inset 0px 3px 20px #00000029;
  padding: 54px 0;
  display: flex;
  flex-direction: column;
`

const VerticalDivider = styled.div`
  height: 2rem;
`
const ResultsBox = styled(Box)`
  display:flex;
  flex-direction:column;
  overflow:auto;
  max-height: 85vh;
`

const CustomContentBox = styled(ContentBox)`

`

const CustomPagination = styled(Pagination)`
  button{
    color: #4AA398;
  }
`


const AllProjectsSection = ({handleScreenChange}) => {
  const [searchInput, setSearchInput] = useState("");
  const {project, filter, setFilter} = useProject();

  console.log("project",project)

  const handleSearchValue = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    setFilter(e.target.value)
  };

  return (
    <Box sx={{background:'#EBEBEB', height:'auto'}}>
      <SearchBarContainer>
      <Typography component="h1" variant="h4" align="center">Browse</Typography>
        <VerticalDivider />
        <SimpleSearchBar handleSearchValue={handleSearchValue} placeholderText="Search for projects"/>
      </SearchBarContainer>
      <Box>
        <Container sx={{marginTop:'4rem'}}>
            <Grid container columnSpacing={4}>
                <Grid item xs={4}>
                  <ContentBox hasHeader={true} headerTitle="Filters" headerColor={"gray"} hasBodyIcon={false} noPadding={true}>
                    <Box sx={{display:'flex',flexDirection:'column'}}>
                      <ProjectFilterForm />
                    </Box>
                  </ContentBox>
                </Grid>
                <Grid item xs={8}>
                  <CustomContentBox hasHeader={true} headerTitle="Results" hasBodyIcon={false} noPadding={true}>
                      <ResultsBox>
                        <ConnectedList projects={project}/>
                      </ResultsBox>
                  </CustomContentBox>
                  <Box sx={{display:'flex', justifyContent:'flex-end',marginBottom:'2rem'}}>
                      <Stack spacing={2}>
                        <CustomPagination count={10}/>
                      </Stack>
                  </Box>
                </Grid>       
            </Grid>
        </Container>
    </Box>
    </Box>
  )
}

export default AllProjectsSection