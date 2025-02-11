import ReqApi from "@/lib/reqApi";

import { cookies } from "next/headers";
import MePage from "./me";

const page = async () => {
  const cookiesData = await cookies();
  const token = cookiesData.get("token");
  const res = await ReqApi.getMe(token?.value as string);
  console.log(res);
  return <div>Hello {res?.data?.name}</div>;
  return <MePage />;
};

export default page;
