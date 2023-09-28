import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/swiper-bundle.min.css';
import styled from '@emotion/styled';
import Image from 'next/image';
import Text from './Typography';

const ImageWrapper = styled.div`
  position: relative;
  background: #ffffff;
  width: 170px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
`;

const ImageSlider = ({ images }) => {
  const path = '/assets/img/temp/';
  return (
    <Swiper spaceBetween={40} slidesPerView={4} loop={true}>
      {images.map((image, idx) => (
        <SwiperSlide key={'img-' + idx}>
          <ImageWrapper>
            <Image src={path + image} layout="fill" />
          </ImageWrapper>
          <Text color="green" marginTop="10px" fontSize="12px">
            Portfolio Folder
          </Text>
          <Text color="gray" fontSize="11px">
            5 pictures
          </Text>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
