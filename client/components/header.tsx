import Link from 'next/link';
import styled from 'styled-components';
import { theme } from './../styles/theme';
import Menu from './menu';

const StyledHeader = styled.header`
  background: ${theme.green};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  z-index: 1;
`

const Logo = styled.a`
  font-size: 1.25rem;
  font-weight: 500;
  color: white;
`

const Header = () => (
  <StyledHeader>
    <Link href="/">
      <Logo>FlyWall</Logo>
    </Link>
    <Menu />
  </StyledHeader>
);

export default Header;