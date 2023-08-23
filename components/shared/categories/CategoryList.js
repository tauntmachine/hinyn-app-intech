import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/swiper-bundle.min.css';
import { useState } from 'react';
import Category from './Category';
import { useFreelancer } from '../../../src/store';
import styled from '@emotion/styled';

const SwiperBox = styled.div`
  margin-top: 3rem;
`;
function CategoryList({ categories }) {
  const [currentSelected, setCurrentSelected] = useState(null);
  // const { freelancer, filter, setFilter } = useFreelancer();

  const handleSelectedCategory = (category) => {
    setCurrentSelected(category);

    // if (category === 'all') category = '';
    // setFilter(category);
  };
  return (
    <SwiperBox>
      <Swiper
        spaceBetween={40}
        slidesPerView={9}
        loop={true}
        updateOnWindowResize={true}
      >
        {categories.map((category, idx) => (
          <SwiperSlide
            key={idx}
            onClick={() => handleSelectedCategory(category.key)}
          >
            <Category
              data={category}
              isSelected={category.key === currentSelected}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperBox>
  );
}

export default CategoryList;
