import styled from "@emotion/styled";
import breakpoint from "../utils/Breakpoints";
import Image from "next/image";
import {GoLocation} from "react-icons/go";
import StarRating from "./StarRating";
import Button from "./Button";
import SampleImage from "../../assets/img/man.jpeg";

const StyledCard = styled.div`
    min-height:22rem;
    box-shadow:1px 1px 10px #aaaaaa20;
    border-radius: 10px;
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: space-evenly;
    padding: 2rem 0;
    row-gap: 0.4rem;
    background-repeat: no-repeat;
    background-position: bottom right;
    user-select:none;
    /* margin:1.5rem; */
    height:100%;
    background-color: #F8F8F8;

    @media ${breakpoint.device.lg}{
        margin:0 1rem;
    }
    @media ${breakpoint.device.sm}{
        margin:0;
    }
    &:hover, &:focus{
        box-shadow:1px 1px 10px #0F766950;
        transition: all 0.3s ease-in-out;
    }
`;
const ImageContainer = styled.div`
    width: 4rem;
    height: 4rem;
    position: relative;
    background: #ffffff;
    border: 5px solid #ffffff;
    border-radius: 50%;
    box-shadow: 0px 3px 6px #00000029;
`
const StyledImage = styled(Image)`
    border-radius: 50%;
`
const Title = styled.span`
    font-size: 17px;
`
const Label = styled.span`
    font-size: 13px;
    color: ${props => props.variant ==='green' ? '#0F7669' : '#525252'};
    display:flex;
    column-gap: 5px;
`
const StyledButton = styled(Button)`
    font-size: 13px;
    margin-top: 1.5rem;
`

function CustomCard({data}) {
  return (
    <StyledCard>
        <ImageContainer>
            <StyledImage
            src={SampleImage}
            layout="responsive"
            />
        </ImageContainer>
        <Title>{data.name}</Title>
        <Label variant="green">{data.job}</Label>
        <StarRating data={data.rating}/>
        <Label>
            <GoLocation />
            <span>{data.location}</span>
        </Label>
        <StyledButton variant="outlined">Hire me</StyledButton>
    </StyledCard>
  )
}

export default CustomCard