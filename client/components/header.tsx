import Link from "next/link";
import styled from "styled-components";
import { theme } from "./../styles/theme";
import Menu from "./menu";
import BugLogo from "../assets/images/flywall-logo.png";
const StyledHeader = styled.header`
  background: ${theme.green};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  z-index: 1;
`;

const Logo = styled.a`
  font-size: 1.25rem;
  font-weight: 500;
  color: white;
  @media (max-width: 900px) {
    display: none;
  }
`;
const ImgLogo = styled.img`
  height: 30px;
`;

export const CenterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = () => (
  <StyledHeader>
    <Link href="/">
      <CenterContent>
        <ImgLogo src={BugLogo} alt="FLYWALL Logo" />
        <Logo>FlyWall</Logo>
      </CenterContent>
    </Link>
    <Menu />
  </StyledHeader>
);

export default Header;
