import { LocaleDetails } from "@/types/languages";
import { Timestamp } from "firebase/firestore";
import { Locale } from "next/dist/compiled/@vercel/og/satori";

const getCurrentDateTime = (): Timestamp => {
  return Timestamp.now();
  // const formatDate = (timestamp: Timestamp): string => {
  //   const dateObject = timestamp.toDate();
  //   const dateString = dateObject.toLocaleDateString(lang.languageCode, {
  //     weekday: 'long',
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //   });
  //   const timeString = dateObject.toLocaleTimeString(lang.languageCode, {
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     hour12: true,
  //   });

  //   return `${uiContent[lang.languageCode].publishedOn} ${dateString} ${uiContent[lang.languageCode].at} ${timeString}`;
};
export default getCurrentDateTime;
