import Link from "next/link";
import styled from "styled-components";
import { theme } from "./../../styles/theme";
import State from "./state";
import { SyntheticEvent, useState } from "react";

interface Props {
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
  background: white;
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
  div {
    flex: 1;
    margin: 0 0 0 1rem;
  }
`;

const ImgHolder = styled.div`
  background: ${theme.grey1};
  height: 70px;
  width: 70px;
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
  const [showError, setComponentError] = useState(false);
  return (
    <StyledMemberCard>
      <Link href={`/member/${props.member.id}`}>
        <Wrapper>
          {showError ? (
            <ImgHolder />
          ) : (
            <ImgStyled
              onError={(e: SyntheticEvent) => {
                e.currentTarget.attributes.removeNamedItem("src");
                e.currentTarget.setAttribute("display", "none");
                setComponentError(true);
              }}
              src={createImageLink(props.member.id)}
            />
          )}
          <div>
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
