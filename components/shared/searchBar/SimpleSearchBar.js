import styled from "@emotion/styled";
import { Container,InputAdornment, IconButton } from "@mui/material";
import { SearchIcon } from "../Icon";
import StyledTextField from "../Textfield";

const IconBG = styled.div`
    width:40px;
    height:40px;
    border-radius: 50%;
    background: linear-gradient(111deg, #4AA398 0%, #12584F 100%);
    display: flex;
    align-items: center;
    justify-content: center;

    .icon{
        color: #ffffff;
        font-size: 16px;
    }
`

const SimpleSearchBar = ({handleSearchValue,placeholderText}) => {

return ( 
    <Container maxWidth="md">
        <StyledTextField
        required
        fullWidth
        id="searchInput"
        label=""
        name="searchInput"
        placeholder={placeholderText}
        onChange={handleSearchValue}
        InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                edge="end"
              >
                <IconBG>
                    <SearchIcon className="icon"/>
                </IconBG>
              </IconButton>
            </InputAdornment>,
          }}
        />
    </Container>
) 
}

export default SimpleSearchBar