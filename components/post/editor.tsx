"use client";

import { Post } from "@/types/post";
import { Editor as NovelEditor } from "novel";
import { useEffect, useState, useTransition } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { cn } from "@/lib/utils";
import LoadingDots from "../icons/loading-dots";

import { Locale } from "@/types/languages";
import { deleteBlog } from "@/server/admin-function/blog/delete-blog";
import { publishPost } from "@/server/admin-function/post/publish-post";
import { addPost } from "@/server/admin-function/post/add-post";
import { updatePost } from "@/lib/actions";

export default function Editor({
  locale,
  post,
  id,
}: {
  locale: Locale;
  post: Post;
  id: string;
}) {
  const [caracCount, setCaracCount] = useState(0);
  const [data, setData] = useState<Post>(post);
  const url =
    process.env.NODE_ENV === "development"
      ? "local-108.com"
      : process.env.NEXTAUTH_URL ?? "local-108.com";
  // Effect to handle save on Cmd+S or Ctrl+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        updatePost({
          id: id ?? "error",
          domain: url,
          title: data.title ?? "",
          description: data.description ?? "",
          content: data.content ?? "",
          imageURL: "",
          locale: locale,
          user: "",
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [data]);

  return (
    <div className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-light p-12 px-8 dark:border-stone-700 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg">
      <div className="absolute right-5 top-5 mb-5 flex items-center space-x-3">
        <button
          onClick={async () => {
            const imageURL = "";
            addPost({
              id: id ?? "error",
              domain: url,
              title: data.title ?? "",
              description: data.description ?? "",
              content: data.content ?? "",
              imageURL: imageURL,
              locale: locale,
              user: "Nicolas Castonguay",
            });
          }}
          className={cn(
            "flex h-7 w-24 items-center justify-center space-x-2 rounded-lg  border border-black bg-black text-sm text-light transition-all hover:bg-light hover:text-black focus:outline-none active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-light dark:active:bg-stone-800",
          )}
        >
          <p>Save Draft</p>
        </button>
        <button
          onClick={async () => {
            deleteBlog({
              id: id ?? "error",
              domain: url,
            });
          }}
          className={cn(
            "flex h-7 w-24 items-center justify-center space-x-2 rounded-lg border border-black bg-black text-sm text-light transition-all hover:bg-light hover:text-black focus:outline-none active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-light dark:active:bg-stone-800",
          )}
        >
          <p>Delete blog</p>
        </button>
        <button
          onClick={async () => {
            publishPost({
              id: id ?? "error",
              domain: url,
              locale: locale,
              user: "Nicolas Castonguay",
            });
          }}
          className={cn(
            "flex h-7 w-24 items-center justify-center space-x-2 rounded-lg border border-black bg-black text-sm text-light transition-all hover:bg-light hover:text-black focus:outline-none active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-light dark:active:bg-stone-800",
          )}
        >
          <p>Publish</p>
        </button>
      </div>
      <div className="mb-5 flex flex-col space-y-3 border-b border-stone-200 pb-5">
        <input
          type="text"
          placeholder="Title"
          defaultValue={post?.title || ""}
          autoFocus
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="dark:placeholder-text-600 font-cal border-none px-0 text-3xl placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
        />
        <TextareaAutosize
          placeholder="Description"
          defaultValue={post?.description || ""}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="dark:placeholder-text-600 w-full resize-none border-none px-0 placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
        />
      </div>
      <NovelEditor
        className="relative block text-dark"
        disableLocalStorage={true}
        defaultValue={post?.content ?? ""}
        onUpdate={(editor) => {
          setCaracCount(caracCount + 1);
          setData((prev) => ({
            ...prev,
            content: editor?.storage.markdown.getMarkdown(),
          }));
          if (caracCount >= 100) {
            setCaracCount(0);
            updatePost({
              id: id ?? "error",
              title: data.title ?? "",
              description: data.description ?? "",
              content: editor?.storage.markdown.getMarkdown() ?? "",
              domain: url,
              imageURL: "",
              locale: locale,
            });
          }
        }}
        // onDebouncedUpdate={() => {
        //   if (
        //     data.title === post.title &&
        //     data.description === post.description &&
        //     data.content === post.content
        //   ) {
        //     return;
        //   }
        // }}
      />
    </div>
  );
}
