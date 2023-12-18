import styled from '@emotion/styled';
import breakpoint from '../../utils/Breakpoints';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { getApiSkillById, getCategories } from '../../forms/formService';
import { locations, budget } from '../../models/filters.models';

const DetailsContainer = styled.div`
  border: 1px solid #ebebeb;
  border-radius: 11px;
  margin: auto;
  margin-top: 0.5rem;
  max-width: 57%;
  background: #f8f8f8;
  border: 1px solid #eb4c60;
  box-shadow: 0px 3px 6px #eb4c603c;
  position: absolute;
  left: 0;
  right: 0;
  padding: 1.25rem 2.5rem;

  @media ${breakpoint.device.lg} {
    max-width: 37%;
  }
`;
const DetailsContainerList = styled.div`
  border: 1px solid #ebebeb;
  border-radius: 11px;

  margin-top: 0.5rem;
  margin-left: 35rem;
  max-width: 25%;
  background: #f8f8f8;
  border: 1px solid #eb4c60;
  box-shadow: 0px 3px 6px #eb4c603c;
  position: absolute;
  left: 0;
  right: 0;
  padding: 1.25rem 0rem;

  @media ${breakpoint.device.lg} {
    max-width: 37%;
  }
`;
const DetailsContainerList2 = styled.div`
  border: 1px solid #ebebeb;
  border-radius: 11px;

  margin-top: 0.5rem;
  margin-left: 52rem;
  max-width: 20%;
  background: #f8f8f8;
  border: 1px solid #eb4c60;
  box-shadow: 0px 3px 6px #eb4c603c;
  position: absolute;
  left: 0;
  right: 0;
  padding: 0.25rem 0rem;

  @media ${breakpoint.device.lg} {
    max-width: 37%;
  }
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 0.25rem;
  column-gap: 1rem;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const Text = styled.span`
  font-size: 14px;

  &.secondary {
    color: #eb4c60;
  }
`;

const ImageContainer = styled.div`
  width: 2rem;
  height: 2rem;
  position: relative;

  .icon-img {
    filter: grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-50deg)
      saturate(600%) contrast(0.8) drop-shadow(0px 0px 1px #eb4c6050);
  }
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;

  &.categories-row {
    padding: 0.5rem 0.25rem;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: #eb4c6030;
      cursor: pointer;
    }
  }
`;
export const Pill = styled.div`
  background: white;
  border-radius: 20px;
  display: flex;
  color: #eb4c60;
  padding: 0.5rem 0.8rem;
  column-gap: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 0px 3px #eb4c6060;
  }

  // &.active {
  //   background-color: #eb4c6020;
  // }
`;

const List = styled.ul`
  padding: 0;
`;
const ListItem = styled.li`
  text-decoration: none;
  font-weight: bold;
  list-style-type: none;
  padding: 5px 0 5px 60px;
  &:hover {
    background: #eb4c6010;
    color: #eb4c60;
  }
`;

const DivExpand = styled.div`
  display: flex;
  flex-direction: column;
`;
const TextEx = styled.div`
  color: #eb4c60;
  // font-weight: bold;
  font-size: 17px;
`;
const TextEx2 = styled.div`
  font-size: 12px;
`;
const TextEx3 = styled.div`
  font-size: 14px;
  font-weight: bold;
`;
const TextEx4 = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #eb4c60;
`;
const DivEx = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 0.7rem 0;
`;
const TextHead = styled.div`
  font-weight: bold;
  padding: 0 2rem;
