"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMessage } from "@/hooks/useMessage";
import { UserDataTypes } from "@/types";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

function UpdateForm({
  user,
  userId,
}: {
  user: { data: UserDataTypes };
  userId: string;
}) {
  const { email, fullName, role, username } = user.data;
  const { errorMessage, successMessage } = useMessage();
  const [updateUsername, setUpdateUsername] = useState(username || "username");
  const [updateFullName, setUpdateFullName] = useState(fullName || "fullName");
  const [updateEmail, setUpdateEmail] = useState(email || "email");
  const [updateRole, setUpdateRole] = useState(role || "role");
  const handleDataUpdateConfirm = async (e: FormEvent) => {
    e.preventDefault();
    //validation
    try {
      if (!updateEmail || !updateFullName || !updateRole || !updateUsername)
        return errorMessage("All fields are required.");
      if (
        updateRole !== "admin" &&
        updateRole !== "sub-admin" &&
        updateRole !== "user"
      )
        return errorMessage("Role must be user|sub-admin|admin");
      const response = await axios.patch(
        `http://localhost:9000/api/v1/auth/user/updateUser/${userId}`,
        {
          username,
          fullName,
          email,
          role,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjQyMzRmNTllOWZlNjY0MGFiZWE3MzEiLCJpYXQiOjE3MTU2MTUzMjcsImV4cCI6MTcxNjIyMDEyN30.fUMq5ojniDZa3P7wh1CJ3uBOqA3b6W98TtQBGZmm9PQ",
          },
        }
      );
      return successMessage(response.data.message);
    } catch (error: any) {
      console.log(error);
      return errorMessage(
        error.response.data.message ||
          "some thing went wrong while updating user Details"
      );
    }
  };
  return (
    <>
      <section className="">
        <form className=" max-w-sm border rounded-md mx-auto relative top-20 py-10 px-5">
          <h1 className="font-sans text-2xl font-bold text-center mb-8">
            Update User Details
          </h1>
          <div className="flex flex-col my-3 gap-1 ">
            <Label htmlFor="update-username" className="mb-1">
              username
            </Label>
            <Input
              value={updateUsername}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUpdateUsername(e.target.value);
              }}
              id="update-username"
              type="text"
              placeholder="john_doe"
            />
          </div>
          <div className="flex flex-col my-3 gap-1 ">
            <Label htmlFor="update-fullname" className="mb-1">
              Full Name
            </Label>
            <Input
              value={updateFullName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUpdateFullName(e.target.value);
              }}
              id="update-fullname"
              type="text"
              placeholder="John Doe"
            />
          </div>
          <div className="flex flex-col my-3 gap-1 ">
            <Label htmlFor="update-email" className="mb-1">
              Email
            </Label>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUpdateEmail(e.target.value);
              }}
              value={updateEmail}
              id="update-email"
              type="email"
              placeholder="john@example.com"
            />
          </div>
          <div className="flex flex-col my-3 gap-1 ">
            <Label htmlFor="update-role" className="mb-1">
              Role
            </Label>
            <Input
              value={updateRole}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUpdateRole(e.target.value);
              }}
              id="update-role"
              type="text"
              placeholder="john_doe"
            />
          </div>
          <div className="p-3">
            <Button onClick={handleDataUpdateConfirm} className="w-full">
              Update
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}

export default UpdateForm;
