import { NextApiRequest, NextApiResponse } from 'next';
import { loginAction } from '@/server/login-action';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  console.log('login-api');

  const session = await getServerSession(req, res, authOptions);

  console.log('Session:', session);

  // if (req.method === 'POST') {
  //   try {
  //     const { userId, domain } = req.body;

  //     // Ensure the request contains the required parameters
  //   if (!userId || !domain) {
  //       return res.status(400).json({ error: 'Missing userId or domain' });
  //   }

  //   // Filter out headers with undefined values
  //   const filteredHeaders = Object.fromEntries(
  //       Object.entries(req.headers).filter(([_, value]) => value !== undefined)
  //   );

  //   // Create a mock NextRequest object
  //   const mockNextRequest = new NextRequest(req.url!, {
  //       method: req.method,
  //       headers: filteredHeaders as Record<string, string>,
  //       body: JSON.stringify(req.body),
  //   });

  //   // Call the loginAction function
  //   const response = await loginAction(mockNextRequest, userId, domain);

  //   // Return the response from loginAction
  //   res.status(response.status).send(response.body);
  //   } catch (error) {
  //     console.error('Error in login API route:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // } else {
  //   res.setHeader('Allow', ['POST']);
  //   res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  // }
}