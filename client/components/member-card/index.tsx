import Link from "next/link";
import styled from "styled-components";
import { theme } from "./../../styles/theme";
import State from "./state";

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
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  min-height: 200px;
  padding: 1rem;
  cursor: pointer;
  span {
    font-size: ${theme.font1};
    color: ${theme.grey2};
  }
`;

const ImgHolder = styled.div`
  background: ${theme.grey1};
  height: 100px;
  width: 100px;
  border-radius: 500px;
`;

const MemberCard = (props: Props) => {
  return (
    <StyledMemberCard>
      <Link href={`/member/${props.member.id}`}>
        <Wrapper>
          <ImgHolder />
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
