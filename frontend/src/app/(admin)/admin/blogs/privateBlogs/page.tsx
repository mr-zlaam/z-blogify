import { MoreHorizontal } from "lucide-react";

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
import moment from "moment";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { API as axios } from "@/axios";
import { BlogTypes } from "@/types";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import htmlParser from "html-react-parser";
import Link from "next/link";
const fetchPrivateBlogs = async () => {
  try {
    const response = await axios.get("/blogs/draftBlogs");
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    return error.response.data.statusCode || 403;
  }
};

export default async function PrivateBlogs() {
  const draftPrivateBlogs: BlogTypes | 403 = await fetchPrivateBlogs();
  if (draftPrivateBlogs === 403) return redirect("/home");
  const { data } = draftPrivateBlogs!;

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Private Blogs</CardTitle>
              <CardDescription>
                Modified your private blogs and share it with public
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="">
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell ">
                      <span className="font-medium">Post No.</span>
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Blogs Description</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created At
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Updated At
                    </TableHead>
                    <TableHead>
                      <span className="font-medium">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="b">
                  {data.length === 0 ? (
                    <div>No Data Found</div>
                  ) : (
                    data?.map((privateBlog, index: number) => {
                      return (
                        <Fragment key={privateBlog._id}>
                          <TableRow className="">
                            <TableCell className="hidden sm:table-cell">
                              <span className="font-medium">{index + 1}</span>
                            </TableCell>
                            <TableCell className="font-medium">
                              {privateBlog.blogTitle}
                            </TableCell>
                            <TableCell className=" max-w-[300px] text-clip line-clamp-2">
                              <div className="block h-[50px] w-[300px] text-clip line-clamp-2 overflow-hidden">
                                {htmlParser(privateBlog.blogDescription)}
                              </div>
                            </TableCell>
                            <TableCell>{privateBlog.blogAuthor}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {moment(privateBlog.createdAt).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              )}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {moment(privateBlog.updatedAt).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              )}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <Link href={`updateBlog/${privateBlog._id}`}>
                                    <DropdownMenuItem>edit</DropdownMenuItem>
                                  </Link>
                                  <Link href={`deleteBlog/${privateBlog._id}`}>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                  </Link>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        </Fragment>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
