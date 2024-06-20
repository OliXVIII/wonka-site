"use server";

import { searchUserByEmail } from "@/server/admin-function/search-user-by-email";
import { dbAdmin } from "@/lib/firebase-admin";

export const getUserRole = async (domain: string, email:string): Promise<string> => {
    try {
        console.log('getUserRole: ', domain);
        // Fetch the user data
        const userDoc = await searchUserByEmail(domain, email);

        if (userDoc) {
                // Set the user as admin
                const userDocRef = dbAdmin.doc(`domain/${domain}/users/${userDoc.id}`);
                const data = await userDocRef.get();
                if (data.exists) {
                        console.log('User :', data.data()?.role ?? 'user');
                        return data.data()?.role ?? 'user';
                }
        } else {
                console.log('No matching documents found');
        }
    } catch (error) {
        console.error('Error setting user as admin:', error);
    }

    return "user";
};