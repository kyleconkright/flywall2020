import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { theme } from "../styles/theme";
interface Props {}

const SideNav: React.FC<Props> = (props) => {
  const [path, setPath] = useState(null);
  return (
    <StyleNav>
      <Link href="/bills">
        <a
          onClick={() => setPath("/bills")}
          className={path === "/bills" ? "active" : ""}
        >
          Bills
        </a>
      </Link>
      <Link href="/members">
        <a
          onClick={() => setPath("/members")}
          className={path === "/members" ? "active" : ""}
        >
          Members
        </a>
      </Link>
      <Link href="/congress">
        <a
          onClick={() => setPath("/congress")}
          className={path === "/congress" ? "active" : ""}
        >
          Congress
        </a>
      </Link>
    </StyleNav>
  );
};

export default SideNav;

const StyleNav = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-column-gap: 4px;
  width: 100%;
  a {
    background: ${theme.grey1};
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background: ${theme.grey2};
    }
    &.active {
      background: white;
      border: 2px solid ${theme.grey1};
      border-bottom: none;
    }
  }
`;
