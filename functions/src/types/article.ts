import { Timestamp } from 'firebase-admin/firestore';

export type Article = {
  content: string;
  created: Timestamp;
  id: string;
  thumbnail: string;
  title: string;
  author?: string;
  metadata?: {
    title: string;
    description: string;
    keywords: string;
  };
};
