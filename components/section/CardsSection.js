import styled from "@emotion/styled";
import { Grid,Box } from "@mui/material";
import Filter from "../shared/Filter";
import CustomCard from "../shared/CustomCard";
import Dropdown from "../shared/Dropdown";

const GridContainer = styled(Box)`
    margin-top: 2.5rem;
`
const FilterContainer = styled.div`
    display: flex;
    align-items: center;
`

function CardsSection({cards}) {
  return (
    <GridContainer>
        <FilterContainer>
            <Filter/>
            <Dropdown />
        </FilterContainer>
        
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 5, lg:8 }}>
        {cards.data.map( (card,idx) => (
            <Grid key={idx} item xs={12} sm={6} lg={3} sx={{position:'relative', marginTop:"3rem"}}>
                <CustomCard data={card} />
            </Grid>
        ))}
        </Grid>
    </GridContainer>
  )
}

export default CardsSection