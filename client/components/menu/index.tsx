import Link from 'next/link';
import styled from 'styled-components';
import { theme } from './../../styles/theme';
import { useCallback, useState } from 'react';
import Search from './search';

const StyledMenu = styled.nav`
  background: ${theme.green};
  position: absolute;
  padding: 1rem;
  right: 0;
  height: 100%;
  width: 62px;
  top: 0;
`

const Trigger = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  cursor: pointer;
  div {
    height: 3px;
    width: 30px;
    border-radius: 2px;
    background: white;
    margin: 4px 0;
    transition: .2s all;
  }
  &.active {
    div {
      position: absolute;
      top: 1.45rem;
      transform: rotate(135deg);
      &:last-of-type {
        transform: rotate(-135deg);
      }
    }
  }
`

const MenuItems = styled.div`
  box-shadow: 0 0 2px #ccc;
  background: white;
  width: 80vw;
  position: absolute;
  top: 100%;
  left: 100%;
  padding: 2rem;
  height: calc(100vh - 57px);
  transition: .2s all;
  &.active {
    transform: translate(-100%, 0);
  }
`

const Menu = () => {
  const [ menuActive, setMenuState ] = useState(false);

  return (
    <StyledMenu>
      <Trigger className={menuActive ? 'active' : null} onClick={() => setMenuState(!menuActive)}>
        <div></div>
        <div></div>
      </Trigger>
      <MenuItems className={menuActive ? 'active' : null}>
        <Search></Search>
      </MenuItems>
    </StyledMenu>
  )
}


export default Menu;

