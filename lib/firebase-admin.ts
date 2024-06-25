//NEVER IMPORT IN A CLIENT SIDE FILE
const isServer = typeof window === "undefined";

if (!isServer) {
  throw new Error("Firebase Admin must not be initialized on the client-side.");
}

import { initializeApp, App, cert, getApps } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
// console.log(
//   JSON.stringify({
//     type: "service_account",
//     project_id: "wonkasite-d43b5",
//     private_key_id: "847539ca1bf153b3447a17094478860c98dfc1fd",
//     private_key:
//       "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCdUHgH7H78L3wx\nU4n6IVP/9VcYJFH7ex21sFXKGyC1zevY+iQE7s++pbdSn3bDZyq8o2aV/P82OJU5\n8jK/LNDYeGub9vEkULHwxHkuA7mXlvaZevBd0Bu0sx+CvM9HexGqBD9y5KB+4z5o\nlb6j1eEBjU7MRlAZaEHekYC6Stw9sw2pXKjfeSdoEPhK5Ow/3SVEi9/tb8epuN6X\nYmF47uWUJZtq4golAtBS2w6FD/vSGhwDaaeIUH7i3lveJidQWZ28vGFP/rZJiaYA\n9nYAuItq8SyYW+Uu2hemuEtP+R0TY44SFbWIsIG8eg8FdyppGKUqR6IeLwG9fb8N\nejkBEk13AgMBAAECggEACzPEkF/ivQeOnZ6YHTPhXOvgwKsuxqyCNZgcdntkYr3f\n/7/0RQD9JyjQJfXitFB05nZGTa5J6C0IUgDcDz6xkoX6DQ2n0fuzEso9jNgeuluO\n15K9v23HLfYcFihmzu1wbmhwsjhIm4XdbFTO0gY0HchXu6EoKV8CDcd+YLBdquuo\nGSrAVmGwIwFNQuUgkoGHL/3grvgJsYtbhO6QNZHgRO9wJ0o5Aksewk35EVJfYMIb\n4OMX5kdfq26LwKTvpX1FF4f4ORrqh/0qe9CzusIq9VSqs2tP2sS0+klTTGiobYgC\nlhBOJQAvhPI4F5tp/uT4va2DgNjzP3GDigKXYm0MJQKBgQDOLQ01POqgyMrXZWcC\n2GgrQG7WXRZEieNCEyw19008/3qQDmfLBzkl5DdJZatwdOpasI0NvFE2XPbefEkd\n9f/53lgD6wT6/Np0JprjnxUtjNryXI7JxT+JS7GzyQTstcM8i15s5evfTJHSP/gs\nVZpGZVrGcRzzIA67IEytyAjfjQKBgQDDVJ8qSUv8S1JKr3AsHCBJs4cQFO5/xg+l\nCinWi/LfDZpyIQoiMpkkug/g2Eto5g0K6YE278HGcdVuq7Aq1kNyXRqpfiV69aoA\n10Q4JZPNp0CQlteBYkb2KQSMZ/jjVFvvXjPEInZF1Zh50QiZp+ymLGCVXlQWntrM\nLuMjePAOEwKBgH6nGD0DDdL1Zf3Jke0iiWNAcpYGmv5BgjR92KPSJkV5X44M+1+y\nMT4AoqHY7eboO2q4l/2/GFh/5TspODVKgBO7rW/CuM2B9KRzbqSzfev8YieOCj0S\niYRK1n/t1bOfuK6BouDcoPgMbmus1kRN1ba23nuW0sTbhZEYN2Jtxl2lAoGBAICg\nuBOrotsoaq996jtR5j1CeN2xOwFvVxwSnkyHak9ScPNZKIguk8Sotg4VwUr5u3sF\nG68moY9hpPA1JVSANngYMZeN13aqUeIt3+GtdTCHRDAy9QVhx2MQzcr8KNziz4vI\nmAQ/wWzpZHhLnAM7ns4rCQszy+H9iA3PjonseQB7AoGAVVIQbV2cFortzXi0ts+b\na3FwMbINhrtcV67d6LAHPJ34GQUsOgKw1z8C7gqFxZL9gkHNZMI1F1CPALsQeTgm\nw3djm+A+qEetqsIqdvZ3jTbQB2lWxjhd6fhuZM5deD2J6PI2corcsYhQd5yY1+Y1\ng/RxjwfN5OOstczG0aKGvtw=\n-----END PRIVATE KEY-----\n",
//     client_email:
//       "firebase-adminsdk-t5hiv@wonkasite-d43b5.iam.gserviceaccount.com",
//     client_id: "112502638792401178463",
//     auth_uri: "https://accounts.google.com/o/oauth2/auth",
//     token_uri: "https://oauth2.googleapis.com/token",
//     auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//     client_x509_cert_url:
//       "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-t5hiv%40wonkasite-d43b5.iam.gserviceaccount.com",
//     universe_domain: "googleapis.com",
//   }),
// );
const serviceAccount = JSON.parse(
  process.env.FIREBASE_ADMIN_CREDENTIALS as string,
);

serviceAccount.private_key = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

// Import only what you need from the Firebase SDK for Firebase

//If App doesn't exist, initialize one
const app: App = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert(serviceAccount),
      databaseURL: "https://wonkasite-d43b5.firebaseio.com",
    });

export const dbAdmin: Firestore = getFirestore(app);
