import { Lock, MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import axios from "axios";
import { Fragment, Suspense } from "react";
import ButtonLoader from "@/_subComponents/buttonLoader";
import { UserDataTypes } from "@/types";
import Link from "next/link";
//@types

const fetchUsers = async () => {
  try {
    const res = await axios.get("http://localhost:9000/api/v1/auth/user/all", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjQyMzRmNTllOWZlNjY0MGFiZWE3MzEiLCJpYXQiOjE3MTU3MDUzMzcsImV4cCI6MTcxNjMxMDEzN30.JjKzzmJA6xfUbddHMAqx1b5okDWXUuTHvBM3s46SYVI",
      },
    });
    if (res.data.success) return res.data;
    else return null;
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};
export default async function Dashboard() {
  const users = await fetchUsers();
  // console.log(users.data.getUsers);
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Manage All the user of on your site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="">
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell ">
                      <span className="font-medium">No.</span>
                    </TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Updated at
                    </TableHead>
                    <TableHead>
                      <span className="font-medium">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <Suspense
                  fallback={
                    <div>
                      <ButtonLoader />
                    </div>
                  }
                >
                  <TableBody className="">
                    {!users ? (
                      <div>No Data found</div>
                    ) : (
                      users.data.getUsers.map(
                        (userData: UserDataTypes, index: number) => {
                          return (
                            <Fragment key={userData._id}>
                              <TableRow className="cursor-default ">
                                <TableCell className="hidden sm:table-cell">
                                  {index + 1}
                                </TableCell>
                                <TableCell className="font-medium">
                                  {userData.username}
                                </TableCell>
                                <TableCell>{userData.fullName}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">
                                    {userData.role}
                                  </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {userData.email}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {userData.createdAt}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {userData.updatedAt}
                                </TableCell>
                                <TableCell>
                                  {userData.username === "zlaam" ? (
                                    <span className="flex items-center gap-2 cursor-not-allowed text-red-500 select-none">
                                      <Lock size={15} />
                                      Not Allowed
                                    </span>
                                  ) : (
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          aria-haspopup="true"
                                          size="icon"
                                          variant="ghost"
                                        >
                                          <MoreHorizontal className="h-4 w-4" />
                                          <span className="sr-only">
                                            Toggle menu
                                          </span>
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>
                                          Actions
                                        </DropdownMenuLabel>
                                        <Link href={`/`}>
                                          <DropdownMenuItem>
                                            edit
                                          </DropdownMenuItem>
                                        </Link>
                                        <Link href={`/`}>
                                          <DropdownMenuItem>
                                            Delete
                                          </DropdownMenuItem>
                                        </Link>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  )}
                                </TableCell>
                              </TableRow>
                            </Fragment>
                          );
                        }
                      )
                    )}
                  </TableBody>
                </Suspense>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
