import { ImageStyle } from '../private/image-prompt';

export type ClientInfo = {
  company_name: string;
  default_author: string;
  domain: string;
  ideas: string[];
  image_style: ImageStyle;
  mission: string;
  target_audience?: string;
  CTA: string;
};
