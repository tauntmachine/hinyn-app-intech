import { Box } from '@mui/material';
import styled from '@emotion/styled';
import CategoryIcon from '../shared/categories/Category';
import { RightChevronIcon, AddIcon, Check } from './Icon';
import Category3 from './categories/Category3';
import { useState } from 'react';

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 350px;

  background: #ffffff;

  &::-webkit-scrollbar {
    width: 3px; /* width of the scrollbar */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #eb4c60; /* color of the scrollbar thumb */
  }
`;

const Row = styled.div`
  color: #939393;
  font-size: 16px;
  background-color: #ffffff;
  padding: 16px 32px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dddddd30;
  // .selectedCategory {
  //   background-color: red;
  //   color: #ffffff;
  // }
  &.header {
    color: #ffffff;
    background-color: #24796e;
    border-radius: 13px 13px 0 0;
  }

  &:hover:not(.header) {
    background-color: #fff4f5;
  }
`;

const TextWithIcon = styled.div`
  display: flex;
  column-gap: 16px;
  align-items: center;
`;
const ScrollDiv = styled.div`
  display: flex;
  flex-direction column;
  overflow: auto;
  height: 20px;
  background: #ffffff;
  border-radius: 0 0 20px 20px;
`;
const iconMap = {
  'right-arrow': <RightChevronIcon variant="green" />,

  'add-icon': <AddIcon variant="red" />,
  check: <Check variant="green" />,
};

const ScrollableTable = ({
  data,
  title,
  startAdornment,
  endAdornment,
  type,
  onCategoryClick,
  onSkillClick,
  selectedCategory,
  skillIsSelected,
  selectedSkills,
}) => {
  console.log(selectedCategory);
  return (
    <>
      <Row className="header">{title}</Row>
      {type && type === 'categories' ? (
        <StyledBox>
          {data &&
            data.map((category, idx) => (
              <Row
                key={'category-' + idx}
                onClick={() => onCategoryClick(idx)}
                selected={idx === selectedCategory}
              >
                {startAdornment === 'icon' ? (
                  <TextWithIcon>
                    {/* <CategoryIcon data={category} hasLabel={false} /> */}
                    <Category3 data={category} />
                    {/* <span> {category?.title}</span> */}
                  </TextWithIcon>
                ) : (
                  <span> {category?.title} </span>
                )}
                {endAdornment && iconMap[endAdornment]}
              </Row>
            ))}
        </StyledBox>
      ) : type === 'category_skills' ? (
        <StyledBox>
          {data &&
            data.map((skill, idx) => (
              <Row
                key={'category-skill-' + idx}
                onClick={() => onSkillClick(skill)}
              >
                <span> {skill?.title} </span>
                {/* {endAdornment && iconMap[endAdornment]} */}
                {/* {endAdornment && !skillIsSelected ? iconMap[endAdornment] : ''} */}
                {/* {selectedSkills.includes(skill) &&
                  endAdornment &&
                  iconMap[endAdornment]} */}
                {
                  selectedSkills.includes(skill) // Check if the skill is selected
                    ? iconMap['check'] // Render 'RightChevronIcon' if selected
                    : iconMap['add-icon'] // Render 'add-icon' by default
                }
              </Row>
            ))}
        </StyledBox>
      ) : (
        <StyledBox>
          {data &&
            data.map((skill, idx) => (
              <Row key={'skill-' + idx}>
                <span> {skill?.title} </span>
              </Row>
            ))}
        </StyledBox>
      )}
      <ScrollDiv></ScrollDiv>
    </>
  );
};

export default ScrollableTable;
