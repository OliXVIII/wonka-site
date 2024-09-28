const { onSchedule } = require('firebase-functions/v2/scheduler');

import { dbAdmin } from './lib/firebase-admin';
import { handleNewArticle } from './services/create-article/cronjob-new-article';
import { NextIdeas } from './types/client-info';

exports.dailyCronjobs = onSchedule('every day 8:00', async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTimestamp = today.getTime();

  const cronjobsRef = dbAdmin.collection('cronjobs').doc('nextIdeas');
  const cronjobsDoc = await cronjobsRef.get();
  if (!cronjobsDoc.exists) {
    console.log('No cronjobs found.');
    return;
  }

  const data = cronjobsDoc.data() as Record<string, NextIdeas>;

  if (data) {
    for (const clientId in data) {
      const clientData = data[clientId];
      if (clientData && clientData.date) {
        const date = new Date(clientData.date.toMillis());
        date.setHours(0, 0, 0, 0);
        const dateTimestamp = date.getTime();

        if (dateTimestamp === todayTimestamp) {
          await handleNewArticle(clientId, clientData.date);
        } else {
          console.log(`Client ${clientId} does not have today's date.`);
        }
      } else {
        console.log(`Client ${clientId} does not have a date field.`);
      }
    }
  }
});
