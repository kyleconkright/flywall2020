import Link from 'next/link';
import styled from 'styled-components';
import { theme } from './../../styles/theme';

interface props {
  state: string;
}

const StateChip = styled.div`
  background: ${theme.grey1};
  color: ${theme.grey5};
  font-weight: 900;
  padding: .5rem;
  position: absolute;
  top: .5rem;
  right: .5rem;
  font-size: ${theme.font1};
}
`

const State = (props: props) => (
  <StateChip>
    {props.state}
  </StateChip>
);

export default State;