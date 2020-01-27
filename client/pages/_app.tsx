import './../styles/stylesheet.scss';
import Header from "../components/header";

const layoutStyle = {
  display: 'grid'
}


function FlywallApp({ Component, pageProps = {} }) {
  return (
    <main style={layoutStyle}>
      <Header />
      <Component {...pageProps} />
    </main>
  )
}

export default FlywallApp