import { API as axios } from "@/axios";
import useCookieGrabber from "@/hooks/useCookieGrabber";
export default async function CheckIfAdmin() {
  const token = useCookieGrabber();

  try {
    const response = await axios.get("/blogs/checkIfuserIsAdmin", {
      headers: {
        Authorization: `Bearer ${token?.value || ""}`,
      },
    });
    return response.data;
  } catch (error: any) {
    error;
  }
}
