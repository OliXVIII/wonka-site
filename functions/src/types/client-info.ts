import { stylePreferences } from '../private/image-prompt';

export type ClientInfo = {
  clientId?: string;
  companyName: string;
  defaultAuthor?: string;
  domain: string;
  ideas: string[];
  stylePreferences: stylePreferences;
  mission: string;
  targetAudience: string;
  CTA: string;
};
