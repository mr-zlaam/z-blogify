"use client";
import { Color } from "@tiptap/extension-color";

import { Button } from "@/components/ui/button";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback } from "react";
import {
  FaBold,
  FaCode,
  FaImage,
  FaItalic,
  FaListOl,
  FaListUl,
  FaParagraph,
  FaStrikethrough,
} from "react-icons/fa";
import { LuHeading1 } from "react-icons/lu";
import { GrBlockQuote } from "react-icons/gr";

import { cn } from "@/lib/utils";
import TextStyle from "@tiptap/extension-text-style";
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
        class: "bg-black/80 text-white max-w-[1020px] mx-auto rounded-md pt-10",
      },
    },
    heading: { levels: [1], HTMLAttributes: { class: "text-2xl font-bold" } },
    listItem: { HTMLAttributes: { class: "list-inside" } },
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
      HTMLAttributes: { class: "list-disc " },
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
      HTMLAttributes: { class: "list-decimal " },
    },
  }),
  TextStyle,
  Color,
  Image.configure({
    HTMLAttributes: {
      class: " h-auto mx-3 object-fit w-[500px]",
    },
  }),
];
const Iconsize = 25;
const content = ``;
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
    {
      name: "orderList",
      Iconsize,
      handleFormatting: () => editor.chain().focus().toggleOrderedList().run(),
      buttonSize: "icon",
      variant: "ghost",
      className: editor.isActive("orderList") ? "bg-gray-500" : "",
      disabled: !editor.can().chain().focus().toggleOrderedList().run(),
      Icon: FaListOl,
    },
    {
      name: "blockQuote",
      Iconsize,
      handleFormatting: () => editor.chain().focus().toggleBlockquote().run(),
      buttonSize: "icon",
      variant: "ghost",
      className: editor.isActive("blockquote") ? "bg-gray-500" : "",
      disabled: !editor.can().chain().focus().toggleBlockquote().run(),
      Icon: GrBlockQuote,
    },

    {
      name: "white",
      Iconsize,
      handleFormatting: () => editor.chain().focus().setColor("#ffffff").run(),
      buttonSize: "icon",
      variant: "ghost",
      className: editor.isActive("textStyle", { color: "#ffffff" })
        ? "bg-gray-500"
        : "",
      disabled: false,
      Icon: null,
      IconText: "white",
      test_id: "setWhite",
    },
    {
      name: "Black",
      Iconsize,
      handleFormatting: () => editor.chain().focus().setColor("#000000").run(),
      buttonSize: "icon",
      variant: "ghost",
      className: editor.isActive("textStyle", { color: "#000000" })
        ? "bg-gray-500"
        : "",
      disabled: false,
      Icon: null,
      IconText: "Black",
      test_id: "setBlack",
    },
    {
      name: "Green",
      Iconsize,
      handleFormatting: () => editor.chain().focus().setColor("#00ff00").run(),
      buttonSize: "icon",
      variant: "ghost",
      className: editor.isActive("textStyle", { color: "#00ff00" })
        ? "bg-gray-500"
        : "",
      disabled: false,
      Icon: null,
      IconText: "Green",
      test_id: "setGreen",
    },
    {
      name: "Yellow",
      Iconsize,
      handleFormatting: () => editor.chain().focus().setColor("#ffff00").run(),
      buttonSize: "icon",
      variant: "ghost",
      className: editor.isActive("textStyle", { color: "#ffff00" })
        ? "bg-gray-500"
        : "",
      disabled: false,
      Icon: null,
      IconText: "Yellow",
      test_id: "setYellow",
    },
    {
      name: "Red",
      Iconsize,
      handleFormatting: () => editor.chain().focus().setColor("#ff0000").run(),
      buttonSize: "icon",
      variant: "ghost",
      className: editor.isActive("textStyle", { color: "#ff0000" })
        ? "bg-gray-500"
        : "",
      disabled: false,
      Icon: null,
      IconText: "Red",
      test_id: "setRed",
    },
    {
      name: "Blue",
      Iconsize,
      handleFormatting: () => editor.chain().focus().setColor("#0000ff").run(),
      buttonSize: "icon",
      variant: "ghost",
      className: editor.isActive("textStyle", { color: "#0000ff" })
        ? "bg-gray-500"
        : "",
      disabled: false,
      Icon: null,
      IconText: "Blue",
      test_id: "setBlue",
    },
  ];
  return (
    <section className="">
      <div className="flex items-center gap-5 py-5 bg-[#28282b] px-4">
        {formatter.map((option) => {
          return (
            <Button
              data-testid={option?.test_id || ""}
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
              {!option.Icon ? (
                <span className="text-white">{option.IconText}</span>
              ) : (
                <option.Icon size={option.Iconsize} color="#ffffff" />
              )}
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
