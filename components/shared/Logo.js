import styled from "@emotion/styled";
import Image from "next/image";
import LogoImage from "/public/assets/img/logo-hinyn.svg";
import WhiteLogoImage from "/public/assets/img/logo-hinyn-white.svg";


const LogoContainer = styled.div`
  position: relative;
  width: 8rem;
  height: auto;
`
function Logo({type}) {
  return (
    <LogoContainer>
          <Image src={type === "white" ? WhiteLogoImage :  LogoImage} layout="responsive" alt="logo-img"/>
    </LogoContainer>
  )
}

export default Logo