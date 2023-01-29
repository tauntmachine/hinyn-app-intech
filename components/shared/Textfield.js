import styled from "@emotion/styled";
import { TextField } from "@mui/material";


const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: #ffffff;
    border-radius: 23px;
    color: #525252;
  }
`;

export const OutlinedTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: transparent;
    border: none !important;
    outline: none !important;
    color: #525252;

    fieldset{
      border: 1px solid #D8D8D8;
      border-radius: 12px;
      outline: none;
    }
    
  }
`

export const NoOutlineTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: transparent;
    border: none !important;
    outline: none !important;
    color: #525252;

    fieldset{
      border: none !important;
      outline: none !important;
    }
  }
`

export const SquareTextField = styled(TextField)`
    .MuiInputBase-root {
        background-color: #5D5D5D;
        border-radius: 5px;
        color: #ACCECA;
        border: 1px solid #939393;
        height: 2.5rem;
        outline: none;

        &:focus{
            outline:none;
            border:none;
        }
  }
`


export default StyledTextField;