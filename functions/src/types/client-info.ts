import { Timestamp } from 'firebase-admin/firestore';
import { StylePreferences } from '../private/image-prompt';

type Allowed = {
  [key: string]: boolean;
};

export type ClientInfo = {
  allowed?: Allowed;
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
