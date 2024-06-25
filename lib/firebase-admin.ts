//NEVER IMPORT IN A CLIENT SIDE FILE
const isServer = typeof window === "undefined";

if (!isServer) {
  throw new Error("Firebase Admin must not be initialized on the client-side.");
}

import { initializeApp, App, cert, getApps } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

const serviceAccount = require("@/config/wonkasite-d43b5-firebase-adminsdk-t5hiv-847539ca1b");
// Import only what you need from the Firebase SDK for Firebase

//If App doesn't exist, initialize one
const app: App = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert(serviceAccount),
      databaseURL: "https://wonkasite-d43b5.firebaseio.com",
    });

export const dbAdmin: Firestore = getFirestore(app);

