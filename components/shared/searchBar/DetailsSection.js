import styled from '@emotion/styled';
import breakpoint from '../../utils/Breakpoints';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useFreelancer } from '../../../src/store';
import { getCategories, getSkills } from '../../forms/formService';
import { locations,budget } from '../../models/filters.models';


const DetailsContainer = styled.div`
    border: 1px solid #EBEBEB;
    border-radius: 11px;
    margin:auto;
    margin-top:0.5rem;
    max-width: 42%;
    background: #F8F8F8;
    border: 1px solid #EB4C60;
    box-shadow: 0px 3px 6px #EB4C603C;
    position: absolute;
    left:0;
    right:0;
    padding: 1.25rem 2.5rem;


    @media ${breakpoint.device.lg}{
        max-width: 37%;
    }
`
const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    row-gap: 0.25rem;
    column-gap: 1rem;
`

const FlexContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
`

const Text = styled.span`
    font-size: 14px;
    
    &.secondary{
        color: #EB4C60;
    }
`

const ImageContainer = styled.div`
    width: 2rem;
    height: 2rem;
    position: relative;

    .icon-img{
        filter: grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8) drop-shadow(0px 0px 1px #EB4C6050);
        
    }
`
const Row = styled.div`
    display: flex;
    align-items: center;
    column-gap: 1rem;

    &.categories-row{
        padding: 0.5rem 0.25rem;
        border-radius: 5px;
        transition: all 0.2s ease-in-out;

        &:hover{
            background:  #EB4C6030;
            cursor: pointer;
        }
    }
`
export const Pill = styled.div`
    background: #FFFFFF;
    border-radius: 13px;
    display: flex;
    color: #EB4C60;
    padding: 0.25rem 0.5rem;
    column-gap: 1rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover{
        box-shadow: 0px 0px 3px #EB4C6060;
    }

    &.active{
        background-color: #EB4C6020;
    }
`

const List = styled.ul`
    padding: 0;
`
const ListItem = styled.li`
    text-decoration: none;
    list-style-type: none ;
    padding: 5px 0 5px 20px;
    &:hover{
        background: #EB4C6010;
        color: #EB4C60;
    }
`

const CategoriesDetailsContainer = ({handleSelectedCategory}) => {
    const imgsrc = '/assets/img/categories/';
    const [categories,setCategories] = useState([]);
    const [isFetched,setIsFetched] = useState([]);


    useEffect(()=>{
        getCategories().then((result)=>{
          if(result?.data){
            setCategories(()=>[])
            result?.data?.data.map((item)=>{
              let temp = {"id":item.id}
              setCategories((prev => prev.concat({...item.attributes,...temp})));
            })
            setIsFetched(()=> true)
          }
        });
      },[isFetched])


    return(
        <DetailsContainer>
            <GridContainer>
            {categories.map((category,idx) => {
                if(category?.key !== 'all')
                   return <Row key={'category-'+idx} className='categories-row' onClick={()=>handleSelectedCategory(category)}>
                        <ImageContainer className='icon-img-box'>
                            <Image
                            src={imgsrc+category.icon}
                            layout="fill"
                            className='icon-img'
                            alt="icon-img-box"
                            />
                        </ImageContainer>
                        <Text className='secondary'>{category.title}</Text>
                    </Row>                
            })}
            </GridContainer>
        </DetailsContainer>
    )
}
const SkillsDetailsContainer = ({category, handleSelectedSkills}) => {
    const [categorySkills, setCategorySkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);

    useEffect(()=>{
        getSkills(category.id).then((result)=>{
            if(result?.data){
                setCategorySkills(()=>[]);
                const temp = result?.data?.data?.attributes?.skills?.data ?? [];
                temp.map((item)=>{
                let skillId = {"id":item.id}
                setCategorySkills((prev => prev.concat({...item.attributes, ...skillId})));
                });
            }
        });
    },[])
   

    const togglePillActive = (item) => {
        const isActive = selectedSkills.find(data => data === item) ? true : false;
        if(!isActive) setSelectedSkills((prev => prev.concat(item)));
        else setSelectedSkills(prev => prev.filter(data => data !== item))
    }
    const checkIsActive = (item) =>{
        return selectedSkills.find(data => data === item) ? true : false;
    }
    return(
        <DetailsContainer>
          { categorySkills ?
                <>
                    <div>Skills related to <Text className='secondary'>{category.title}</Text></div>
                    <FlexContainer>
                        {categorySkills.map((item,idx) => {
                            return <Pill key={"skill-id"+idx} onClick={()=>{ handleSelectedSkills(selectedSkills); togglePillActive(item?.id)}} className={checkIsActive(item?.id) ? 'active' : ''} > {item?.title} <span>+</span></Pill>
                        })}
                    </FlexContainer>
                </>
            : <div>Select a Category</div>
          }
          
        </DetailsContainer>
    )
}
const LocationDetailsContainer = ({handleSelectedLocation}) => {
    return(
        <DetailsContainer>
            Select City
            <List>
            {locations && locations.map((item,idx)=>{
                return <ListItem key={'location-id-'+idx} onClick={()=>handleSelectedLocation(item)}>{item.title}</ListItem>
            })}
            </List>
        </DetailsContainer>
    )
}
const BudgetDetailsContainer = ({handleSelectedBudget}) => {
    return(
        <DetailsContainer>
             Select Budget
            <List>
            {budget && budget.map((item,idx)=>{
                return <ListItem key={'budget-id-'+idx} onClick={()=>handleSelectedBudget(item)}>{item.title}</ListItem>
            })}
            </List>
        </DetailsContainer>
    )
}

function DetailsSection({type, onHandleUserSelectedDetails}) {
const [selectedCategory, setSelectedCategory] = useState(null);



const handleSelectedCategory = (category) =>{
    setSelectedCategory(category);
    onHandleUserSelectedDetails({'categories':category});
}

const handleSelectedSkills = (skills) =>{
    onHandleUserSelectedDetails({'skills':skills});
}

const handleSelectedLocation = (location) =>{
    onHandleUserSelectedDetails({'location':location});
}

const handleSelectedBudget = (budget) =>{
    onHandleUserSelectedDetails({'budget':budget});
}

  if(type === 'categories'){
    return (
        <CategoriesDetailsContainer handleSelectedCategory={handleSelectedCategory}/>
    )
  }else if(type === 'skills'){
    return (
        <SkillsDetailsContainer category={selectedCategory} handleSelectedSkills={handleSelectedSkills}/>
    )
  }else if(type === 'location'){
    return (
        <LocationDetailsContainer handleSelectedLocation={handleSelectedLocation}/>
    )
  }else if(type === 'budget'){
    return (
        <BudgetDetailsContainer handleSelectedBudget={handleSelectedBudget} />
    )
  }
}

export default DetailsSection