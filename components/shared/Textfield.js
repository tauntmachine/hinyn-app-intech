import styled from '@emotion/styled';
import { TextField } from '@mui/material';

const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: #ffffff;
    border-radius: 20rem;
  }
`;

export const OutlinedTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: transparent;
    border: none !important;
    outline: none !important;
    color: #474747;

    fieldset {
      border: 1px solid #d8d8d8;
      border-radius: 40px;
      outline: none;
    }
  }
  .MuiInputBase-input::placeholder {
    /* Change the placeholder text color here */
    color: #000000; /* Replace with your desired color */
  }
`;

export const NoOutlineTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: transparent;
    border: none !important;
    outline: none !important;
    color: #525252;

    fieldset {
      border: none !important;
      outline: none !important;
    }
  }
`;

export const SquareTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: #5d5d5d;
    border-radius: 5px;
    color: #acceca;
    border: 1px solid #939393;
    height: 2.5rem;
    outline: none;

    &:focus {
      outline: none;
      border: none;
    }
  }
`;

export default StyledTextField;
