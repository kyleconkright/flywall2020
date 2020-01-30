import { NextPage } from "next";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
interface Props {
  members?: any;
}

const Page: NextPage<Props> = ({ members }) => (
  <div>
    <Head>
      <title>Senate Members</title>
    </Head>
    Members ({members.length})
    <ul>
      {members.map(member => {
        return (
          <li key={member.id}>
            <Link href={`/member/${member.id}`}>
              <a>
                {member.short_title} {member.first_name} {member.last_name} (
                {member.id})
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);

Page.getInitialProps = async () => {
  try {
    const res: any = await axios.get("http://localhost:2020/api/members");
    return { members: res.data.data[0].members };
  } catch (error) {
    console.error(error);
    return { members: [] };
  }
};

export default Page;
