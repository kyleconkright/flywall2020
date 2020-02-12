import Head from "next/head";
import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import { Bill } from "../bills";

interface Props {
  bill?: Bill;
}

class BillIdPage extends Component<Props> {
  static async getInitialProps({ ctx }) {
    try {
      const { query } = ctx;
      const { bid } = query;
      const res: any = await axios.get(
        `http://localhost:2020/api/bills/${ctx.query.mid}`
      );

      const bill = res.data.data[0];

      return { bill, billId: bid };
    } catch (error) {
      console.log("GET Single Bill Error", error);
      return { bill: null };
    }
  }

  render() {
    const { bill } = this.props;
    if (!bill) {
      return <div>Working on it.</div>;
    }

    return (
      <div>
        <Head>
          <title>{`BIll ID`}</title>
        </Head>
        <div>BILL ID</div>
      </div>
    );
  }
}

export default connect(state => state)(BillIdPage);
