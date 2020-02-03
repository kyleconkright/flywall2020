import Link from "next/link";
import styled from "styled-components";
import { theme } from "./../../styles/theme";

interface props {
  state: string;
  party: string;
}

const StateChip = styled.div`
  background: ${theme.grey1};
  color: ${p => (p.party === "R" ? theme.rep : theme.dem)};
  font-weight: 900;
  padding: .5rem;
  position: absolute;
  top: .5rem;
  right: .5rem;
  font-size: ${theme.font1};
}
`;

const State = (props: props) => (
  <StateChip party={props.party}>{props.state}</StateChip>
);

export default State;
