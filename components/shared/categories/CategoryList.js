import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/swiper-bundle.min.css';

import Category from './Category';

import styled from '@emotion/styled';

const SwiperBox = styled.div`
  margin-top: 3rem;
`;

function CategoryList({ categories, handleSelectedCategory, currCatSelected }) {
  return (
    <SwiperBox>
      <Swiper
        spaceBetween={55}
        slidesPerView={9}
        // loop={true}
        updateOnWindowResize={true}
      >
        {categories?.map((category, idx) => (
          <SwiperSlide
            key={idx}
            onClick={() => handleSelectedCategory(category.title)}
          >
            <Category
              data={category}
              isSelected={category.title === currCatSelected}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperBox>
  );
}

export default CategoryList;
