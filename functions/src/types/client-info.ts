import { stylePreferences } from '../private/image-prompt';

export type ClientInfo = {
  clientId?: string;
  companyName: string;
  default_author: string;
  domain: string;
  ideas: string[];
  stylePreferences: stylePreferences;
  mission: string;
  targetAudience: string;
  CTA: string;
};
