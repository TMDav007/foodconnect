import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { isAuthenticated } from "../store/authSlice";
import { getAllFood } from "../store/foodSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, user } = useSelector((state) => {
    return state.auth;
  });
  const Authenticated = useSelector(isAuthenticated);
  //console.log(Authenticated, "here");
  // useEffect(() => {
  //   if (!Authenticated) {
  //     //router.push("/signin");
  //   }
  //   console.log(Authenticated, loading, user, "dash", Date.now());
  // }, [Authenticated]);
  useEffect(() => {
    console.log(Authenticated, loading, user, "dash", Date.now());
  }, [Authenticated, router.dashboard]);

  if (!loading && !Authenticated){
    //console.log("yes i not  am")
  }

  const trythis = async () => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      try {
        const response = await dispatch(getAllFood());
        console.log(response, "response");
      } catch (error) {
        console.log(error, "erroFood");
      }
    }
  };
  return (
    <>
      {" "}
      <div>
        Dashboard {user} {Authenticated ? "yes" : "no"}
      </div>
      <button onClick={trythis}>Click me</button>
    </>
  );
}

// Dashboard.getInitialProps = async () => {
//   const Authenticated = useSelector(isAuthenticated);
//   return {
//     Authenticated
//   }
// }

export default Dashboard;
