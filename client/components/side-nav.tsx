import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { theme } from "../styles/theme";
interface Props {}

const SideNav: React.FC<Props> = () => {
  return (
    <StyleNav>
      <Link href="/bills">
        <a>Bills</a>
      </Link>
      <Link href="/members">
        <a>Members</a>
      </Link>
      <Link href="/congress">
        <a>Congress</a>
      </Link>
    </StyleNav>
  );
};

export default SideNav;

const StyleNav = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: repeat(auto-fill, minmax(25px, 1fr));
  grid-row-gap: 1px;

  a {
    background: ${theme.grey1};
    &:hover {
      background: white;
    }
  }
`;
