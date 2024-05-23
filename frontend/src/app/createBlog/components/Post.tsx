"use client";
import { useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/plugins/code_view.min.css";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/code_view.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/save.min.js";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/code_beautifier.min.js";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import { useSlugGenerator as UseSlugGenerator } from "@/hooks/useSlugGenerator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
function CreatePosts() {
  const [desc, setDesc] = useState(() => {
    return localStorage.getItem("savedHtml") || "";
  });
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const handleOnchange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    setSlug(UseSlugGenerator(newTitle));
  };
  const handleCreateBlog = async () => {};
  return (
    <>
      <section className="px-5 py-2">
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
          <div className="my-4">
            <label htmlFor="slug">Slug</label>
            <Input
              type="text"
              name="slug"
              value={slug}
              className="max-w-5xl mx-4 border border-black "
              onChange={handleOnchange}
              readOnly
            />
          </div>
          <div>
            <div className="relative ">
              <label htmlFor="">Blog Description</label>
              <FroalaEditor
                model={desc}
                onModelChange={(e: string) => setDesc(e)}
                config={{
                  placeholderText: "Start from the here ",
                  saveInterval: 1000,
                  charCounterCount: true,

                  events: {
                    "save.before": function (html: string) {
                      localStorage.setItem("savedHtml", html);
                    },
                  },
                }}
              />
              <div className=" bg-white/10 absolute bottom-0 h-[100px] w-full"></div>
              <div className="w-full flex justify-end px-5 py-2"></div>
            </div>
            <Button>Post</Button>
          </div>
        </form>
        <div className="my-5 p-4">
          <FroalaEditorView model={desc} />
        </div>
      </section>
    </>
  );
}

export default CreatePosts;
