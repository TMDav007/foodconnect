import cookie from "cookie";
import useFetch from "../../../components/common/useFetch";


const API_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

export default async (req, res) => {
  let api = useFetch();
  if (req.method === "GET") {

    const cookies = cookie.parse(req.headers.cookie ?? "");
    const {access, refresh} = cookies ;

    // if (access === false) {
    //   return res
    //     .status(401)
    //     .json({ error: "User unauthorized to make this request" });
    // }
    const authToken = {
      access, 
      refresh
    }
    try {
      const {response, data} = await api('api/dishes/all',authToken, res);
    // console.log(data, response.status, "feedbac")
      //const data = await apiRes.json();
      const apiRes = response

      if (apiRes.status === 200) {
        //console.log(data.data, "food fata");
        return res.status(200).json({ allFood: data.data });
      } else {
        return res.status(apiRes.status).json({ error: data.error });
      }
    } catch (err) {
      return res.status(500).json({ error: "something went wrong" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
