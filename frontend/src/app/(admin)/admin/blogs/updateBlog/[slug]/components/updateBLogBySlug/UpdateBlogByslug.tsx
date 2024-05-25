"use client";
import PageWrapper from "@/app/components/PageWrapper/PageWrapper";
import { AlloweTags } from "@/app/createBlog/helper/toolbar";
import { randomStringGen } from "@/app/helper/randomStringGen/randomStringGen";
import { API as axios } from "@/axios";
import { Button } from "@/components/ui/button";
import { useMessage } from "@/hooks/useMessage";
import { useSlugGenerator as UseSlugGenerator } from "@/hooks/useSlugGenerator";
import { BlogDataTypes } from "@/types";
import { AxiosError } from "axios";
import Froalaeditor from "froala-editor";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/plugins/code_view.min.css";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/code_beautifier.min.js";
import "froala-editor/js/plugins/code_view.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/save.min.js";
import parser from "html-react-parser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";

function UpdateBlogBySlug({
  slugForUpdate,
  previousData,
  token,
}: {
  slugForUpdate: string;
  previousData: any;
  token: string;
}) {
  const getObjectOfFetchedData: BlogDataTypes = previousData.data;
  const oldData = getObjectOfFetchedData;
  const { errorMessage, successMessage } = useMessage();
  const router = useRouter();
  //states
  const [updatTitle, setUpdatTitle] = useState(oldData.blogTitle || "");
  const [updateSlug, setUpdateSlug] = useState(oldData.blogSlug || "");
  const [isPublic, setIsPublic] = useState(false);
  const [updateBlogAuthor, setupdateBlogAuthor] = useState(
    oldData.blogAuthor || ""
  );
  const [updateBlogThumbnail, setUpdateBlogThumbnail] = useState(
    oldData.blogThumbnail
  );
  const [updateBlogThumbnailAuthor, setUpdateBlogThumbnailAuthor] = useState(
    oldData.blogThumbnailAuthor
  );
  const [updateBlogDesc, setUpdateBlogDesc] = useState(() => {
    return oldData.blogDescription || localStorage.getItem("savedHtml") || "";
  });
  //handleOnchageFunction

  const randomString = randomStringGen(20);
  const handleUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const responseFromUpdateBlog = await axios.patch(
        `/blogs/updateBlog/${slugForUpdate}`,
        {
          blogAuthor: updateBlogAuthor,
          blogTitle: updatTitle,
          blogSlug: `${updateSlug}-${randomString}`,
          blogDescription: updateBlogDesc,
          blogThumbnail: updateBlogThumbnail,
          blogThumbnailAuthor: updateBlogThumbnailAuthor,
          isPublic: isPublic,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (responseFromUpdateBlog.status === 201) {
        successMessage("Blog Updated Successfully");
        return router.push("/admin/blogs/privateBlogs");
      }
      return;
    } catch (error: any) {
      const err = error as AxiosError;
      console.log(err.status, err.message);
      errorMessage(error.response.data.message || error.message);
      setTimeout(() => {
        return router.push("/home");
      }, 3000);
    }
  };
  const handleChangeTitleAndSlug = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const mynewtitle = event.target.value;
    setUpdatTitle(mynewtitle);
    setUpdateSlug(UseSlugGenerator(mynewtitle));
  };
  const updateInputFields = [
    {
      label: "Update Title",
      type: "text",
      value: updatTitle || "",
      className:
        "border border-t-0 border-l-0 border-r-0 outline-none w-full py-2 px-4 border-b-2 border-foreground bg-transparent",
      onChange: handleChangeTitleAndSlug,
      readOnly: false,
    },

    {
      label: "Update Slug",
      type: "text",
      value: updateSlug || "",
      className:
        "border border-t-0 border-l-0 border-r-0 outline-none w-full py-2 px-4 border-b-2 border-foreground bg-transparent",
      onChange: handleChangeTitleAndSlug,
      readOnly: true,
    },
    {
      label: "Update BlogImage",
      type: "url",
      value: updateBlogThumbnail || "",
      className:
        "border border-t-0 border-l-0 border-r-0 outline-none w-full py-2 px-4 border-b-2 border-foreground bg-transparent",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUpdateBlogThumbnail(e.target.value),
      readOnly: false,
    },
    {
      label: "Update BlogThumbnailAuthor",
      type: "text",
      value: updateBlogThumbnailAuthor || "",
      className:
        "border border-t-0 border-l-0 border-r-0 outline-none w-full py-2 px-4 border-b-2 border-foreground bg-transparent",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUpdateBlogThumbnailAuthor(e.target.value),
      readOnly: false,
    },
    {
      label: "Update BlogAuthor",
      type: "text",
      value: updateBlogAuthor || "",
      className:
        "border border-t-0 border-l-0 border-r-0 outline-none w-full py-2 px-4 border-b-2 border-foreground bg-transparent",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setupdateBlogAuthor(e.target.value),
      readOnly: false,
    },
    {
      label: "IsPublic",
      type: "checkbox",
      checked: isPublic || "",
      className: "font-bold text-2xl mx-4",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setIsPublic(e.target.checked),
      readOnly: false,
    },
  ];

  return (
    <>
      <section className="px-5 py-2">
        <form onSubmit={handleUpdateBlog} className="w-full">
          {updateInputFields.map((field) => (
            <Fragment key={field.label}>
              <div className="my-2">
                <label htmlFor={field.label}>{field.label}</label>
                <input
                  type={field.type}
                  value={field.value}
                  className={field.className}
                  onChange={field.onChange}
                  readOnly={field.readOnly}
                />
              </div>
            </Fragment>
          ))}
          <div className="relative h-fit overflow-hidden my-4">
            <FroalaEditor
              model={updateBlogDesc}
              onModelChange={(e: string) => setUpdateBlogDesc(e)}
              config={{
                placeholderText: "Start from the here ",
                saveInterval: 2000,
                charCounterCount: true,
                enter: Froalaeditor.ENTER_BR,
                htmlAllowedTags: AlloweTags,
                htmlUntouched: true,
                events: {
                  "save.before": function (html: string) {
                    localStorage.setItem("savedHtml", html);
                  },
                },
              }}
            />
            <div className="bg-white absolute bottom-4 h-[20px] w-full max-w-4xl" />
          </div>
          <div className="flex justify-end w-full px-5">
            <Button className="">Update Blog</Button>
          </div>
        </form>
        <PageWrapper className="my-5 p-4 md:max-w-[920px]">
          <h1 className="text-center font-bold text-2xl md:text-4xl my-4 text-balance">
            {updatTitle}
          </h1>
          <div className="w-fit mx-auto my-4">
            <Image
              src={updateBlogThumbnail}
              alt={updateBlogAuthor + "'Image"}
              width={920}
              height={920}
            />
          </div>
          <div className="text-left w-full text-lg">
            {parser(updateBlogDesc)}
          </div>
        </PageWrapper>
      </section>
    </>
  );
}

export default UpdateBlogBySlug;
