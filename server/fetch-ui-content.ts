"use server";

import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

import { GetServerSidePropsContext } from 'next';
import { createContext, useContext, ReactNode } from 'react';





export async function fetchUiContent( context: GetServerSidePropsContext ): Promise<{ props: { uiContent: any } }> {
    const { domain, lang } = context.query;
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







