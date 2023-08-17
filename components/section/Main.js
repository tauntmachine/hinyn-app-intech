import styled from '@emotion/styled';
import CategoryList from '../shared/categories/CategoryList';
import CardsSection from './CardsSection';
import { useFreelancer } from '../../src/store';
import { useState, useEffect } from 'react';
import { getCategories } from '../forms/formService';
import cards from '../data/FreelancersData';

const ContainerCustom = styled.div`
  margin-top: 12rem;

  width: 70%;
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
    { title: 'Editor', img: '/assets/img/categories/icn-drone.svg' },
    {
      title: 'HairStylist',
      img: '/assets/img/categories/icn-editor.svg',
    },
    { title: 'MakeUp', img: '/assets/img/categories/icn-hairStylist.svg' },
    { title: 'Model', img: '/assets/img/categories/icn-makeupArtist.svg' },
    { title: 'Studio', img: '/assets/img/categories/icn-videographer.svg' },
    { title: 'Stylist', img: '/assets/img/categories/icn-studio.svg' },
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
