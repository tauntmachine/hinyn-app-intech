import styled from "@emotion/styled";
import { Container } from "@mui/material";

const FooterContainer = styled.div`
    display: flex;
    align-items: center;
    color: #555555;
    box-shadow: 0px 3px 30px #00000029;
    height: 4rem;
    position: sticky;
    bottom:0;
    left:0;
    right: 0;
    background: #FDFDFD;
`
const List = styled.ul`
    display: flex;
    justify-content: space-evenly;
    width: 100%;

`

function Footer() {
  return (
    <FooterContainer>
        <List>
            {['@2022 Hey I Need You Now','Privacy','Terms and Conditions', 'User Agreement', 'Why HINYN','Contact Us'].map((item,idx)=>(
                idx > 0 ? <li key={idx}>{item}</li> : <span key={idx}>{item}</span>
            ))}
        </List>
    </FooterContainer>
  )
}

export default Footer