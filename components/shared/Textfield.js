import styled from '@emotion/styled';
import { TextField, Input } from '@mui/material';

export const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: #ffffff;
    border-radius: 40rem;

    width: 100%;
    // padding: 0 12px;
    align-items: center;
  }
`;
export const SimpleTextField = styled(TextField)`
  width: 100%;
  .MuiInputBase-root {
    background-color: #f0f3f4;
    border-radius: 10rem;
    margin: 8px 0;

    align-items: center;
  }
  fieldset {
    border: 1px solid #f0f3f4;
    width: 100%;
  }
`;
export const StyledTextFieldBrowse = styled(TextField)`
  .MuiInputBase-root {
    background-color: #f2f2f2;
    border-radius: 40rem;
    margin: auto;
    width: 74%;
    align-items: center;
  }
`;
export const StyledTextField2 = styled.div`
  background-color: #ffffff;
  border-radius: 10rem;
  width: 100%;
  // margin-left: 20px;
  // width: 10%;
  // align-items: center;
`;

export const OutlinedTextField = styled(TextField)`
  .MuiInputBase-root {
    // background-color: transparent;
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
 
    background-color: transparent;
    border: none !important;
    outline: none !important;
    color: #474747;

    fieldset {
      border: 1px solid #d8d8d8;
      border-radius: 0px;
      outline: none;
      width: 24rem;
    }
  }
 
  
`;
// export const NoOutlineTextField = styled(TextField)`
//   .MuiInputBase-root {
//     background-color: transparent;
//     border: none !important;
//     outline: none !important;
//     color: #525252;

//     fieldset {
//       border: none !important;
//       outline: none !important;
//     }
//   }
// `;

export const SquareTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: #5d5d5d;

    color: #acceca;
    border: 1px solid red;
    height: 2.5rem;
    outline: none;

    &:focus {
      outline: none;
      border: none;
    }
  }
`;
// export const SquareTextField = styled(TextField)`
//   .MuiInputBase-root {
//     background-color: #5d5d5d;
//     border-radius: 5px;
//     color: #acceca;
//     border: 1px solid #939393;
//     height: 2.5rem;
//     outline: none;

//     &:focus {
//       outline: none;
//       border: none;
//     }
//   }
// `;

export default StyledTextField;
