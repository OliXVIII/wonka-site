"use client";

import { Post } from "@/types/post";
import { ExternalLink } from "lucide-react";
import { Editor as NovelEditor } from "novel";
import { useEffect, useState, useTransition } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";

import { updatePost, updatePostMetadata } from "@/lib/actions";
import { cn } from "@/lib/utils";

import LoadingDots from "../icons/loading-dots";
import { addPost } from "@/server/admin-function/add-post";
import { Locale, defaultLocale, localesDetails } from "@/types/languages";
import dateNow from "@/lib/get-date";
import getCurrentDateTime from "@/lib/get-date";
import { defaultExtensions } from "@/lib/extension";
import { addPostImageStorage } from "@/server/admin-function/add-post-image";
import { deletePost } from "@/server/admin-function/delete-post";

type PostWithSite = Post & { site: { subdomain: string | null } | null };

export default function Editor({
  locale,
  post,
  id,
}: {
  locale: Locale;
  post: PostWithSite;
  id: string;
}) {
  const [isPendingSaving, startTransitionSaving] = useTransition();
  const [isPendingPublishing, startTransitionPublishing] = useTransition();
  const [data, setData] = useState<PostWithSite>(post);
  const [hydrated, setHydrated] = useState(false);

  const url =
    process.env.NODE_ENV === "development"
      ? "local-108.com"
      : process.env.NEXTAUTH_URL ?? "local-108.com";

  // listen to CMD + S and override the default behavior
  // useEffect(() => {
  //   const onKeyDown = (e: KeyboardEvent) => {
  //     if (e.metaKey && e.key === "s") {
  //       e.preventDefault();
  //       startTransitionSaving(async () => {
  //         await updatePost(data);
  //       });
  //     }
  //   };
  //   document.addEventListener("keydown", onKeyDown);
  //   return () => {
  //     document.removeEventListener("keydown", onKeyDown);
  //   };
  // }, [data, startTransitionSaving]);

  return (
    <div className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-light p-12 px-8 dark:border-stone-700 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg">
      <div className="absolute right-5 top-5 mb-5 flex items-center space-x-3">
        {/* <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-sm text-stone-400 hover:text-stone-500"
        >
          <ExternalLink className="h-4 w-4" />
        </a> */}

        {/* <div className="rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400 dark:bg-stone-800 dark:text-stone-500">
          {isPendingSaving ? "Saving..." : "Saved"}
        </div> */}
        <button
          onClick={async () => {
            // const formData = new FormData();
            console.log(data);
            const imageURL = "";
            // await addPostImageStorage({
            //   id: data.id ?? "error",
            //   domain: url,
            //   imageURL:
            //     "https://lh3.googleusercontent.com/a/ACg8ocJtsM3oGcMRaJzABCOPe_5BcbaVux4rTp2NhD4ln2XdsNxaQWyD=s96-c",
            //   image:
            //     "https://lh3.googleusercontent.com/a/ACg8ocJtsM3oGcMRaJzABCOPe_5BcbaVux4rTp2NhD4ln2XdsNxaQWyD=s96-c",
            // });

            deletePost({
              id: data.id ?? "error",
              domain: url,
            });
          }}
          // console.log(data.published, typeof data.published);
          // formData.append("published", String(!data.published));
          // startTransitionPublishing(async () => {
          //   await updatePostMetadata(formData, post.id, "published").then(
          //     () => {
          //       toast.success(
          //         `Successfully ${
          //           data.published ? "unpublished" : "published"
          //         } your post.`,
          //       );
          //       setData((prev) => ({ ...prev, published: !prev.published }));
          //     },
          //   );
          //   // });
          // // }}
          className={cn(
            "flex h-7 w-24 items-center justify-center space-x-2 rounded-lg border text-sm transition-all focus:outline-none",
            isPendingPublishing
              ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:bg-stone-800 dark:text-stone-300"
              : "border border-black bg-black text-light hover:bg-light hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-light dark:active:bg-stone-800",
          )}
          // disabled={isPendingPublishing}
        >
          {isPendingPublishing ? <LoadingDots /> : <p>Delete post</p>}
        </button>
        <button
          onClick={async () => {
            // const formData = new FormData();
            console.log(data);
            const imageURL = "";
            // await addPostImageStorage({
            //   id: data.id ?? "error",
            //   domain: url,
            //   imageURL:
            //     "https://lh3.googleusercontent.com/a/ACg8ocJtsM3oGcMRaJzABCOPe_5BcbaVux4rTp2NhD4ln2XdsNxaQWyD=s96-c",
            //   image:
            //     "https://lh3.googleusercontent.com/a/ACg8ocJtsM3oGcMRaJzABCOPe_5BcbaVux4rTp2NhD4ln2XdsNxaQWyD=s96-c",
            // });

            addPost({
              id: data.id ?? "error",
              domain: url,
              title: data.title ?? "",
              description: data.description ?? "",
              content: data.content ?? "",
              imageURL: imageURL,
              createdAt: getCurrentDateTime(),
              updatedAt: "",
              // published: data.published ?? "" || "",
              // siteId: data.siteId ?? "",
              locale: locale,
            });
          }}
          // console.log(data.published, typeof data.published);
          // formData.append("published", String(!data.published));
          // startTransitionPublishing(async () => {
          //   await updatePostMetadata(formData, post.id, "published").then(
          //     () => {
          //       toast.success(
          //         `Successfully ${
          //           data.published ? "unpublished" : "published"
          //         } your post.`,
          //       );
          //       setData((prev) => ({ ...prev, published: !prev.published }));
          //     },
          //   );
          //   // });
          // // }}
          className={cn(
            "flex h-7 w-24 items-center justify-center space-x-2 rounded-lg border text-sm transition-all focus:outline-none",
            isPendingPublishing
              ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:bg-stone-800 dark:text-stone-300"
              : "border border-black bg-black text-light hover:bg-light hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-light dark:active:bg-stone-800",
          )}
          // disabled={isPendingPublishing}
        >
          {isPendingPublishing ? (
            <LoadingDots />
          ) : (
            <p>{false ? "Unpublish" : "Publish"}</p>
          )}
        </button>
      </div>
      <div className="mb-5 flex flex-col space-y-3 border-b border-stone-200 pb-5 dark:border-stone-700">
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
        // extensions={defaultExtensions}
        className="relative block text-dark dark:text-light"
        defaultValue={{
          type: "doc",
          content: [],
        }}
        onUpdate={(editor) => {
          console.log(editor?.storage.markdown.getMarkdown());
          setData((prev) => ({
            ...prev,
            content: editor?.storage.markdown.getMarkdown(),
          }));
        }}
        onDebouncedUpdate={() => {
          if (
            data.title === post.title &&
            data.description === post.description &&
            data.content === post.content
          ) {
            return;
          }
          // startTransitionSaving(async () => {
          //   await updatePost(data);
          // });
        }}
      />
    </div>
  );
}
