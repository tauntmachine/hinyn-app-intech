import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/swiper-bundle.min.css";
import SwiperCore,{ Navigation, Pagination, Autoplay } from 'swiper';
import { useState } from 'react';
import Category from "./Category";

function CategoryList({categories}) {
    const [currentSelected, setCurrentSelected] = useState(null);
  return (
    <Swiper
    spaceBetween={40}
    slidesPerView={9}
    loop={true}
    onSlideChange={() => console.log('slide change')}
    onSwiper={(swiper) => console.log(swiper)}
  >
    {categories.data.map((category,idx)=> (
        <SwiperSlide key={idx} onClick={()=>setCurrentSelected(category.key)}>
            <Category data={category} isSelected = {category.key === currentSelected ? true : false}/>
        </SwiperSlide>
    ))}
  </Swiper>
  )
}

export default CategoryList