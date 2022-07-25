import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import '../styles/globals.css'
import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps } from 'next/app'
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
// kindacode.com
//import '../styles/globals.css'
//import type { AppProps } from 'next/app'

//function MyApp({ Component, pageProps }: AppProps) {
//  return <Component {...pageProps} />/
//}

//export default MyApp
