import styled from 'styled-components';
import { theme } from './../../styles/theme';
import { useState } from 'react';

const StyledButton = styled.button`
  color: ${theme.green};
  background: white;
  border-radius: 2px;
  border: 2px solid ${theme.green};
  padding: .75rem 1rem;
  outline: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: .1s all;
  &.active {
    background: ${theme.green};
    color: white;
  }
`

const Button = (props) => {

  return (
    <StyledButton className={props.active ? 'active' : null} onClick={() => { props.action() }}>{props.text}</StyledButton>
  );
}

export default Button;