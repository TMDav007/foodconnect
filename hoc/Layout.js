import { useEffect } from "react";
import { useDispatch } from "react-redux";
//import { request_refresh } from '../actions/auth';
import Head from "next/head";
//import Navbar from '../components/Navbar';
import Header from "../components/Header";
import { refreshToken, verifyUser } from "../store/authSlice";

const Layout = ({ title, content, children }) => {
  const dispatch = useDispatch();
  //verifyUser
  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      // console.log("yoo");
      //dispatch(verifyUser());
      dispatch(refreshToken());
    }
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>
      <Header />
      <div className="container mt-5">{children}</div>
    </>
  );
};

Layout.defaultProps = {
  title: "FoodConnect",
  content: "An application that connects with you with your vendor instantly",
};

export default Layout;
