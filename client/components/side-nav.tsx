import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { theme } from "../styles/theme";
interface Props {}

const SideNav: React.FC<Props> = () => {
  const router = useRouter();
  return (
    <StyleNav>
      <Link href="/bills">Bills</Link>
      <Link href="/members">Members</Link>
      <Link href="/congress">Congress</Link>
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
