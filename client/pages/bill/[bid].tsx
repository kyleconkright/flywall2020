import Head from "next/head";
import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import { Bill } from "../bills";

interface Props {
  bill?: Bill;
  error?: string;
}

class BillIdPage extends Component<Props> {
  static async getInitialProps({ ctx }) {
    try {
      const { query, store } = ctx;
      const { bid } = query;
      const { chamberNumber } = store.getState();

      const res: any = await axios.post(
        `http://localhost:2020/api/bills/single`,
        {
          billId: bid,
          congress: chamberNumber
        }
      );

    

      const bill = res.data.data[0];

      return { bill, billId: bid };
    } catch (error) {
      console.log("GET Single Bill Error", error);
      return { error: error.message, bill: null };
    }
  }

  render() {
    const { bill, error } = this.props;
    if (error && !bill) {
      return <div>{error}</div>;
    }

    return (
      <div>
        <Head>
          <title>{`BIll ${bill.number}`}</title>
        </Head>
        <div>
          <div className="header">
            <div className="title">{bill.title}</div>
            <div className="short-title">
              <small>{bill.short_title}</small>
            </div>
            <div className="sponsors">
              <div>Sponsor</div>
              <div className="name">
                {bill.sponsor_title} {bill.sponsor} - ({bill.sponsor_party} -{" "}
                {bill.sponsor_state})
              </div>
            </div>
            <div className="cosponsors">
              <div>Cosponsors</div>
              <div>{bill.cosponsors}</div>
            </div>
          </div>
          <div className="info">
            <div className="number">
              <small>{bill.number}</small>
            </div>
          </div>
          <div className="committees">
            {bill.committees}
            {bill.committee_codes.join(" - ")}
          </div>
          <div className="sub-committees">
            {bill.subcommittee_codes.join(" - ")}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(BillIdPage);
