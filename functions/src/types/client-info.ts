import { ImageStyle } from '../private/image-prompt';

export type ClientInfo = {
  clientId?: string;
  companyName: string;
  default_author: string;
  domain: string;
  ideas: string[];
  imageStyle: ImageStyle;
  mission: string;
  targetAudience: string;
  CTA: string;
};
