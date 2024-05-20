"use client";

import PageWrapper from "@/app/components/PageWrapper/PageWrapper";
import { Button } from "@/components/ui/button";
import CodeBlock from "@tiptap/extension-code-block";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  FaBold,
  FaCode,
  FaCodepen,
  FaItalic,
  FaStrikethrough,
} from "react-icons/fa";
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
  StarterKit,
  CodeBlock.configure({
    HTMLAttributes: {
      class: "bg-black/70 text-white ",
    },
  }),
];
const Iconsize = 25;
const content = `Hello world`;

const Tiptap = () => {
  const editor = useEditor({
    extensions,
    content,
  });
  if (!editor) return null;

  const formatter = [
    {
      name: "bold",
      Iconsize,
      handleFormatting: () => editor.chain().focus().toggleBold().run(),
      buttonSize: "icon",
      variant: "ghost",
      className: editor.isActive("bold") ? "bg-gray-300" : "",
      disabled: !editor.can().chain().focus().toggleBold().run(),
      Icon: FaBold,
    },
    {
      name: "italic",
      Iconsize,
      handleFormatting: () => editor.chain().focus().toggleItalic().run(),
      buttonSize: "icon",
      variant: "ghost",
      className: editor.isActive("italic") ? "bg-gray-300" : "",
      disabled: !editor.can().chain().focus().toggleItalic().run(),
      Icon: FaItalic,
    },
    {
      name: "strikeThrough",
      Iconsize,
      handleFormatting: () => editor.chain().focus().toggleStrike().run(),
      buttonSize: "icon",
      variant: "ghost",
      className: editor.isActive("strike") ? "bg-gray-300" : "",
      disabled: !editor.can().chain().focus().toggleStrike().run(),
      Icon: FaStrikethrough,
    },
    {
      name: "toggleCode",
      Iconsize,
      handleFormatting: () => editor.chain().focus().toggleCode().run(),
      buttonSize: "icon",
      variant: "ghost",
      className: editor.isActive("code") ? "bg-gray-300" : "",
      disabled: !editor.can().chain().focus().toggleCode().run(),
      Icon: FaCode,
    },
    {
      name: "codeBlock",
      Iconsize,
      handleFormatting: () => editor.chain().focus().toggleCodeBlock().run(),
      buttonSize: "icon",
      variant: "ghost",
      className: editor.isActive("codeBlock") ? "bg-gray-300" : "",
      disabled: !editor.can().chain().focus().toggleCodeBlock().run(),
      Icon: FaCodepen,
    },
  ];
  return (
    <PageWrapper>
      <div className="flex items-center gap-5 py-5">
        {formatter.map((option) => {
          return (
            <Button
              disabled={option.disabled}
              key={option.name}
              onClick={option.handleFormatting}
              variant={option.variant as VariantType}
              className={option.className}
              size={option.buttonSize as ButtonSize}
            >
              <option.Icon size={option.Iconsize} />
            </Button>
          );
        })}
      </div>
      <div className="border border-foreground rounded-md h-[90dvh] overflow-auto">
        <EditorContent editor={editor} />
      </div>
    </PageWrapper>
  );
};

export default Tiptap;
