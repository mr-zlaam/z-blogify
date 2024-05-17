"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {} from "react";
interface ParamType {
  deleteUser: string;
}
function Delete({ params }: { params: ParamType }) {
  const router = useRouter();
  const RedirectToPreviousPage = () => {
    router.push("/blog-pannel/admin/users");
  };
  const { deleteUser } = params;
  const deleteThisUser = async () => {};
  return (
    <>
      <section className="backdrop-blur-lg h-screen  absolute left-0 top-0 w-full z-50 px-5">
        <div className="h-40 flex flex-col justify-around border border-foreground max-w-lg mx-auto relative top-80  rounded-md p-4 shadow-md shadow-white/50">
          <h1>Are You sure that you want to delete this user?</h1>
          <p>{deleteUser}</p>
          <div className="w-full flex justify-end items-center gap-5">
            <Button onClick={RedirectToPreviousPage}>Close</Button>
            <Button>Yes I am sure</Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Delete;
