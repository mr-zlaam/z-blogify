"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
interface RedirectorPropsType {
  isAdmin: boolean;
}
function Redirector(isAdmin: RedirectorPropsType) {
  const router = useRouter();
  const Admin = () => {
    if (!isAdmin) return router.push("/home");
  };
  useEffect(() => {
    Admin();
  });
  return (
    <>
      <section>Redirector</section>
    </>
  );
}

export default Redirector;
