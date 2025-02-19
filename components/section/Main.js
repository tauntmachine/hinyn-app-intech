import styled from '@emotion/styled';
import CategoryList from '../shared/categories/CategoryList';
import CardsSection from './CardsSection';
import { useFreelancer } from '../../src/store';
import { useState, useEffect } from 'react';
import { getCategories } from '../forms/formService';

const ContainerCustom = styled.div`
  margin-top: 12rem;

  width: 80%;
  margin: auto;
  margin-bottom: 5rem;

  @media (max-width: 768px) {
  }
`;

function Main() {
  const { freelancer, setFilter } = useFreelancer();
  const [currCatSelected, setCurrCatSelected] = useState();
  const [categories, setCategories] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    getCategories().then((result) => {
      if (result?.data) {
        setCategories(() => []);
        result?.data?.data.map((item) => {
          let temp = { id: item.id };
          setCategories((prev) => prev.concat({ ...item.attributes, ...temp }));
        });
      }
    });
    setFilteredArray(freelancer ?? []);
  }, []);
  const handleButtonClick = () => {};

  const handleSelectedCategory = (category) => {
    setCurrCatSelected(category);
    setFilter({ category: category });
  };

  return (
    <ContainerCustom>
      <CategoryList
        categories={categories}
        handleSelectedCategory={handleSelectedCategory}
        currCatSelected={currCatSelected}
      />
      {/* <Text>{freelancer}</Text> */}
      <CardsSection
        cards={freelancer}
        handleButtonClick={handleButtonClick}
        selectedCategory={currCatSelected}
      />
    </ContainerCustom>
  );
}

export default Main;
