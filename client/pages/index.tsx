import { NextPage } from 'next';
import axios from 'axios';
import Link from 'next/link';

interface Props {
  members?: any;
}

const Page: NextPage<Props> = ({ members }) => (
  <ul>
    { members.map(member => {
      return (
        <li key={member.id}>
          <Link href="/member"><a>{member.short_title} {member.first_name} {member.last_name}</a></Link>
        </li>
      )
    } )}
  </ul>
)

Page.getInitialProps = async () => {
  const res: any = await axios.get('http://localhost:2020/api/members');
  return { members: res.data.data[0].members }
}

export default Page