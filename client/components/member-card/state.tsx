import Link from "next/link";
import styled from "styled-components";
import { theme } from "./../../styles/theme";
import { getPartyColor } from "../member-page/role-dashboard";

interface props {
  state: string;
  party: string;
}

const StateChip = styled.div`
  background: ${theme.grey1};
  color: ${(p: any) => getPartyColor(p.party)};
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
