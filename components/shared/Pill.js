import styled from "@emotion/styled";

const Pill = styled.div`
    background: ${props => props.color === "green" ? "#CCE0DE" : "#ffffff"};
    border-radius: 13px;
    display: flex;
    color: ${props => props.color === "green" ? "#4AA398" : "#EB4C60;"};
    padding: 0.25rem 0.5rem;
    column-gap: 1rem;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover{
       
    }

    &.active{
        
    }
`

export default Pill;
