"use client";

import { Button } from "@/components/ui/button";
import Image from "@tiptap/extension-image";
import { useCallback } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  FaBold,
  FaCode,
  FaImage,
  FaItalic,
  FaListUl,
  FaParagraph,
  FaStrikethrough,
} from "react-icons/fa";
import { LuHeading1, LuHeading2 } from "react-icons/lu";

import { cn } from "@/lib/utils";
//Types
type VariantType =
  | "ghost"
  | "link"
  | "outline"
  | "default"
  | "destructive"
  | "secondary"
  | null;
type ButtonSize = "default" | "icon" | "sm" | "lg" | null | undefined;
const extensions = [
  StarterKit.configure({
    codeBlock: {
      HTMLAttributes: {
        class: "bg-black/70 text-white ",
      },
    },
    heading: { levels: [1], HTMLAttributes: { class: "text-2xl font-bold" } },
    // listItem: { HTMLAttributes: { class: "list-inside" } },
    // bulletList: { HTMLAttributes: { class: "list-disc " } },
  }),
  Image.configure({
    HTMLAttributes: {
      class: " h-auto mx-3 object-fit w-[500px]",
    },
  }),
];
const Iconsize = 25;
const content = `Hello world`;
//Main component
const Tiptap = () => {
  const editor = useEditor({
    extensions,
    content,
  });
  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  const formatter = [
    {
      name: "bold",
      Iconsize,
      handleFormatting: () => editor.chain().focus().toggleBold().run(),
      buttonSize: "icon",
      variant: "ghost",
      className: editor.isActive("bold") ? "bg-gray-500" : "",
      disabled: !editor.can().chain().focus().toggleBold().run(),
      Icon: FaBold,
    },
    {
      name: "italic",
      Iconsize,
      handleFormatting: () => editor.chain().focus().toggleItalic().run(),
      buttonSize: "icon",
      variant: "ghost",
      className: editor.isActive("italic") ? "bg-gray-500" : "",
      disabled: !editor.can().chain().focus().toggleItalic().run(),
      Icon: FaItalic,
    },
    {
      name: "strikeThrough",
      Iconsize,
      handleFormatting: () => editor.chain().focus().toggleStrike().run(),
      buttonSize: "icon",
      variant: "ghost",
      className: editor.isActive("strike") ? "bg-gray-500" : "",
      disabled: !editor.can().chain().focus().toggleStrike().run(),
      Icon: FaStrikethrough,
    },

    {
      name: "codes",
      Iconsize,
      handleFormatting: () => editor.chain().focus().toggleCodeBlock().run(),
      buttonSize: "icon",
      variant: "ghost",
      className: editor.isActive("codeBlock") ? "bg-gray-500" : "",
      disabled: !editor.can().chain().focus().toggleCodeBlock().run(),
      Icon: FaCode,
    },
    {
      name: "image",
      Iconsize,
      handleFormatting: addImage,
      buttonSize: "icon",
      variant: "ghost",
      className: "",
      disabled: false,
      Icon: FaImage,
    },
    {
      name: "paragraph",
      Iconsize,
      handleFormatting: () => editor.chain().focus().setParagraph().run(),
      buttonSize: "icon",
      variant: "ghost",
      className: editor.isActive("paragraph") ? "bg-gray-500" : "",
      disabled: !editor.can().chain().focus().setParagraph().run(),
      Icon: FaParagraph,
    },
    {
      name: "heading-1",
      Iconsize,
      handleFormatting: () =>
        editor.chain().focus().toggleHeading({ level: 1 }).run(),
      buttonSize: "icon",
      variant: "ghost",
      className: editor.isActive("heading", { level: 1 }) ? "bg-gray-500" : "",
      disabled: !editor.can().chain().focus().toggleHeading({ level: 1 }).run(),
      Icon: LuHeading1,
    },
    {
      name: "bulletList",
      Iconsize,
      handleFormatting: () => editor.chain().focus().toggleBulletList().run(),
      buttonSize: "icon",
      variant: "ghost",
      className: editor.isActive("bulletList") ? "bg-gray-500" : "",
      disabled: !editor.can().chain().focus().toggleBulletList().run(),
      Icon: FaListUl,
    },
  ];
  return (
    <section className="">
      <div className="flex items-center gap-5 py-5 bg-[#28282b] px-4">
        {formatter.map((option) => {
          return (
            <Button
              disabled={option.disabled}
              key={option.name}
              onClick={option.handleFormatting}
              variant={option.variant as VariantType}
              className={cn(
                option.className,
                "hover:bg-yellow-700 hover:text-black"
              )}
              size={option.buttonSize as ButtonSize}
            >
              <option.Icon size={option.Iconsize} color="#ffffff" />
            </Button>
          );
        })}
      </div>
      <div className="border border-foreground rounded-md h-[90dvh] overflow-auto">
        <EditorContent editor={editor} />
      </div>
    </section>
  );
};

export default Tiptap;
