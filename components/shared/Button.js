import styled from "@emotion/styled";

const Button = styled.button`
  outline: none;
  background: ${props => props.variant === 'outlined' ? "transparent" : 'linear-gradient(104deg, #FF5A5F 0%, #A52226 100%)'};
  color: ${props => props.variant === 'outlined' ? "#EB4C60" : "#ffffff"};
  border-radius: 21px;
  border:1px solid ${props => props.variant === 'outlined' ? "#EB4C60" : "red"};
  font-family: 'Montserrat', sans-serif;
  font-size: ${props => props.size === "small" ? '10px' : "14px" };
  cursor: ${props => props.disabled === 'disabled' ? 'not-allowed' : 'pointer'};
  text-decoration: none;
  display:block;
  padding: ${props => props.variant === 'outlined' ? "0.5rem 3rem" : props.size === 'small' ? "1rem 2rem": "1rem 1rem"};
  pointer-events: ${props => props.disabled === 'disabled' ? 'none' : ''};
  text-align: center;
  transition: all 0.5s ease-in-out;

  &:hover{
      border: 1px solid ${props => props.variant === 'outlined' ? "#0F7669" : "#EB4C60"};;
      background: ${props => props.variant === 'outlined' ? '#0F7669' : 'linear-gradient(to right, #A52226, #FF5A5F)'};
      color: #ffffff;
  }
  &:active{
  }
`;

export default Button;