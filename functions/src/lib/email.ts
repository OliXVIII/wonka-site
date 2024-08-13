export const emailContent = ({
  href,
  lang,
  linkedinPost,
  facebookPost,
  subject,
}: {
  href: string;
  lang: 'en' | 'fr';
  linkedinPost?: string | null;
  facebookPost?: string | null;
  subject: string;
}) => {
  const emailTemplates = {
    en: `Your article "${subject}" has just been published.

You can view it on our website at the following address: ${href}

To introduce it on your social networks, here are some post suggestions:
${linkedinPost ? `LinkedIn post 📫:\n${linkedinPost}` : ''}
${facebookPost && linkedinPost ? '\n-----------------\n' : ''}
${facebookPost ? `Facebook post 📩:\n${facebookPost}` : ''}`,
    fr: `Votre article "${subject}" vient d'être publié.

Vous pouvez le consulter sur notre site web à l'adresse suivante : ${href}

Pour l'introduire sur vos réseaux sociaux, voici des suggestions de posts :
${linkedinPost ? `Post LinkedIn :\n${linkedinPost}` : ''}
${facebookPost && linkedinPost ? '\n-----------------\n' : ''}
${facebookPost ? `Post Facebook :\n${facebookPost}` : ''}`,
  };

  const title = {
    en: `New article just published: "${subject}"`,
    fr: `Nouvel article publié: "${subject}"`,
  };

  return { content: emailTemplates[lang], title: title[lang] };
};
