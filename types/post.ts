import { Timestamp } from "firebase/firestore";
import { Locale } from "./languages";

export type Post = {
  id: string;
  title: string;
  description: string;
  content: string;
  imageURL: string;
  createdAt: Date | string | undefined;
  updatedAt: Date | string | undefined;
  locale: Locale;
  user: string;
};

export default Post;
