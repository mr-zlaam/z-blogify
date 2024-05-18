import { cookies } from "next/headers";
export default function middleware() {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");
  console.log(token);
}
