import { NextPage } from "next";
import Head from "next/head";

interface Props {
  member?: any;
}

const MemberPage: NextPage<Props> = ({ member, ...rest }) => {
  console.log("rest >> ", rest);
  return (
    <div>
      <Head>
        <title>Senate Member {member}</title>
      </Head>
      <div>Member</div>
    </div>
  );
};

export default MemberPage;
