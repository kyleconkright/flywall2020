import React from "react";

import { connect } from "react-redux";
import styled from "styled-components";

import { TabTitle } from "../components/head/head";
import Members from "./members";
import Congress from "./congress";
import Bills from "./bills";
interface Props {}

const Home: React.FC<Props> = (props: any) => {
  return (
    <div>
      <TabTitle title="FlyWall - Home" />
      <HomeLayout>
        <div className="widget-content members-widget">
          <Members {...props} />
        </div>
        <div className="widget-content bills-widget">
          <Bills {...props} />
        </div>
        <div className="widget-content twitter-widget">twitter-widget</div>
        <div className="widget-content congress-widget">
          <Congress {...props} />
        </div>
      </HomeLayout>
    </div>
  );
};

export default connect((state) => state)(Home);

const HomeLayout = (props) => {
  return <StyledLayout>{props.children}</StyledLayout>;
};

const StyledLayout = styled.div`
  display: grid;
  grid-template-areas: "members-widget members-widget bills-widget" "twitter-widget congress-widget congress-widget";
  grid-template-rows: repeat(auto-fill, 500px);
  grid-template-columns: repeat(3, 1fr);
  min-height: 100vh;
  grid-gap: 15px;
  .widget-content {
    border-radius: 3px;
    background: white;
    padding: 5px;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%),
      0 1px 3px 1px rgb(60 64 67 / 15%);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;
  }
  .members-widget {
    grid-area: members-widget;
    width: 100%;
  }
  .bills-widget {
    grid-area: bills-widget;
  }
  .twitter-widget {
    grid-area: twitter-widget;
  }
  .congress-widget {
    grid-area: congress-widget;
  }

  @media (max-width: 900px) {
    grid-template-areas: "members-widget" "bills-widget" "twitter-widget" " congress-widget";
    grid-template-columns: 1fr;
  }
`;
