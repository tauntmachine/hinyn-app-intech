import {Box} from '@mui/material';
import styled from '@emotion/styled';
import CategoryIcon from '../shared/categories/Category';
import { RightChevronIcon } from './Icon';

const StyledBox = styled(Box)`
    display : flex;
    flex-direction: column;
    overflow: auto;
    max-height:350px;
`

const Row = styled.div`
    color: #939393;
    background-color: #ffffff;
    padding: 16px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dddddd30;

    &.header{
        color: #ffffff;
        background-color: #24796E;
        border-radius: 13px 13px 0 0;
    }

    &:hover:not(.header){
        background-color: #FFF4F5;
    }
`

const TextWithIcon = styled.div`
    display: flex;
    column-gap: 16px;
    align-items: center;
`

const iconMap = {
    'right-arrow' : <RightChevronIcon variant='green'/>
}


function ScrollableTable({data ,title, startAdornment, endAdornment, type, onCategoryClick, onSkillClick}) {
  return (
    <>
    <Row className='header'>{title}</Row>
    { type && type === 'categories' ? 
        <StyledBox >
            {data && data.map((category,idx) => (
                <Row key={'category-'+idx} onClick={()=>onCategoryClick(category)}>
                    {
                        startAdornment === 'icon' 
                        ?  <TextWithIcon>
                                <CategoryIcon data={category} hasLabel={false}/>
                                <span> {category.title}</span>
                            </TextWithIcon>
                        :<span> {category.title} </span>    
                    }
                    {endAdornment && iconMap[endAdornment]}
                </Row>
            ))}
        </StyledBox>
    : type === 'category_skills' ?
        <StyledBox >
        {data && data.map((skill,idx) => (
            <Row key={'category-skill-'+idx} onClick={()=>onSkillClick(skill)}>
                <span> {skill} </span>
            </Row>
        ))}
        </StyledBox>       
        : 
        <StyledBox>
        {data && data.map((skill,idx) => (
            <Row key={'skill-'+idx}>
                <span> {skill} </span>
            </Row>
        ))}
        </StyledBox>       
    }
    </>
  )
}

export default ScrollableTable