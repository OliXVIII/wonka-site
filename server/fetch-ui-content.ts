"use server";

import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

import { GetServerSidePropsContext } from 'next';
import { createContext, useContext, ReactNode } from 'react';
import { demoUIContent } from '@/types/ui-content';





export async function fetchUiContent( domain:string, lang:Locale ): Promise<{ props: { uiContent: any } }> {
  // const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
  //   ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
  // : null;
    if (domain == 'demo.wonkasite.,com' || 'demo.localhost:3000') {
        return {
            props: {
                uiContent: demoUIContent["en-CA"],
            }
        }
    }
    const docRef = doc(db, `domain/${domain}/lang/${lang}`);
    const docSnap = await getDoc(docRef);
    
    const data = docSnap.data();

    if (data?.uiContent) {
        console.log('Document data:', docSnap.data());
        return {
            props: {
                uiContent: data.uiContent,
            }
        }
    }
    return {
        props: {
            uiContent: {},
        }
    }
    }







