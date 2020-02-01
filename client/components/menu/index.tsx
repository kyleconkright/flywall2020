import Link from 'next/link';
import styled from 'styled-components';
import { theme } from './../../styles/theme';
import { useCallback } from 'react';

const StyledMenu = styled.nav`
  background: ${theme.green};
  color: white;
`

const Trigger = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  div {
    height: 3px;
    width: 30px;
    border-radius: 2px;
    background: white;
    margin: 4px 0;
  }
`

const Menu = () => {
  const handleClick = useCallback(() => {
    console.log('open menu with react hooks')
  }, [])
  return (
    <StyledMenu>
      <Trigger onClick={handleClick}>
        <div></div>
        <div></div>
      </Trigger>
    </StyledMenu>
  )
}


export default Menu;

