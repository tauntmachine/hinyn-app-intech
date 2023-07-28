import styled from '@emotion/styled';
import CategoryList from '../shared/categories/CategoryList';
import CardsSection from './CardsSection';
import { useFreelancer } from '../../src/store';
import { useState, useEffect } from 'react';
import { getCategories } from '../forms/formService';
import cards from '../data/FreelancersData';

const ContainerCustom = styled.div`
  margin-top: 25rem;

  width: 70%;
  margin: auto;
`;

function Main() {
  const { freelancer, filter, setFilter } = useFreelancer();
  const [categories, setCategories] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    getCategories().then((result) => {
      if (result?.data?.data && !isFetched) {
        setCategories(() => []);
        result?.data?.data.map((item) => {
          let temp = { id: item.id };
          setCategories((prev) => prev.concat({ ...item.attributes, ...temp }));
        });
        setIsFetched(true);
      }
    });
  }, [isFetched]);

  const handleButtonClick = () => {};

  return (
    <ContainerCustom>
      <CategoryList categories={categories} />
      <CardsSection cards={cards} handleButtonClick={handleButtonClick} />
    </ContainerCustom>
  );
}

export default Main;
