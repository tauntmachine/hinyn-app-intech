import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import styled from '@emotion/styled';

const FilledStar = styled(AiFillStar)`
  color: #E96E3F;
  font-size:10px;
`
const OutlinedStar = styled(AiOutlineStar)`
  color: #E96E3F;
  font-size:10px;
`
const StarContainer = styled.div`
  display: flex;
  column-gap: 5px;
`


function StarRating({data}) {
  const remaining = 5 - data;
  return (
    <StarContainer>
    { [...Array(data)].map((elem, i) => ( 
        <FilledStar key={i}/>
      ))
    }
    {remaining > 0 ? 
      [...Array(remaining)].map((elem, i) => ( 
        <OutlinedStar key={i}/>
      )) 
      :
      null
    }
  </StarContainer>
  )
}

export default StarRating