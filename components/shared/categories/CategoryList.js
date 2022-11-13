import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/swiper-bundle.min.css";
import { useState } from 'react';
import Category from "./Category";
import { useFreelancer } from '../../../src/store';

function CategoryList({categories}) {
    const [currentSelected, setCurrentSelected] = useState(null);
    const {freelancer, filter, setFilter} = useFreelancer();
    
    const handleSelectedCategory = (category)=>{
        setCurrentSelected(category);
        if(category === 'all') category='';
        setFilter(category);
    }
  return (
    <Swiper
    spaceBetween={40}
    slidesPerView={9}
    loop={true}
    onSlideChange={() => console.log('slide change')}
    onSwiper={(swiper) => console.log(swiper)}
  >
    {categories.data.map((category,idx)=> (
        <SwiperSlide key={idx} onClick={()=>handleSelectedCategory(category.key)}>
            <Category data={category} isSelected = {category.key === currentSelected ? true : false}/>
        </SwiperSlide>
        ))
    }
  </Swiper>
  )
}

export default CategoryList