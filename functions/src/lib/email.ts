import { Locale } from '../types/languages';

export const emailContent = ({
  href,
  lang,
  linkedinPosts,
  facebookPosts,
  twitterPosts,
  subject,
  thumbnail,
}: {
  href: string;
  lang: Locale;
  linkedinPosts?: string[] | null;
  facebookPosts?: string[] | null;
  twitterPosts?: string[] | null;
  subject: string;
  thumbnail?: string;
}) => {
  // Define the content for each supported language
  const localizedContent = {
    en: {
      shareIntro: 'To share it on your social networks, here are some post suggestions:',
      linkedin: 'LinkedIn posts 📫',
      facebook: 'Facebook posts 📩',
      twitter: 'Twitter posts 🐦',
      viewOnWebsite: 'You can view it on our website at the following address:',
      newArticle: `New article just published: "${subject}"`,
      headerLinkText: 'I N C E P T I O N A I',
      mainTitle: subject,
    },
    fr: {
      shareIntro: 'Pour le partager sur vos réseaux sociaux, voici quelques suggestions de publications :',
      linkedin: 'Publications LinkedIn 📫',
      facebook: 'Publications Facebook 📩',
      twitter: 'Publications Twitter 🐦',
      viewOnWebsite: "Vous pouvez le consulter sur notre site Web à l'adresse suivante :",
      newArticle: `Nouvel article publié : "${subject}"`,
      headerLinkText: 'I N C E P T I O N A I',
      mainTitle: subject,
    },
  };

  // Extract the content based on the selected language
  const content = localizedContent[lang as 'en' | 'fr'] ?? localizedContent.en;

  // Generate social media posts HTML
  let socialMediaPostsHtml = '';
  if (
    (linkedinPosts && linkedinPosts.length > 0) ||
    (facebookPosts && facebookPosts.length > 0) ||
    (twitterPosts && twitterPosts.length > 0)
  ) {
    socialMediaPostsHtml += `
      <tr style="margin: 20px 0;">
        <td align="left">
          <p style="padding-bottom: 20px;">${content.shareIntro}</p>
    `;

    if (linkedinPosts && linkedinPosts.length > 0) {
      socialMediaPostsHtml += `
        <p style="margin: 5px 0; text-align: center; font-size: 20px;"><strong>${content.linkedin}</strong></p>
        ${linkedinPosts
          .map(
            (post, index) => `
          <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ffffff; background-color: rgb(15, 25, 59); border-radius: 6px;">
            <p><strong>Version ${index + 1}:</strong></p>
            ${post}
          </div>
        `,
          )
          .join('')}
      `;
    }

    if (facebookPosts && facebookPosts.length > 0) {
      socialMediaPostsHtml += `
        <p style="margin: 5px 0; text-align: center; font-size: 20px;"><strong>${content.facebook}</strong></p>
        ${facebookPosts
          .map(
            (post, index) => `
          <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ffffff; background-color: rgb(15, 25, 59); border-radius: 6px;">
            <p><strong>Version ${index + 1}:</strong></p>
            ${post}
          </div>
        `,
          )
          .join('')}
      `;
    }

    if (twitterPosts && twitterPosts.length > 0) {
      socialMediaPostsHtml += `
        <p style="margin: 5px 0; text-align: center; font-size: 20px;"><strong>${content.twitter}</strong></p>
        ${twitterPosts
          .map(
            (post, index) => `
          <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ffffff; background-color: rgb(15, 25, 59); border-radius: 6px;">
            <p><strong>Version ${index + 1}:</strong></p>
            ${post}
          </div>
        `,
          )
          .join('')}
      `;
    }

    socialMediaPostsHtml += `
        </td>
      </tr>
    `;
  }

  // Define the email template with placeholders and styles
  const emailTemplate = `<!DOCTYPE html>
<html dir="${lang === 'fr' ? 'ltr' : 'ltr'}" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>${content.mainTitle}</title>
    <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]-->
    <!--[if gte mso 9]>
    <style>
    sup { font-size: 100% !important; }
    </style>
    <![endif]-->
    <!--[if gte mso 9]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        /* IMPORTANT: THESE STYLES MUST BE IN THE FINAL EMAIL */
        a[x-apple-data-detectors],
        #MessageViewBody a {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }
        /* END OF IMPORTANT STYLES */

        body {
            font-size: 16px;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            color: #FFFFFF;
            font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
        table {
            border-collapse: collapse;
            border-spacing: 0;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            display: block;
            border: 0;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }
        p, h1, h2, h3, h4, h5, h6 {
            margin: 0;
            font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            mso-line-height-rule: exactly;
            color: #FFFFFF;
        }
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            max-width: 100vw;
            height: 100%;
            z-index: 0;
            background: linear-gradient(
                to right,
                rgba(80, 147, 235, 0.13),
                rgba(135, 136, 233, 0.08),
                rgba(7, 198, 203, 0.1)
            );
            pointer-events: none; /* Allows clicks to pass through */
        }

        /* Responsive Overlay Width */
        @media (max-width: 640px) {
            .overlay {
                width: 100vw;
            }
        }

        .inception-wrapper {
            width: 100%;
            height: 100%;
            background-color: rgb(9, 19, 49);
        }
        .inception-header, .inception-content, .inception-footer {
            table-layout: fixed !important;
            width: 100%;
        }
        a {
            text-decoration: underline;
            color: inherit;
        }
        .inception-content-body, .inception-header-body, .inception-footer-body {
            font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #FFFFFF;
            line-height: 150%;
            border-radius: 6px; /* Apply rounded border */
            padding-top: 20px; /* Vertical padding */
            padding-bottom: 20px; /* Vertical padding */
            padding-left: 20px; /* Horizontal padding remains */
            padding-right: 20px; /* Horizontal padding remains */
        }
        /* Responsive Styles */
        @media only screen and (max-width: 600px) {
            p, a {
                line-height: 150% !important;
            }
            h1, h2, h3, h4, h5, h6 {
                line-height: 120% !important;
            }
            h1 { font-size: 26px !important; }
            h2 { font-size: 24px !important; }
            h3 { font-size: 20px !important; }
            .inception-wrapper table {
                width: 100% !important;
            }
            .inception-content table, .inception-header table, .inception-footer table, .inception-content, .inception-footer, .inception-header, .inception-social-media-posts {
  
                width: 100% !important;
                max-width: 600px !important;
            }
            .adapt-img {
                width: 100% !important;
                height: auto !important;
            }
            .inception-hidden { display: none !important; }
        }
    </style>
</head>
<body>
    <div class="inception-wrapper">
        <!-- Email Header -->
        <table class="inception-header" align="center" style="position: relative;">
            <tbody>
                <tr>
                    <td align="center">
                        <div class="overlay"></div>
                    </td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                    <td align="center">
                        <table class="inception-header-body" align="center" cellpadding="0" cellspacing="0" width="600" style="border-radius: 6px;">
                            <tbody>
                                <tr>
                                    <td align="left">
                                        <!-- Header Content -->
                                        <div style="display: flex; align-items: center; justify-content: space-between;">
                                            <a href="${href}" style="display: inline-block;">
                                                <img src="https://firebasestorage.googleapis.com/v0/b/inceptionai-61b20.appspot.com/o/images%2Flogo-no-background.png?alt=media&token=31899a4f-bc2c-4fdf-b55b-8a0b259e11b1" alt="logo" width="100" style="display: block; padding: 10px;"> <!-- Added padding to image -->
                                            </a>
                                            <a href="${href}" style="display: inline-block; font-family: monospace; letter-spacing: 0.1em; font-size: 24px; text-align: end; text-decoration: none;">
                                                ${content.headerLinkText}
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Email Content -->
        <table class="inception-content" align="center" style"position: relative;">
            <tbody>
                <tr>
                    <td align="center">
                        <table class="inception-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="border-radius: 6px;">
                            <tbody>
                                <!-- Thumbnail Image -->
                                ${
                                  thumbnail
                                    ? `<tr>
                                        <td align="center" style="padding: 10px;">
                                            <img src="${thumbnail}" alt="${subject}" width="600" style="display: block; aspect-ratio: 16 / 9; width: 100%; object-fit: cover; opacity: 0.9; filter: brightness(0.9); border-radius: 6px;">
                                        </td>
                                    </tr>`
                                    : ''
                                }
                                <!-- Main Title -->
                                <tr>
                                    <td align="left">
                                        <h1 style="text-align: center; padding-top: 20px; line-height: 2.5rem;">${content.mainTitle}</h1>
                                    </td>
                                </tr>
                                <!-- Main Content -->
                                <tr>
                                    <td align="left">
                                        <p style="padding-top: 10px;">${content.viewOnWebsite}</p>
                                        <p style="padding-top: 10px; padding-bottom: 30px;"><a href="${href}" style="color: #1a73e8;">${href}</a></p>
                                    </td>
                                </tr>

                                ${socialMediaPostsHtml}
        
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Email Footer -->
        <!-- ... existing footer code ... -->
    </div>
</body>
</html>`;

  // Set the email title based on the language
  // (Optional: If you want to include the title in the email content, it's already handled above)
  const emailTitle = {
    en: `New article just published: "${subject}"`,
    fr: `Nouvel article publié : "${subject}"`,
  };

  return { content: emailTemplate, title: emailTitle[lang as 'en' | 'fr'] };
};
