import styled from "@emotion/styled";
import {FiSearch} from "react-icons/fi";
import { useState } from "react";
import DetailsSection from "./DetailsSection";
import { Box } from "@mui/material";

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #EBEBEB;
    border-radius: 50px;
    margin:auto;
    width: max-content;

    &:hover{
        cursor: pointer;
    }

    &:has(.active){
        background: #eee;
    }
`
const SearchOptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 16px 25px;
    min-width: 10rem;
    transition: all 0.5s ease-in-out;
    border-radius: 50px;

    &:hover{
        background: #F8F8F8;
        border: 1px solid #EB4C60;
        box-shadow: 0px 3px 6px #EB4C603C;
    }

    &.active{
        background: #F8F8F8;
        border: 1px solid #EB4C60;
        box-shadow: 0px 3px 6px #EB4C603C;
    }

    .pretitle{
        font-size: 12px;
    }

    .value{
        color: #C4C4C4;

        &.active{
            color: #EB4C60;
        }
    }
`
const VerticalDivider = styled.div`
    height:36px;
    width: 1px;
    background: #EBEBEB;
`
const CustomSearchIcon = styled(FiSearch)`
    color: #ffffff;
`
const SearchIconContainer = styled.div`
    background: linear-gradient(135deg, #FF5A5F 0%, #A52226 100%);
    box-shadow: 0px 3px 6px #EB4C6072;
    border-radius: 50%;
    padding:4px 4px 0;
    margin: 0 30px;
    transform: scale(2);
`

const items = [
    {
        key: "categories",
        pretitle: "Category",
        value: "I am looking for"
    },
    {
        key: "skills",
        pretitle: "Skills",
        value: "Expertise"
    },
    {
        key: "location",
        pretitle: "Where",
        value: "United Arab Emirates"
    },
    {
        key: "budget",
        pretitle: "Budget",
        value: "Hourly Rate"
    }
];

function ExpandedSearchBar() {
    const [currentExpanded, setCurrentExpanded] = useState(null);
    const [showDetailsSection, setShowDetailsSection] = useState(false);
    const [userSelectedDetails, setUserSelectedDetails] = useState({data:null});

    const toggleDetailsSection = (key) => {
        setCurrentExpanded(key);
        if(!showDetailsSection) setShowDetailsSection(() => true);
        if(currentExpanded === key && showDetailsSection) setShowDetailsSection(()=>false);
    }

    const handleUserSelectedDetails = (details) => {
        setUserSelectedDetails(prev => {
            return {
                data: {...prev.data, ...details}
            }
        });
    }

    const showValue = (key, orig) => {
        if(key === 'categories' && userSelectedDetails?.data?.categories?.title) return <span className="value active"> {userSelectedDetails?.data?.categories?.title} </span>;
        if(key === 'location' && userSelectedDetails?.data?.location?.location) return <span className="value active">{ userSelectedDetails?.data?.location?.location } </span>;
        if(key === 'budget' && userSelectedDetails?.data?.budget?.budget) return <span className="value active">{ userSelectedDetails?.data?.budget?.budget } </span>;
        // if(key === 'skills' && userSelectedDetails?.data?.skills) return <span className="value active">
        //     { userSelectedDetails?.data?.skills.map((skill,idx) => {
        //         return <Pill key={"skill-item-"+idx}>{skill}</Pill>
        //     }) } </span>;
        return orig;
    }
   
  return (
    <Box sx={{position:'relative'}}>
    <SearchContainer>
        {items && items.map((item,idx) => (
            <Box sx={{display:'flex', alignItems:'center'}}  key={item.key}>
            <SearchOptionContainer onClick={()=> toggleDetailsSection(item.key)} className={item.key === currentExpanded ? 'active' : ''}>
                <span className="pretitle">{item.pretitle}</span>
                {userSelectedDetails.data
                ? showValue(item.key, item.value)
                : <span className="value">{item.value}</span>
                }
                
            </SearchOptionContainer>
            {idx < items.length-1 ? <VerticalDivider /> : null}
            </Box>
        ))} 
        <SearchIconContainer>
            <CustomSearchIcon />
        </SearchIconContainer>
    </SearchContainer>
        {showDetailsSection 
        ? <DetailsSection type={currentExpanded} onHandleUserSelectedDetails={handleUserSelectedDetails}/>
        : null
        }
    </Box>
  )
}

export default ExpandedSearchBar