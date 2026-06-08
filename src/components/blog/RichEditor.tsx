import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "png";
  const path = `blog/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("email-assets").upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("email-assets").getPublicUrl(path);
  return data.publicUrl;
}

export function RichEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" } }),
      Image,
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none min-h-[400px] px-4 py-3 focus:outline-none font-serif text-foreground/90",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const insertImage = useCallback(
    async (file: File) => {
      if (!editor) return;
      try {
        toast.loading("Uploading image…", { id: "img-upload" });
        const url = await uploadImage(file);
        editor.chain().focus().setImage({ src: url }).run();
        toast.success("Image inserted", { id: "img-upload" });
      } catch (e: any) {
        toast.error(e.message ?? "Upload failed", { id: "img-upload" });
      }
    },
    [editor],
  );

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL (leave blank to remove)", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  const Btn = ({
    onClick,
    active,
    children,
    title,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2.5 py-1 text-xs rounded-sm border transition-colors ${
        active
          ? "bg-crimson/30 border-crimson text-rose-glow"
          : "border-crimson/30 text-foreground/70 hover:text-rose-glow hover:border-crimson/60"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-crimson/30 rounded-sm bg-background">
      <div className="flex flex-wrap items-center gap-1.5 p-2 border-b border-crimson/20">
        <Btn title="Bold (Ctrl+B)" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>
          <strong>B</strong>
        </Btn>
        <Btn title="Italic (Ctrl+I)" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>
          <em>I</em>
        </Btn>
        <Btn title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")}>
          <s>S</s>
        </Btn>
        <span className="w-px h-5 bg-crimson/20 mx-1" />
        <Btn title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}>
          H2
        </Btn>
        <Btn title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}>
          H3
        </Btn>
        <Btn title="Paragraph" onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive("paragraph")}>
          P
        </Btn>
        <span className="w-px h-5 bg-crimson/20 mx-1" />
        <Btn title="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>
          • List
        </Btn>
        <Btn title="Numbered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}>
          1. List
        </Btn>
        <Btn title="Quote" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}>
          ❝
        </Btn>
        <span className="w-px h-5 bg-crimson/20 mx-1" />
        <Btn title="Add / edit link" onClick={setLink} active={editor.isActive("link")}>
          Link
        </Btn>
        <Btn title="Insert image" onClick={() => fileRef.current?.click()}>
          Image
        </Btn>
        <span className="w-px h-5 bg-crimson/20 mx-1" />
        <Btn title="Undo" onClick={() => editor.chain().focus().undo().run()}>
          ↶
        </Btn>
        <Btn title="Redo" onClick={() => editor.chain().focus().redo().run()}>
          ↷
        </Btn>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) insertImage(f);
            e.target.value = "";
          }}
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

export { uploadImage as uploadBlogImage };
