import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

interface Props {
  member?: any;
}

const MemberIdPage: NextPage<Props> = ({ member }) => {
  if (!member) {
    return <div>Working on it.</div>;
  }

  return (
    <div>
      <hr></hr>
      <Head>
        <title>{`${member.first_name} ${member.last_name}`}</title>
      </Head>
      <div>
        <div>
          Member Name: {member.first_name} {member.last_name} ({member.id})
          party: ({member.current_party})
        </div>
        <hr></hr>
        {Object.entries(member).map(([key, entry]) => {
          switch (typeof entry) {
            case "object":
              if (Array.isArray(entry)) {
                return (
                  <div key={key} style={{ margin: "15px" }}>
                    <p style={{ fontWeight: 900 }}>{key}</p>
                    {entry.map(e => {
                      return (
                        <div
                          style={{
                            margin: "10px",
                            padding: "10px",
                            border: "thin solid black"
                          }}
                        >
                          {Object.entries(e).map(([k, e]) => {
                            switch (typeof e) {
                              case "object":
                                if (Array.isArray(e)) {
                                  return (
                                    <div
                                      key={k}
                                      style={{
                                        display: "grid"
                                      }}
                                    >
                                      <p style={{ fontWeight: 900 }}>{k}</p>
                                      {e.map(e => {
                                        return (
                                          <div
                                            style={{
                                              margin: "10px",
                                              border: "1px solid lightgrey"
                                            }}
                                          >
                                            {Object.entries(e).map(
                                              ([ke, en]) => {
                                                switch (typeof en) {
                                                  case "object":
                                                    return (
                                                      <div key={ke}>
                                                        <span
                                                          style={{
                                                            fontWeight: 900
                                                          }}
                                                        >
                                                          {ke}
                                                        </span>
                                                        <span>
                                                          {JSON.stringify(en)}
                                                        </span>
                                                      </div>
                                                    );

                                                  default:
                                                    return (
                                                      <div key={ke}>
                                                        <span
                                                          style={{
                                                            fontWeight: 900
                                                          }}
                                                        >
                                                          {ke}
                                                        </span>
                                                        <span>{en}</span>
                                                      </div>
                                                    );
                                                }
                                              }
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  );
                                }
                                return (
                                  <div key={k}>
                                    <span style={{ fontWeight: 900 }}>{k}</span>
                                    <span>{JSON.stringify(e)}</span>
                                  </div>
                                );

                              default:
                                return (
                                  <div key={k}>
                                    <span style={{ fontWeight: 900 }}>{k}</span>
                                    <span>{e}</span>
                                  </div>
                                );
                            }
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              }
              return (
                <div key={key}>
                  <span style={{ fontWeight: 900 }}>{key}</span>{" "}
                  <span>{JSON.stringify(entry)}</span>
                </div>
              );

            default:
              return (
                <div key={key}>
                  <span style={{ fontWeight: 900 }}>{key}</span>{" "}
                  <span>{entry}</span>
                </div>
              );
          }
        })}
      </div>
    </div>
  );
};

MemberIdPage.getInitialProps = async props => {
  try {
    const res: any = await axios.get(
      `http://localhost:2020/api/member/${props.query.mid}`
    );
    return { member: res.data.data[0] };
  } catch (error) {
    console.log("GET Member Error", error);
    return { member: null };
  }
};

export default MemberIdPage;
