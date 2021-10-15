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
  background: #b4fce3;
  align-items: center;
  grid-template-rows: repeat(auto-fill, minmax(50px, 1fr));
  grid-gap: 4px;
  width: 100%;
  padding: 2px;
  min-height: 100vh;
  a {
    padding: 10px;
    box-shadow: 0px 0px 2px 0px ${theme.green};
    background: #59c7a0;
    height: 100%;
    display: flex;
    color: white;
    justify-content: center;
    align-items: center;
    &:hover {
      background: ${theme.green};
    }
    &.active {
      background: ${theme.green};
      border-bottom: none;
    }
  }
`;
