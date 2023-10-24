import styled from '@emotion/styled';
import CategoryList from '../shared/categories/CategoryList';
import CardsSection from './CardsSection';
import { useFreelancer } from '../../src/store';
import { useState, useEffect } from 'react';
import { getCategories } from '../forms/formService';
import Text from '../shared/Typography';

const ContainerCustom = styled.div`
  margin-top: 12rem;

  width: 80%;
  margin: auto;
  margin-bottom: 5rem;
`;

function Main() {
  const { freelancer} = useFreelancer();
  const [currCatSelected, setCurrCatSelected] = useState('photographer');
  const [category, setCategory] = useState([]);

  useEffect(() => {
    // Fetch categories when the component mounts
    const fetchCategories = async () => {
      const categoriesPromise = getCategories();
      try {
        const result = await categoriesPromise;

        if (result.status) {
          const data = result.data;
          setCategory(data.data);
          // console.log('THIS IS ????' + category);
        } else {
          console.error('Error fetching categories: ' + result.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories(); // Call the function to fetch categories
  }, []);

  const handleButtonClick = () => {};

  const handleSelectedCategory = (category) => {
    setCurrCatSelected(category.title);
  };

  // console.log(category);

  return (
    <ContainerCustom>
      <CategoryList
        categories={category}
        handleSelectedCategory={handleSelectedCategory}
        currCatSelected={currCatSelected}
      />
      {/* <Text>{freelancer}</Text> */}
      <CardsSection cards={freelancer} handleButtonClick={handleButtonClick} />
    </ContainerCustom>
  );
}

export default Main;
