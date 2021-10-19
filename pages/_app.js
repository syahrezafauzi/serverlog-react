import { Provider } from 'react-redux'
import '../styles/globals.css'
// import store from './store'

function MyApp({ Component, pageProps }) {
  // console.log('imehereeee2')
  return <Component {...pageProps} />
}

function getInitialProps(){
  // console.log('imehereeee')
}

export default MyApp
