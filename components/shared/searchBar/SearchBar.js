import styled from "@emotion/styled";
import {FiSearch} from "react-icons/fi";

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 1rem;
    border: 1px solid #EBEBEB;
    border-radius: 30px;
    margin:auto;
    padding: 10px 25px;
    opacity: ${props => props.isExpanded ? 0 : 1};

    &:hover{
        cursor: pointer;
    }
`
const VerticalDivider = styled.div`
    height:25px;
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
`

function SearchBar({toggleIsExpanded, isExpanded}) {
  return (
    <SearchContainer onClick={()=>toggleIsExpanded()} isExpanded={isExpanded}>
        <div>I am looking for</div>
        <VerticalDivider />
        <div>Where</div>
        <VerticalDivider />
        <div>Budget</div>
        <SearchIconContainer>
            <CustomSearchIcon />
        </SearchIconContainer>
    </SearchContainer>
  )
}

export default SearchBar