"use client";

import PageWrapper from "@/app/components/PageWrapper/PageWrapper";
import { Button } from "@/components/ui/button";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FaBold, FaItalic } from "react-icons/fa";
const extensions = [StarterKit];
const Iconsize = 25;
const content = `Hello world`;

const Tiptap = () => {
  const editor = useEditor({
    extensions,
    content,
  });
  if (!editor) return null;
  return (
    <PageWrapper>
      <Button
        onClick={() => {
          editor.chain().focus().toggleBold().run();
        }}
        size={"icon"}
        variant={"ghost"}
        className={editor.isActive("bold") ? "bg-gray-300" : ""}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <FaBold size={Iconsize} />
      </Button>
      <Button
        onClick={() => {
          editor.chain().focus().toggleItalic().run();
        }}
        size={"icon"}
        variant={"ghost"}
        className={editor.isActive("bold") ? "bg-gray-300" : ""}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        <FaItalic size={Iconsize} />
      </Button>
      <div className="border border-foreground rounded-md h-[90dvh] overflow-auto">
        <EditorContent editor={editor} />
      </div>
    </PageWrapper>
  );
};

export default Tiptap;
