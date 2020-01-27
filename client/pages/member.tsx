import { NextPage } from 'next'

interface Props {
  member?: any;
}

const MemberPage: NextPage<Props> = ({member}) => (
<div>Member</div>
)

export default MemberPage