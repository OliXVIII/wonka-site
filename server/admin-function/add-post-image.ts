"use client";

import { storage } from "@/lib/firebase";
import { c } from "@vercel/blob/dist/put-96a1f07e";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

type addPostImageProps = {
  id?: string;
  domain?: string;
  imageURL?: string;
  image: any;
};
export async function addPostImageStorage({
  id,
  domain,
  imageURL,
  image,
}: addPostImageProps): Promise<string> {
  try {
    const storageRef = ref(storage, `/${domain}/post/${id}`);
    await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(storageRef);
    console.log("add-post-image.ts Image uploaded successfully:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error(
      "add-post-image.ts Erreur lors du téléchargement de l'image:",
      error,
    );
    return "";
  }
}
//   id,
//   domain,
//   imageURL,
//   image,
// }: addPostImageProps): Promise<string> => {
//   try {
//     const storageRef = ref(storage, `/${domain}/post/${id}`);
//     await uploadBytes(storageRef, image);
//     const downloadURL = await getDownloadURL(storageRef);
//     console.log("add-post-image.ts Image uploaded successfully:", downloadURL);
//     return downloadURL;
//   } catch (error) {
//     console.error(
//       "add-post-image.ts Erreur lors du téléchargement de l'image:",
//       error,
//     );
//     return "";
//   }
// };
