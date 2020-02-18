import Head from "next/head";
import axios from "axios";
import { Component, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Url } from "url";
import { theme } from "../styles/theme";
import debounce from "lodash/debounce";
import { searchBills, updateSearchBillQuery } from "../redux/actions";
import { bindActionCreators, Dispatch } from "redux";
import Link from "next/link";
interface Props {
  bills: Bill[];
  initBills: Bill[];
  billSearchQuery: string;
  searchBills(query: string): void;
  updateSearchBillQuery(updateSearchBillQuery: string): void;
}

class BillsComponent extends Component<Props> {
  static async getInitialProps({ ctx }) {
    try {
      const { store, isServer } = ctx;
      const { billSearchQuery } = store.getState();

      store.dispatch(searchBills(billSearchQuery));
      return { isServer, store };
    } catch (error) {
      console.log("GET Bills Error", error);
      return { bills: [] };
    }
  }

  onBillChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.props.updateSearchBillQuery(e.currentTarget.value);
    this.debounceSearchBills();
  };

  searchBills = () => {
    this.props.searchBills(this.props.billSearchQuery);
  };
  debounceSearchBills = debounce(this.searchBills, 1001);

  render() {
    return (
      <div>
        <Head>
          <title>Bills</title>
        </Head>
        <div style={{ padding: "4px" }}>
          <div>
            <div>Bill Search</div>
            <input
              type="text"
              placeholder="search for a bill"
              value={this.props.billSearchQuery}
              onChange={this.onBillChange}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fill, minmax(400px, 1fr))`,
            gridGap: "8px",
            margin: "10px"
          }}
        >
          {this.props.bills.map(bill => {
            return (
              <div
                key={bill.number}
                style={{ border: `1px solid ${theme.grey}` }}
              >
                <div
                  className="header"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    background: theme.grey,
                    padding: "10px"
                  }}
                >
                  <div>
                    <Link href={`/bill/${bill.bill_slug}`}>
                      <a>{bill.number}</a>
                    </Link>
                    {bill.active ? "😎" : "💀"}
                  </div>
                  <span style={{ fontSize: ".8rem" }}>
                    <i>last action: </i>
                    {new Date(
                      bill.latest_major_action_date
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <small style={{ margin: "3px" }}>NAME</small>
                  <div>{bill.short_title || "no title"}</div>
                </div>
                <div>
                  <small style={{ margin: "3px" }}>SPONSOR</small>
                  <span style={{ fontSize: ".9em" }}>
                    {bill.sponsor_name} ({bill.sponsor_party} -{" "}
                    {bill.sponsor_state})
                  </span>
                </div>
                <div>
                  <small style={{ margin: "3px" }}>COSPONSORS</small>
                  <span>
                    {bill.cosponsors} - (D: {bill.cosponsors_by_party.D || 0},
                    R: {bill.cosponsors_by_party.R || 0})
                  </span>
                </div>
                <div>
                  <small style={{ margin: "3px" }}>SUBJECT</small>
                  <div>{bill.primary_subject || "No Subject"}</div>
                </div>
                <div>
                  <small style={{ margin: "3px" }}>LAST ACTION</small>
                  <div style={{ fontSize: ".7rem" }}>
                    {bill.latest_major_action}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps() {
  return (dispatch: Dispatch) =>
    bindActionCreators(
      {
        searchBills,
        updateSearchBillQuery
      },
      dispatch
    );
}

export default connect(state => state, mapDispatchToProps)(BillsComponent);

export interface Bill {
  bill_id: string;
  bill_slug: string;
  bill_type: string;
  number: string;
  bill_uri: string;
  title: string;
  short_title: string;
  sponsor_title: string;
  sponsor_id: string;
  sponsor_name: string;
  sponsor?: string;
  sponsor_state: string;
  sponsor_party: string;
  sponsor_uri: string;
  gpo_pdf_uri: string;
  congressdotgov_url: Url;
  govtrack_url: Url;
  introduced_date: Date;
  active: boolean;
  last_vote: Date;
  house_passage: Date;
  senate_passage?: Date;
  enacted?: boolean;
  vetoed?: boolean;
  cosponsors: number;
  cosponsors_by_party: { D: number; R: number };
  committees: string;
  committee_codes: string[];
  subcommittee_codes: string[];
  primary_subject: string;
  summary: string;
  summary_short: string;
  latest_major_action_date: Date;
  latest_major_action: string;
}

type PartyChoices = "D" | "R";
