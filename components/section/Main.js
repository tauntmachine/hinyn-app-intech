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

  const categories = [
    { title: 'Photographer', img: 'icn-photographer.svg' },
    { title: 'Editor', img: 'icn-editor.svg' },
    { title: 'HairStylist', img: 'icn-hairStylist.svg' },
    { title: 'MakeUp', img: 'icn-makeupArtist.svg' },
    { title: 'Model', img: 'icn-models.svg' },
    { title: 'Studio', img: 'icn-studio.svg' },
    { title: 'Stylist', img: 'icn-stylist.svg' },
  ];

  const handleButtonClick = () => {};

  return (
    <ContainerCustom>
      <CategoryList categories={categories} />
      <CardsSection cards={cards} handleButtonClick={handleButtonClick} />
    </ContainerCustom>
  );
}

export default Main;
