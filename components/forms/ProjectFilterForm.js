import { useState, useEffect } from 'react';
import {
  CssBaseline,
  Grid,
  Box,
  InputAdornment,
  IconButton,
  TextField,
  Autocomplete,
} from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import { GreenButton } from '../shared/Button';
import { locations, budget } from '../models/filters.models';
import { getCategories } from './formService';
import { useProject } from '../../src/store';

import { StaticPill } from '../shared/Pill';
import { CloseIcon, OutlineSearchIcon } from '../shared/Icon';
import DropdownO from '../shared/DropdownO';
// import { truncate } from 'fs';

const CustomTextField = styled(TextField)`
  background: transparent;
  border-radius: 4px;
  padding: 8px;

  input {
    padding: 12px;
    color: #4aa398;
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }

  &:hover {
    background: ${(props) =>
      props.type === 'standard' ? '#ffffff' : 'transparent'};
  }
`;

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 20px;
  padding: 16px 32px;
`;

const Error = styled.p`
  color: red;
  font-size: 0.75rem;
  font-family: 'Roboto', sans-serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  overflow: auto;
  padding: 0.5rem;
`;

const PillsContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 1rem 0.5rem;
`;

const StyledStaticPill = styled(StaticPill)`
  background-color: #d8d8d8;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
`;

const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
`;

function ProjectFilterForm() {
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [categorySkills, setCategorySkills] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const { setProjectFilter } = useProject();

  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    getCategories().then((result) => {
      if (result?.data && !isFetched) {
        setCategories(() => []);
        result?.data?.data.map((item, idx) => {
          const temp = { id: item.id };
          setCategories((prev) =>
            prev.concat({
              ...item?.attributes,
              ...temp,
            })
          );
          if (idx === 0) {
            setSelectedCategory(() => item.attributes.key);
            const res = item?.attributes?.skills?.data.map((skill) => {
              return {
                id: skill.id,
                key: skill?.attributes?.slug,
                ...skill?.attributes,
              };
            });
            setSkills(() => res);
          }
        });
      }
      setIsFetched(() => true);
    });
  }, [isFetched]);

  const handleCategoryChange = (val) => {
    const selected = categories.filter((category) => category.key === val);
    if (selected) {
      const res = selected[0]?.skills?.data.map((item) => {
        return {
          id: item.id,
          key: item?.attributes?.slug,
          ...item?.attributes,
        };
      });
      setSkills(() => res);
      setCategorySkills(() => res);
      setSelectedSkills(() => []);
    }
    setSelectedCategory(() => val);
  };

  const onSkillClick = (clickedSkillId, clickedSkill) => {
    let temp = [];
    if (selectedSkills.find((skill) => skill?.id === clickedSkillId)) {
      temp = selectedSkills.filter((skill) => skill?.id !== clickedSkillId);
    } else {
      temp = selectedSkills.concat(clickedSkill);
    }
    setSelectedSkills(() => temp);
  };

  const onSkillsSearchChange = (e) => {
    const clickedSkill = categorySkills.find(
      (skill) => skill.title === e.target.textContent
    );
    onSkillClick(clickedSkill?.id, clickedSkill);
  };

  const onChangeLocation = (location) => {
    setSelectedLocation(location);
  };

  const onChangeBudget = (budget) => {
    setSelectedBudget(budget);
  };

  const resetField = (field) => {
    if (field === 'budget') setSelectedBudget(() => undefined);
    else if (field === 'location') setSelectedLocation(() => undefined);
    else if (field === 'category') setSelectedCategory(() => '');
    else if (field === 'skills') setSelectedSkills(() => []);
  };

  const handleFilter = (event) => {
    event.preventDefault();

    setProjectFilter({
      category: selectedCategory,
      // skill: selectedSkills,
      // location: selectedLocation,
      // budget: selectedBudget,
    });
  };

  return (
    <>
      <Box>
        <CssBaseline />
        <FormContainer>
          <Box
            component="form"
            noValidate
            // onSubmit={submitHandler}
            sx={{ width: '100%' }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text>Budget</Text>
                  <Text
                    color="green"
                    style={{ cursor: 'pointer' }}
                    onClick={() => resetField('budget')}
                  >
                    Clear
                  </Text>
                </Box>
                <DropdownO
                  hasLabel={false}
                  items={budget}
                  width="100%"
                  type="outlined"
                  selected={selectedBudget}
                  setHandleOnChange={onChangeBudget}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} xs={{ mt: 4 }}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: '15px',
                  }}
                >
                  <Text>Categories </Text>
                  <Text
                    color="green"
                    style={{ cursor: 'pointer' }}
                    onClick={() => resetField('category')}
                  >
                    Clear
                  </Text>
                </Box>
                {categories?.length > 0 && (
                  <DropdownO
                    hasLabel={false}
                    items={categories}
                    width="100%"
                    type="outlined"
                    selected={selectedCategory}
                    setHandleOnChange={handleCategoryChange}
                  />
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: '15px',
                  }}
                >
                  <Text>Skills</Text>
                  <Text
                    color="green"
                    style={{ cursor: 'pointer' }}
                    onClick={() => resetField('skills')}
                  >
                    Clear
                  </Text>
                </Box>
                <SearchContainer>
                  <Autocomplete
                    freeSolo
                    id="search-skills-input"
                    fullWidth
                    disableClearable
                    options={categorySkills.map((skill) => skill.title)}
                    onChange={onSkillsSearchChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder="Search skills here"
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton edge="end">
                                <OutlineSearchIcon className="icon" />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                  <PillsContainer>
                    {selectedSkills &&
                      selectedSkills.map((skill, id) => {
                        return (
                          <StyledStaticPill key={'category-skill-' + id}>
                            {skill?.title}
                            <StyledCloseIcon
                              variant="green"
                              onClick={() => onSkillClick(skill?.id, skill)}
                            />
                          </StyledStaticPill>
                        );
                      })}
                  </PillsContainer>
                </SearchContainer>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {locations && (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: '15px',
                      }}
                    >
                      <Text>Location</Text>
                      <Text
                        color="green"
                        style={{ cursor: 'pointer' }}
                        onClick={() => resetField('location')}
                      >
                        Clear
                      </Text>
                    </Box>
                    <DropdownO
                      hasLabel={false}
                      items={locations}
                      width="100%"
                      type="outlined"
                      selected={selectedLocation}
                      setHandleOnChange={onChangeLocation}
                    />
                  </>
                )}
              </Grid>
            </Grid>

            <ButtonContainer>
              <GreenButton size="small" onClick={handleFilter}>
                Filter
              </GreenButton>
            </ButtonContainer>
          </Box>
        </FormContainer>
      </Box>
    </>
  );
}

export default ProjectFilterForm;
