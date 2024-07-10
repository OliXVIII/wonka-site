export type Post = {
  id: string;
  title?: string;
  description?: string;
  content?: string;
  imageURL?: string;
  createdAt?: string;
  updatedAt?: string;
  published?: boolean;
  siteId?: string;
  locale: string;
  user?: string;
};

export default Post;
