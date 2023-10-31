import styled from '@emotion/styled';
import Image from 'next/image';

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 7px;

  color: ${(props) => (props.isSelected ? '#EB4C60' : '#939393')};
  align-items: center;
  border-bottom: ${(props) => (props.isSelected ? '1.5px solid #EB4C60' : '')};
  user-select: none;

  .icon-img-box img {
    filter: ${(props) =>
      props.isSelected
        ? 'grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)'
        : ''};
  }

  &:hover .icon-img-box img {
    filter: ${(props) =>
      props.isSelected
        ? 'grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)'
        : 'grayscale(100%) brightness(40%)'};
  }

  &:hover {
    color: ${(props) => (props.isSelected ? '#EB4C60' : '#525252')};
    cursor: pointer;
  }
`;
const Label = styled.span`
  text-align: center;
  font-size: 12px;
  margin-bottom: 4px;
  // margin-left: 10px;
`;
const ImageContainer = styled.div`
  width: 2.7rem;
  height: 2.7rem;
  position: relative;
`;

function Category({ data, isSelected }) {
  // const imgsrc = '/assets/img/categories/' + data.img;
  // console.log(data.attributes);
  return (
    <IconContainer isSelected={isSelected}>
      <ImageContainer className="icon-img-box">
        <Image
          src={data.img}
          layout="fill"
          className="icon-img"
          alt="icon-img"
        />
      </ImageContainer>

      <Label>{data.title}</Label>
    </IconContainer>
  );
}

export default Category;
