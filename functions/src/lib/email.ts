import { Locale } from '../types/languages';

export const emailContent = ({
  href,
  lang,
  linkedinPost,
  facebookPost,
  twitterPost, // Add twitterPost parameter
  subject,
}: {
  href: string;
  lang: Locale;
  linkedinPost?: string | null;
  facebookPost?: string | null;
  twitterPost?: string | null; // Define the type for twitterPost
  subject: string;
}) => {
  const emailTemplates = {
    en: `<div style="font-family: Arial, sans-serif; color: #333;">
  <h1 style="font-size: 18px;">Your article "<strong>${subject}</strong>" has just been published.</h1>

  <p style="font-size: 16px;">You can view it on our website at the following address: <a href="${href}" style="color: #1a73e8;">${href}</a></p>

  <p style="font-size: 16px;">To introduce it on your social networks, here are some post suggestions:</p>
  ${linkedinPost ? `<p style="font-size: 16px;">LinkedIn post 📫:</p><br>${linkedinPost}` : ''}
  ${linkedinPost && (facebookPost || twitterPost) ? '<hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;">' : ''}
  ${facebookPost ? `<p style="font-size: 16px;">Facebook post 📩:</p><br>${facebookPost}` : ''}
  ${facebookPost && twitterPost ? '<hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;">' : ''}
  ${twitterPost ? `<p style="font-size: 16px;">Twitter post 🐦:</p><br>${twitterPost}` : ''}
  
</div>`,
    fr: `<div style="font-family: Arial, sans-serif; color: #333;">
  <p style="font-size: 16px;">Votre article "<strong>${subject}</strong>" vient d'être publié.</p>

  <p style="font-size: 16px;">Vous pouvez le consulter sur notre site web à l'adresse suivante : <a href="${href}" style="color: #1a73e8;">${href}</a></p>

  <p style="font-size: 16px;">Pour l'introduire sur vos réseaux sociaux, voici des suggestions de posts :</p>
  ${linkedinPost ? `<p style="font-size: 16px;">Post LinkedIn 📫:</p><br>${linkedinPost}` : ''}
  ${linkedinPost && (facebookPost || twitterPost) ? '<hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;">' : ''}
  ${facebookPost ? `<p style="font-size: 16px;">Post Facebook 📩:</p><br>${facebookPost}` : ''}
  ${facebookPost && twitterPost ? '<hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;">' : ''}
  ${twitterPost ? `<p style="font-size: 16px;">Post Twitter 🐦:</p><br>${twitterPost}` : ''}
</div>`,
  };

  const title = {
    en: `New article just published: "${subject}"`,
    fr: `Nouvel article publié: "${subject}"`,
  };

  return { content: emailTemplates[lang as 'en' | 'fr'], title: title[lang as 'en' | 'fr'] };
};
