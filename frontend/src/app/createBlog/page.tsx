"use client";
import React, { useCallback, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import parse, { DOMNode, Element } from "html-react-parser";
import SlugGenerator from "@/hooks/useSlugGenerator";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is imported
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formats, toolbarOptions } from "./helper/toolbar";
import { API as axios } from "@/axios";
import { useMessage } from "@/hooks/useMessage";

// Import Parchment and configure it to replace <p> tags with <div> tags
const Block: any = Quill.import("blots/block");

class CustomBlock extends Block {
  static blotName = "block";
  static tagName = "DIV";
}

Quill.register(CustomBlock);
const Form: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const quillRef = useRef<ReactQuill>(null);
  const { errorMessage, successMessage } = useMessage();

  const handleOnchange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    setSlug(SlugGenerator(newTitle));
  };

  const imageHandler = useCallback(() => {
    const url = prompt("Enter the image URL");
    if (url && quillRef.current) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection(true);
      quill.insertEmbed(range.index, "image", url, "user");
    }
  }, []);

  const modules = {
    toolbar: {
      container: toolbarOptions,
      handlers: {
        image: imageHandler,
      },
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const applyTailwindClasses = (htmlString: string) => {
    return parse(htmlString, {
      replace: (domNode: DOMNode) => {
        if (domNode instanceof Element) {
          switch (domNode.name) {
            case "ul":
              domNode.attribs.class =
                (domNode.attribs.class || "") + " list-disc list-inside pl-5";
              break;
            case "ol":
              domNode.attribs.class =
                (domNode.attribs.class || "") +
                " list-decimal list-inside pl-5";
              break;
            case "pre":
              domNode.attribs.class =
                (domNode.attribs.class || "") +
                " bg-[#28282b] p-2 rounded text-white";
              break;
            case "a":
              domNode.attribs.class =
                (domNode.attribs.class || "") + " text-blue-500 font-medium";
              break;
            // Add other tags if needed
          }
        }
      },
    });
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc || !title || !slug) {
      return errorMessage("Please Provide all fields");
    }
    try {
      const response = await axios.post("/blogs/createBlog", {
        blogTitle: title,
        blogDescription: desc,
        blogSlug: slug,
      });
      console.log(response.data);
      successMessage("Blog created successfully!");
    } catch (error: any) {
      console.log(error);
      errorMessage("Error creating blog");
    }
  };

  return (
    <section className="px-5 py-2">
      <div className="h-[100dvh] overflow-auto">
        <form onSubmit={handleCreateBlog} className="w-full">
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              className="border border-t-0 border-l-0 border-r-0 outline-none w-full py-2 px-4 border-b-2 border-black"
              onChange={handleOnchange}
            />
          </div>
          <div>
            <label htmlFor="slug">Slug</label>
            <Input
              type="text"
              name="slug"
              value={slug}
              className="max-w-5xl mx-4 border border-black"
              onChange={handleOnchange}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={desc}
              className="mx-4 h-[75dvh] border border-black overflow-auto rounded-md "
              onChange={setDesc}
              modules={modules}
              formats={formats}
            />
          </div>
          <div className="w-full flex justify-end px-5 py-2">
            <Button>Post</Button>
          </div>
        </form>
      </div>

      <div className="card_2 border border-black my-5 overflow-auto px-2 h-[90vh] rounded-lg w-full">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-medium">Title:</h1>
          <h1 className="text-lg font-bold">{title}</h1>
        </div>
        <p className="text-md">Slug: {slug}</p>
        <p className="text-md">Description: {applyTailwindClasses(desc)}</p>
      </div>
    </section>
  );
};

export default Form;
