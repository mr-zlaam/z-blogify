"use client";
import { API as axios } from "@/axios";
import { Button } from "@/components/ui/button";
import { useMessage } from "@/hooks/useMessage";
import { useSlugGenerator as UseSlugGenerator } from "@/hooks/useSlugGenerator";
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
import { FormEvent, useRef, useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import Froalaeditor from "froala-editor";
import { AlloweTags } from "../helper/toolbar";
import PageWrapper from "@/app/components/PageWrapper/PageWrapper";
import Image from "next/image";
import { randomStringGen } from "@/app/helper/randomStringGen/randomStringGen";
import { useValidateImageUrl as UseValidateImageUrl } from "@/hooks/useValidateUrl";
function CreatePosts() {
  const [desc, setDesc] = useState(() => {
    return localStorage.getItem("savedHtml") || "";
  });
  const { errorMessage, successMessage } = useMessage();
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [blogImage, setBlogImage] = useState();
  const [data, setData] = useState({
    blogAuthor: "",
    blogImageAuthor: "",
  });
  const handleOnchange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    console.log(data);
  };
  const handleChangeTitleAndSlug = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    setSlug(UseSlugGenerator(newTitle));
  };
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !title ||
      !slug ||
      !desc ||
      !data.blogAuthor ||
      !data.blogImageAuthor ||
      !blogImage
    ) {
      return errorMessage("Please Provide all fields");
    }
    const randomString = randomStringGen(20);
    try {
      const response = await axios.post("/blogs/createBlog", {
        blogTitle: title,
        blogSlug: `${slug}-${randomString}`,
        blogDescription: desc,
        blogThumbnail: blogImage,
        blogThumbnailAuthor: data.blogImageAuthor,
        blogAuthor: data.blogAuthor,
      });
      if (response.status === 201) {
        //TODO:remove local storage first before production
        return successMessage("Blog created successfully");
      }
    } catch (error: any) {
      console.log(error);
      return errorMessage(error.response.data.message || error.message);
    }
  };
  const imageUrlRef = useRef<any>(null);
  const setUrlToImageBlog = (e: FormEvent) => {
    e.preventDefault();
    const url = imageUrlRef.current.value;
    if (UseValidateImageUrl(url)) {
      setBlogImage(imageUrlRef.current.value);
    } else {
      return errorMessage("Please provide a valid image url");
    }
  };
  return (
    <>
      <section className="px-5 py-2">
        <form onSubmit={handleCreateBlog} className="w-full">
          <div className="my-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              className="border border-t-0 border-l-0 border-r-0 outline-none w-full py-2 px-4 border-b-2 border-foreground bg-transparent"
              onChange={handleChangeTitleAndSlug}
              placeholder="Enter Title Here."
            />
          </div>
          <div className="my-2">
            <label htmlFor="slug">Slug</label>
            <input
              type="text"
              name="slug"
              value={slug}
              className="border border-t-0 border-l-0 border-r-0 outline-none w-full py-2 px-4 border-b-2 border-foreground bg-transparent"
              onChange={handleChangeTitleAndSlug}
              readOnly
              placeholder="Slug will be written automaticaly You don't have to write it."
            />
          </div>
          <div className="my-2 relative">
            <label htmlFor="blogImage">BlogImage</label>
            <input
              id="blogImage"
              type="url"
              name="blogImage"
              ref={imageUrlRef}
              className="border border-t-0 border-l-0 border-r-0 outline-none w-full py-2 px-4 border-b-2 border-foreground bg-transparent"
              placeholder="Enter Blog Thumbnail/Image Url Here.::https://https://miro.medium.com/v2/resize:fit:720/format:webp/0*9ToWmeRH2_mgrDss"
            />
            <Button
              variant={"link"}
              className="absolute top-3 right-3"
              onClick={setUrlToImageBlog}
            >
              SetUrl
            </Button>
          </div>
          <div className="my-2">
            <label htmlFor="BlogImageAuthor">BlogImageAuthor</label>
            <input
              id="BlogImageAuthor"
              type="text"
              name="blogImageAuthor"
              value={data.blogImageAuthor}
              className="border border-t-0 border-l-0 border-r-0 outline-none w-full py-2 px-4 border-b-2 border-foreground bg-transparent"
              onChange={handleOnchange}
              placeholder="Enter Blog's Image Author Name Here."
            />
          </div>
          <div className="my-2">
            <label htmlFor="BlogAuthorName">BlogAuthorName</label>
            <input
              id="BlogAuthorName"
              type="text"
              name="blogAuthor"
              value={data.blogAuthor}
              className="border border-t-0 border-l-0 border-r-0 outline-none w-full py-2 px-4 border-b-2 border-foreground bg-transparent"
              onChange={handleOnchange}
              placeholder="Write name of owner here."
            />
          </div>

          <div />
          <label htmlFor="">Blog Description</label>
          <div className="relative h-fit overflow-hidden my-4">
            <FroalaEditor
              model={desc}
              onModelChange={(e: string) => setDesc(e)}
              config={{
                placeholderText: "Start writing from here...",
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
            <div className=" bg-white absolute bottom-4 h-[20px] w-full max-w-4xl" />
          </div>
          <div className="flex justify-end w-full px-5">
            <Button className="">Upload Blog</Button>
          </div>
        </form>
        <PageWrapper className="my-5 p-4 md:max-w-[920px]">
          <h1 className="text-center font-bold text-2xl md:text-4xl my-4 text-balance">
            {title}
          </h1>
          <div className="w-fit mx-auto my-4">
            {blogImage && (
              <Image
                src={blogImage}
                alt={data.blogImageAuthor}
                width={920}
                height={920}
              />
            )}
          </div>
          <div className="text-left w-full text-lg">{parser(desc)}</div>
        </PageWrapper>
      </section>
    </>
  );
}

export default CreatePosts;
