"use server";

import { searchUserByEmail } from "@/server/admin-function/search-user-by-email";
import { dbAdmin } from "@/lib/firebase-admin";

export const setAdmin = async (
  domain: string,
  email: string,
): Promise<void> => {
  try {
    // Fetch the user data
    const userDoc = await searchUserByEmail(domain, email);

    if (userDoc) {
      // Set the user as admin
      const userDocRef = dbAdmin.doc(`domain/${domain}/users/${userDoc.id}`);
      await userDocRef.update({
        role: "admin",
      });
      console.log("User role set as admin");
    } else {
      console.log("No matching documents found");
    }
  } catch (error) {
    console.error("Error setting user as admin:", error);
  }
};
