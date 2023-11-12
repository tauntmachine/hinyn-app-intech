import styled from '@emotion/styled';
import CategoryList from '../shared/categories/CategoryList';
import CardsSection from './CardsSection';
import { useFreelancer } from '../../src/store';
import { useState, useEffect } from 'react';
import { getCategories } from '../forms/formService';
import Text from '../shared/Typography';
import { category } from '../models/filters.models';

const ContainerCustom = styled.div`
  margin-top: 12rem;

  width: 80%;
  margin: auto;
  margin-bottom: 5rem;
`;

function Main() {
  const { freelancer } = useFreelancer();
  const [currCatSelected, setCurrCatSelected] = useState();
  const [categories, setCategories] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const categoriesPromise = getCategories();
  //     try {
  //       const result = await categoriesPromise;

  //       if (result.status) {
  //         const data = result.data;
  //         setCategory(data.data);
  //         console.log(category);
  //       } else {
  //         console.error('Error fetching categories: ' + result.data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   };

  //   fetchCategories(); // Call the function to fetch categories
  // }, []);
  useEffect(() => {
    getCategories().then((result) => {
      if (result?.data) {
        console.log(result);
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
    setFilteredArray(
      freelancer.filter((item) => item.attributes.headline === category)
    );
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
        cards={filteredArray}
        handleButtonClick={handleButtonClick}
        selectedCategory={currCatSelected}
      />
    </ContainerCustom>
  );
}

export default Main;
