/**
 * import fakeData from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */

import React from "react";
import { data } from "../const/types";
import MyTable from "./Table/MyTable";

const Home = () => {
  return <MyTable passedData={data}/>;
};
export default Home;
