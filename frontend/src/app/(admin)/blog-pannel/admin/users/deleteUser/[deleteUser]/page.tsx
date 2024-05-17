"use client";
import { Button } from "@/components/ui/button";
import { useMessage } from "@/hooks/useMessage";
import axios from "axios";
import { useRouter } from "next/navigation";
import {} from "react";
interface ParamType {
  deleteUser: string;
}
function Delete({ params }: { params: ParamType }) {
  const router = useRouter();
  const { deleteUser } = params;
  const { errorMessage, successMessage } = useMessage();
  const RedirectToPreviousPage = () => {
    router.push("/blog-pannel/admin/users");
  };
  const deleteThisUser = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:9000/api/v1/auth/user/deleteUser/${deleteUser}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjQyMzRmNTllOWZlNjY0MGFiZWE3MzEiLCJpYXQiOjE3MTU3MDUzMzcsImV4cCI6MTcxNjMxMDEzN30.JjKzzmJA6xfUbddHMAqx1b5okDWXUuTHvBM3s46SYVI",
          },
        }
      );
      console.log(response.data);
      if (response.status === 204) {
        successMessage(response.data.message);
        setTimeout(() => {
          RedirectToPreviousPage();
        }, 3000);
      }
    } catch (error: any) {
      console.log(error);
      errorMessage(error.response.data.message);
    }
  };
  return (
    <>
      <section className="backdrop-blur-lg h-screen  absolute left-0 top-0 w-full z-50 px-5">
        <div className="h-40 flex flex-col justify-around border bg-background border-foreground max-w-lg mx-auto relative top-80  rounded-md p-4 ">
          <h1>Are You sure that you want to delete this user?</h1>
          <p>{deleteUser}</p>
          <div className="w-full flex justify-end items-center gap-5">
            <Button onClick={RedirectToPreviousPage}>Close</Button>
            <Button onClick={deleteThisUser}>Yes I am sure</Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Delete;
