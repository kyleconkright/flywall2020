import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { Store } from "redux";
import App from "next/app";
import createStore from "../redux/store";

import "./../styles/stylesheet.scss";
import Header from "../components/header";
import SideNav from "../components/side-nav";

const layoutStyle = {
  display: "grid",
  background: "#F6F7F9",
};

class FlywallApp extends App<{ store: Store }> {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps = {}, store } = this.props;
    return (
      <Provider store={store}>
        <main style={layoutStyle}>
          <Header />
          <div
            style={{
              marginTop: "62px",
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gridGap: "3px",
            }}
          >
            <SideNav />
            <div style={{ padding: "10px" }}>
              <Component {...pageProps} />
            </div>
          </div>
        </main>
      </Provider>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(FlywallApp));
