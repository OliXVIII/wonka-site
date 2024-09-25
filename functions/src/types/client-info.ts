import { Timestamp } from 'firebase-admin/firestore';
import { StylePreferences } from '../private/image-prompt';

export type ClientInfo = {
  clientId?: string;
  companyName: string;
  CTA?: string;
  defaultAuthor?: string;
  domain: string;
  frequency?: string;
  ideas: string[];
  mission: string;
  nextIdeas?: string[];
  startDate: Timestamp;
  stylePreferences: StylePreferences;
  targetAudience: string;
  UID?: string[];
};
