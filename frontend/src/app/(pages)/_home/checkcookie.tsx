"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";

import {} from "react";

function CheckCookie() {
  const sendCookie = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/v1/auth/", {
        withCredentials: true,
      });
      console.log(response);
      if (response.status === 200) {
        alert("cookie has been sent");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <section>
        <Button onClick={sendCookie}>Send Cookie to Server</Button>
      </section>
    </>
  );
}

export default CheckCookie;
