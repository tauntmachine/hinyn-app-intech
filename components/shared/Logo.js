import styled from "@emotion/styled";
import Image from "next/image";
import LogoImage from "/public/assets/img/logo-hinyn.svg";



const LogoContainer = styled.div`
  position: relative;
  width: 8rem;
  height: auto;
`
function Logo() {
  return (
    <LogoContainer>
          <Image src={LogoImage} layout="responsive" alt="logo-img"/>
    </LogoContainer>
  )
}

export default Logo