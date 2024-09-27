// const functions = require('firebase-functions');
// const firestore = require('@google-cloud/firestore');
const { onSchedule } = require('firebase-functions/v2/scheduler');

import { dbAdmin } from './lib/firebase-admin';
import { handleNewPost } from './services/handleNewPost';

exports.dailyCronjobs = onSchedule('every day 11:00', async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set a minuit pour eviter de dealer avec heures, minutes, secondes et millisecondes

  const cronjobsRef = dbAdmin.collection('cronjobs').doc('nextArticles');
  const cronjobs = await cronjobsRef.get();
  if (!cronjobs.exists) {
    const data = cronjobs.data();

    if (data) {
      for (const clientId in data) {
        const clientData = data[clientId];
        if (clientData && clientData.date) {
          const date = clientData.date;
          date.setHours(0, 0, 0, 0);
          if (date === today) {
            await handleNewPost(clientId);
          } else {
            console.log(`Client ${clientId} does not have today's date.`);
          }
        } else {
          console.log(`Client ${clientId} does not have a date field.`);
        }
      }
    }
    return;
  }
});
