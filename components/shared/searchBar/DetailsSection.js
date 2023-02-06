import styled from '@emotion/styled';
import breakpoint from '../../utils/Breakpoints';
import Image from "next/image";
import { useState } from 'react';

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
        background-color: #EB4C6020;
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

const categories = {
    data : [
        {
            key : "photographer",
            icon : "icn-photographer.svg",
            title: "Photographer"
        },
        {
            key : "videographer",
            icon : "icn-videographer.svg",
            title: "Videographer"
        },
        {
            key : "editor",
            icon : "icn-editor.svg",
            title: "Editor"
        },
        {
            key : "stylist",
            icon : "icn-stylist.svg",
            title: "Stylist"
        },
        {
            key : "makeup-artist",
            icon : "icn-makeupArtist.svg",
            title: "Makeup Artists"
        },
        {
            key : "hair-stylist",
            icon : "icn-makeupArtist-1.svg",
            title: "Hair Stylists"
        },
        {
            key : "model",
            icon : "icn-hairStylist.svg",
            title: "Models"
        },
        {
            key : "studio-location",
            icon : "icn-models.svg",
            title: "Studio/Location"
        },
    ]
}

const category_skills = {
    data: [
    {
        key : "photographer",
        skills: [
            'Fashion',
            'Beauty',
            'Lifestyle',
            'Corporate',
            'E-commerce',
            'Watches / Jewelry',
            'Products',
            'Cars',
            'Sports',
            'Wedding',
            'Event',
            'Kids / Baby',
            'Animal',
            'Architecture / Real estate',
            'Food',
            'Other'
        ]
    },
    {
        key : "videographer",
        skills: [
            'Drone operator',
            'Fashion',
            'Beauty',
            'Lifestyle',
            'Corporate',
            'E-commerce',
            'Watches / Jewelry',
            'Products',
            'Cars',
            'Sports',
            'Wedding',
            'Event',
            'Kids / Baby',
            'Animal',
            'Architecture / Real estate',
            'Food',
            'Other'
        ]
    },
    {
        key : "editor",
        skills : [
            'General',
            'Special effects',
            'Animation / 3D',
            'Other'
        ]
    },
    {
        key : "stylist",
        skills : [
            'Fashion',
            'Beauty',
            'Lifestyle',
            'Sports',
            'E-commerce',
            'Watches / Jewelry',
            'Wedding',
            'Event',
            'Kids / Baby',
            'Other'
        ]
    },
    {
        key : "makeup-artist",
        skills: [
            'Cinema',
            'Fashion',
            'Beauty',
            'Lifestyle',
            'E-commerce',
            'Wedding',
            'Event',
            'Kids / Baby',
            'Other'
        ]
    },
    {
        key : "hair-stylist",
        skills : [
            'Cinema',
            'Fashion',
            'Beauty',
            'Lifestyle',
            'E-Commerce',
            'Wedding',
            'Event',
            'Kids / Baby',
            'Other'
        ]
    },
    {
        key : "model",
        skills : [
            'Fashion',
            'Beauty',
            'Lifestyle',
            'E-commerce',
            'Watches / Jewelry',
            'Cars',
            'Sports',
            'Wedding',
            'Event',
            'Kids / Baby',
            'Other'
        ]
    },
    {
        key : "studio-location",
        skills : [
            'Studio',
            'House',
            'Restaurant',
            'Other'
        ]
    }
    ]
}

const locations = {
    data: [        
        {
            key: 'dubai',
            location: 'Dubai'
        },
        {
            key: 'abudhabi',
            location: 'Abu Dhabi'
        },
        {
            key: 'sharjah',
            location: 'Sharjah'
        },
        {
            key: 'ajman',
            location: 'Ajman'
        },
        {
            key: 'umm-al-quwain',
            location: 'Umm Al Quwain'
        },
        {
            key: 'fujairah',
            location: 'Fujairah'
        },
        {
            key: 'ras-al-khaimah',
            location: 'Ras Al Khaimah'
        }
    ]
}

const budgets = {
    data: [
       {
        key: 'free',
        budget: '0 - free collaboration'
       },
       {
        key: '0-100',
        budget: '0-100'
       },
       {
        key: '100-200',
        budget: '100-200'
       },
       {
        key: '200-500',
        budget: '200-500'
       },
       {
        key: '500 plus',
        budget: '500 plus'
       },
    ]
}


const CategoriesDetailsContainer = ({handleSelectedCategory}) => {
    const imgsrc = '/assets/img/categories/';
    return(
        <DetailsContainer>
            <GridContainer>
            {categories.data.map((category,idx) => {
                return (
                    <Row key={'category-'+idx} className='categories-row' onClick={()=>handleSelectedCategory(category)}>
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
                )
            })}
            </GridContainer>
        </DetailsContainer>
    )
}
const SkillsDetailsContainer = ({category, handleSelectedSkills}) => {
    const data = category ? category_skills.data.find(item => item.key === category.key) : null;
    const [selectedSkills, setSelectedSkills] = useState([]);
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
          { data ?
                <>
                    <div>Skills related to <Text className='secondary'>{category.title}</Text></div>
                    <FlexContainer>
                        {data && data.skills.map((item,idx) => {
                            return <Pill key={"skill-id"+idx} onClick={()=>{ handleSelectedSkills(selectedSkills); togglePillActive(item)}} className={checkIsActive(item) ? 'active' : ''} > {item} <span>+</span></Pill>
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
            {locations.data.map((item,idx)=>{
                return <ListItem key={'location-id-'+idx} onClick={()=>handleSelectedLocation(item)}>{item.location}</ListItem>
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
            {budgets.data.map((item,idx)=>{
                return <ListItem key={'budget-id-'+idx} onClick={()=>handleSelectedBudget(item)}>{item.budget}</ListItem>
            })}
            </List>
        </DetailsContainer>
    )
}

function DetailsSection({type, onHandleUserSelectedDetails}) {
const [selectedCategory, setSelectedCategory] = useState(null);
const [selectedSkills, setSelectedSkills] = useState([]);

const handleSelectedCategory = (category) =>{
    setSelectedCategory(category);
    onHandleUserSelectedDetails({'categories':category});
}

const handleSelectedSkills = () =>{
    onHandleUserSelectedDetails({'skills':selectedSkills});
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