`;
const CategoriesDetailsContainer = ({ handleSelectedCategory }) => {
  const [isFetched, setIsFetched] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((result) => {
      if (result?.data) {
        setCategories(() => []);
        result?.data?.data.map((item) => {
          let temp = { id: item.id };
          setCategories((prev) => prev.concat({ ...item.attributes, ...temp }));
        });
        setIsFetched(() => true);
      }
    });
  }, [isFetched]);

  return (
    // <Modal3 isOpen={true}>
    <DetailsContainer>
      <GridContainer>
        {categories.map((category, idx) => {
          if (category?.key !== 'all')
            return (
              <Row
                key={'category-' + idx}
                className="categories-row"
                onClick={() => handleSelectedCategory(category)}
              >
                <ImageContainer className="icon-img-box">
                  <Image
                    src={'/assets/img/categories/' + category.icon}
                    layout="fill"
                    className="icon-img"
                    alt="icon-img-box"
                  />
                </ImageContainer>
                <DivExpand>
                  <TextEx>{category.title}</TextEx>
                  <TextEx2>Lorem ipsum from</TextEx2>
                </DivExpand>
              </Row>
            );
        })}
      </GridContainer>
    </DetailsContainer>
    // </Modal3>
  );
};
const SkillsDetailsContainer = ({ category, handleSelectedSkills }) => {
  const [categorySkills, setCategorySkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    if (category) {
      getApiSkillById(category.id).then((result) => {
        if (result?.data) {
          console.log(result?.data, category.id);
          setCategorySkills(() => []);
          const temp = result?.data?.data?.attributes?.skills?.data ?? [];
          temp.map((item) => {
            let skillId = { id: item.id };
            setCategorySkills((prev) =>
              prev.concat({ ...item.attributes, ...skillId })
            );
          });
        }
      });
    }
  }, []);

  const togglePillActive = (item) => {
    const isActive = selectedSkills.find((data) => data === item)
      ? true
      : false;
    if (!isActive) setSelectedSkills((prev) => prev.concat(item));
    else setSelectedSkills((prev) => prev.filter((data) => data !== item));
  };
  const checkIsActive = (item) => {
    return selectedSkills.find((data) => data === item) ? true : false;
  };
  return (
    <DetailsContainer>
      {categorySkills ? (
        <>
          <div>
            Skills related to{' '}
            {category ? (
              <Text className="secondary">{category.title}</Text>
            ) : (
              ''
            )}
          </div>
          <FlexContainer>
            {categorySkills.map((item, idx) => {
              return (
                <Pill
                  key={'skill-id' + idx}
                  onClick={() => {
                    handleSelectedSkills(selectedSkills);
                    togglePillActive(item?.id);
                  }}
                  className={checkIsActive(item?.id) ? 'active' : ''}
                >
                  {' '}
                  {item?.title} <span>+</span>
                </Pill>
              );
            })}
          </FlexContainer>
        </>
      ) : (
        <div>Select a Category</div>
      )}
    </DetailsContainer>
  );
};
const LocationDetailsContainer = ({ handleSelectedLocation }) => {
  return (
    <DetailsContainerList>
      <TextHead>Select City</TextHead>
      <List>
        {locations &&
          locations.map((item, idx) => {
            return (
              <ListItem
                key={'location-id-' + idx}
                onClick={() => handleSelectedLocation(item)}
              >
                {item.title}
              </ListItem>
            );
          })}
      </List>
    </DetailsContainerList>
  );
};
const BudgetDetailsContainer = ({ handleSelectedBudget }) => {
  return (
    <DetailsContainerList2>
      <List>
        {budget &&
          budget.map((item, idx) => {
            return (
              <ListItem
                key={'budget-id-' + idx}
                onClick={() => handleSelectedBudget(item)}
              >
                {item.title}
              </ListItem>
            );
          })}
      </List>
    </DetailsContainerList2>
  );
};

function DetailsSection({ type, onHandleUserSelectedDetails }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
    onHandleUserSelectedDetails({ categories: category });
  };

  const handleSelectedSkills = (skills) => {
    onHandleUserSelectedDetails({ skills: skills });
  };

  const handleSelectedLocation = (location) => {
    onHandleUserSelectedDetails({ location: location });
  };

  const handleSelectedBudget = (budget) => {
    onHandleUserSelectedDetails({ budget: budget });
  };

  if (type === 'categories') {
    return (
      <CategoriesDetailsContainer
        handleSelectedCategory={handleSelectedCategory}
      />
    );
  } else if (type === 'skills') {
    return (
      <SkillsDetailsContainer
        category={selectedCategory}
        handleSelectedSkills={handleSelectedSkills}
      />
    );
  } else if (type === 'location') {
    return (
      <LocationDetailsContainer
        handleSelectedLocation={handleSelectedLocation}
      />
    );
  } else if (type === 'budget') {
    return (
      <BudgetDetailsContainer handleSelectedBudget={handleSelectedBudget} />
    );
  }
}

export default DetailsSection;
