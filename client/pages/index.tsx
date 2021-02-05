import React from "react";
import Head from "next/head";
import { TabTitle } from "../components/head/head";
interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <div>
      <TabTitle title="FlyWall - Home" />
      Welcome to Flywall
    </div>
  );
};

export default Home;
