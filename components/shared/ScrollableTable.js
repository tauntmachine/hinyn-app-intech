import { Box } from '@mui/material';
import styled from '@emotion/styled';
import CategoryIcon from '../shared/categories/Category';
import { RightChevronIcon, AddIcon } from './Icon';
import Category3 from './categories/Category3';
import { useState } from 'react';

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 370px;
  // padding: 20px;
  background: #ffffff;
  border-radius: 0 0 20px 20px;
`;

const Row = styled.div`
  color: #939393;
  font-size: 16px;
  background-color: #ffffff;
  padding: 16px 32px;
  display: flex;

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
  flex-direction: column;
  overflow: auto;
  height: 370px;
  background: #ffffff;
  border-radius: 0 0 20px 20px;
`;
const iconMap = {
  'right-arrow': <RightChevronIcon variant="green" />,

  'add-icon': <AddIcon variant="red" />,
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
}) => {
  // const [selectedCategory, setSelectedCategory] = useState(null);
  console.log(selectedCategory);
  return (
    <>
      <Row className="header">{title}</Row>
      {type && type === 'categories' ? (
        <ScrollDiv>
          {/* <StyledBox> */}
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
          {/* </StyledBox> */}
        </ScrollDiv>
      ) : type === 'category_skills' ? (
        <StyledBox>
          {data &&
            data.map((skill, idx) => (
              <Row
                key={'category-skill-' + idx}
                onClick={() => onSkillClick(skill)}
              >
                <span> {skill?.title} </span>
                {endAdornment && iconMap[endAdornment]}
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
    </>
  );
};

export default ScrollableTable;
