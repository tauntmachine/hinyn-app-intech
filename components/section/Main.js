import styled from '@emotion/styled';
import CategoryList from '../shared/categories/CategoryList';
import CardsSection from './CardsSection';
import { useFreelancer } from '../../src/store';
import { useState, useEffect } from 'react';
import { getCategories } from '../forms/formService';
import cards from '../data/FreelancersData';

const ContainerCustom = styled.div`
  margin-top: 12rem;

  width: 80%;
  margin: auto;
  margin-bottom: 5rem;
`;

function Main() {
  // const { freelancer, filter, setFilter } = useFreelancer();

  const categoriesFilter = [
    {
      title: 'Photographer',
      img: '/assets/img/categories/icn-photographer.svg',
    },
    { title: 'Drone Operator', img: '/assets/img/categories/icn-drone.svg' },
    {
      title: 'Editor',
      img: '/assets/img/categories/icn-editor.svg',
    },
    { title: 'Hairstylist', img: '/assets/img/categories/icn-hairStylist.svg' },
    {
      title: 'Makeup Artist',
      img: '/assets/img/categories/icn-makeupArtist.svg',
    },
    {
      title: 'Videographer',
      img: '/assets/img/categories/icn-videographer.svg',
    },
    { title: 'Studio/Location', img: '/assets/img/categories/icn-studio.svg' },
    { title: 'Models', img: '/assets/img/categories/icn-models.svg' },
  ];

  const handleButtonClick = () => {};

  return (
    <ContainerCustom>
      <CategoryList categories={categoriesFilter} />
      <CardsSection cards={cards} handleButtonClick={handleButtonClick} />
    </ContainerCustom>
  );
}

export default Main;
