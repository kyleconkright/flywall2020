import Link from 'next/link';
import styled from 'styled-components';
import { theme } from './../styles/theme';
import Menu from './menu';

const StyledHeader = styled.header`
  background: ${theme.green};
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`

const Logo = styled.a`
  font-size: 1.25rem;
  font-weight: 500;
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