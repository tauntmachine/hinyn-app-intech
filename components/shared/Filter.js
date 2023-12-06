import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import Modal2 from './Modal2';
import DropdownO from './DropdownO';
import { Container } from '@mui/material';
import ClickableStarRating from './ClickableStarRating';
import { getCategories, getSkills } from '../forms/formService';
import { useFreelancer } from '../../src/store';
// import { locations, budget } from '../models/filters.models';
import axios from 'axios';
import { origin } from '../../src/config';

const FilterButton = styled.span`
  background: transparent;
  color: #949494;
  padding: 0.5rem 1rem;
  border-radius: 19px;
  cursor: pointer;
  transition: all 0.25s ease-in-out;

  &:hover {
    border: 1px solid #0f7669;
    background: #0f76691a;
    color: #0f7669;
  }
`;

const Item = styled.div`
  font-family: 'DM Sans', sans-serif !important;
  display: flex;
  flex-direction: column;
`;
const ItemLabel = styled.span`
  font-size: 14px;
  color: #3d3d3d;
  padding-vertical: 10px;
`;
function Filter() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const locations = [
    { title: 'Dubai', value: 'Dubai' },

    { title: 'Sharjah', value: 'Sharjah' },
    { title: 'America', value: 'America' },
    { title: 'UAE', value: 'UAE' },
    { title: 'Saudi', value: 'Saudi' },
    { title: 'Pakistan', value: 'Pakistan' },
  ];
  const budget = [
    {
      title: '0-free collaboration',
      value: '0',
    },
    {
      title: '1-100',
      value: '1',
    },
    {
      title: '101-200',
      value: '101',
    },
    {
      title: '201-500',
      value: '201',
    },
    {
      title: '500+',
      value: '500',
    },
  ];
  const { freelancer, filter, setFilter } = useFreelancer();

  const handleClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   const getCategories = async () => {
  //     // const jwt = localStorage.getItem('hinyn-cjwt');
  //     console.log(origin + '/categories?populate=*');
  //     const response = await axios
  //       .get(origin + '/categories?populate=*', {
  //         withCredentials: true,
  //         crossDomain: true,
  //       })
  //       .then(async (response) => {
  //         if (response.data) {
  //           return { status: true, data: response.data };
  //         } else {
  //           return { status: false, data: response.data.message };
  //         }
  //       })
  //       .catch(function (error) {
  //         return { status: false, data: error };
  //       });

  //     // console.log(response);
  //     return response;
  //   };

  //   getCategories();
  // });

  useEffect(() => {
    getCategories().then((result) => {
      if (result?.data) {
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
            setSelectedSkill(() => res[0]?.key);
          }
        });
      }
    });
  }, [open]);

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
      console.log('Filter Skills', skills);
    }
    setSelectedCategory(() => val);
  };

  const handleSkillsChange = (val) => {
    setSelectedSkill(() => val);
  };

  const handleLocationChange = (val) => {
    setSelectedLocation(() => val);
  };

  const handleBudgetChange = (val) => {
    setSelectedBudget(() => val);
  };
  const handleSubmit = () => {
    setFilter({
      category: selectedCategory,
      skill: selectedSkill,
      location: selectedLocation,
      budget: selectedBudget,
    });
    console.log('filter', filter);
    handleClose();
  };
  return (
    <>
      <FilterButton onClick={() => setOpen(true)}>Filters</FilterButton>
      <Modal2
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        isOpen={open}
        title="Filters"
        description="desc"
        hasHeader={true}
        hasFooter={true}
        Widthmax={true}
      >
        <Container>
          <Item>
            <ItemLabel>Category</ItemLabel>
            <DropdownO
              hasLabel={false}
              items={categories}
              setHandleOnChange={handleCategoryChange}
              selected={selectedCategory}
              width="100%"
              type="standard"
              color="red"
              defaultLabel="Select Categories"
            />
          </Item>
          <Item>
            <ItemLabel>Skills</ItemLabel>
            <DropdownO
              hasLabel={false}
              items={skills}
              setHandleOnChange={handleSkillsChange}
              selected={selectedSkill}
              width="100%"
              type="standard"
              color="red"
              defaultLabel="Select Skills"
            />
          </Item>
          <Item>
            <ItemLabel>Location</ItemLabel>
            <DropdownO
              hasLabel={false}
              items={locations}
              setHandleOnChange={handleLocationChange}
              selected={selectedLocation}
              width="100%"
              type="standard"
              color="red"
              defaultLabel="Select Location"
            />
          </Item>
          <Item>
            <ItemLabel style={{ fontWeight: 100 }}>Budget</ItemLabel>
            <DropdownO
              hasLabel={false}
              items={budget}
              setHandleOnChange={handleBudgetChange}
              selected={selectedBudget}
              width="100%"
              type="standard"
              color="red"
              defaultLabel="Select Budget Range"
            />
          </Item>
          <Item>
            <ItemLabel>Rating</ItemLabel>
            <ClickableStarRating />
          </Item>
        </Container>
      </Modal2>
    </>
  );
}

export default Filter;
