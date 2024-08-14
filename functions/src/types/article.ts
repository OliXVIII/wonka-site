import { Timestamp } from 'firebase-admin/firestore';

export type Article = {
  content: string;
  created: Timestamp;
  id: string;
  thumbnail: string;
  title: string;
  published: boolean; // Default value is false
  author?: string;
  metadata?: {
    title: string;
    description: string;
    keywords: string;
  };
};
