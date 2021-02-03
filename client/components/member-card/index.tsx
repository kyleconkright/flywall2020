import Link from "next/link";
import styled from "styled-components";
import { theme } from "./../../styles/theme";
import State from "./state";
import { SyntheticEvent, useState } from "react";

interface Props {
  compareMode?: boolean;
  setCompareMembers?(id: string): void;
  selectedMembers?: string[];
  member: {
    id: string;
    title: string;
    short_title: string;
    first_name: string;
    last_name: string;
    state: string;
    party: string;
  };
}

const StyledMemberCard = styled.li`
  box-shadow: 0 0 2px #eee;
  border-radius: 2px;
  background: ${(p) => (p.isSelected ? theme.grey1 : "white")};
  color: ${theme.grey5};
  position: relative;
`;

const Wrapper = styled.a`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  min-height: 100px;
  padding: 1rem;
  cursor: pointer;
  span {
    font-size: ${theme.font1};
    color: ${theme.grey2};
  }
  div.name-title {
    flex: 1;
    margin: 0 2rem 0 1rem;
  }
  img {
    &.hide {
      background: ${theme.grey1};
      width: 70px;
      box-shadow: 0 0 5px #ccc;
      border: 2px solid #f9f9f9;
      object-position: top;
      object-fit: cover;
      height: 70px;
      border-radius: 500px;
    }
  }
`;

const ImgHolder = styled.div`
  background: ${theme.grey1};
  width: 70px;
  box-shadow: 0 0 5px #ccc;
  border: 2px solid #f9f9f9;
  object-position: top;
  object-fit: cover;
  height: 70px;
  border-radius: 500px;
`;

const ImgStyled = styled.img`
  background: ${theme.grey1};
  width: 70px;
  box-shadow: 0 0 5px #ccc;
  border: 2px solid #f9f9f9;
  object-position: top;
  object-fit: cover;
  height: 70px;
  border-radius: 500px;
`;
function createImageLink(id: string): string {
  const first = id.split("")[0];
  return `http://bioguide.congress.gov/bioguide/photo/${first}/${id}.jpg`;
}

const MemberCard = (props: Props) => {
  if (props.compareMode) {
    return (
      <StyledMemberCard>
        <Wrapper>
          <div>
            <input
              type="checkbox"
              onClick={() => props.setCompareMembers(props.member.id)}
              checked={new Set(props.selectedMembers).has(props.member.id)}
            />
          </div>
          <ImgStyled
            onError={(e: SyntheticEvent) => {
              e.currentTarget.classList.add("hide");
              e.currentTarget.removeAttribute("src");
            }}
            src={createImageLink(props.member.id)}
            alt={`${props.member.first_name} ${props.member.last_name}`}
          />

          <div>
            <p>
              {props.member.first_name} {props.member.last_name}
            </p>
            <span>{props.member.title}</span>
          </div>
          <State party={props.member.party} state={props.member.state}></State>
        </Wrapper>
      </StyledMemberCard>
    );
  }
  return (
    <StyledMemberCard>
      <Link href={`/member/${props.member.id}`}>
        <Wrapper>
          <ImgStyled
            onError={(e: SyntheticEvent) => {
              e.currentTarget.classList.add("hide");
              e.currentTarget.removeAttribute("src");
            }}
            src={createImageLink(props.member.id)}
            alt={`${props.member.first_name} ${props.member.last_name}`}
          />

          <div className="name-title">
            <p>
              {props.member.first_name} {props.member.last_name}
            </p>
            <span>{props.member.title}</span>
          </div>
          <State party={props.member.party} state={props.member.state}></State>
        </Wrapper>
      </Link>
    </StyledMemberCard>
  );
};

export default MemberCard;
