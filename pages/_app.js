//import { ContextWrapper } from "../context/ContextWrapper";
//import { SessionProvider } from "next-auth/react";
import {  } from "../src/store";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { wrapper } from "../store/store";

const MyApp = ({ Component, pageProps }) => {
  //const store = useStore(pageProps.initialReduxState);
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);
