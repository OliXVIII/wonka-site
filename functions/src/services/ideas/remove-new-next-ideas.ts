import { dbAdmin } from '../../lib/firebase-admin';
import { get100Ideas } from './get-100-ideas';

// This function is called by the cronjob to remove first element of nextIdeas and add a new one
export const handleNewNextIdeas = async (clientId: string, mission: string, targetAudience: string) => {
  const nextIdeasRef = await dbAdmin.doc(`${clientId}/info`).get();
  const data = await nextIdeasRef.data();

  if (!data) {
    console.log('Client info does not exist');
    return;
  }
  let nextIdeas = data.nextIdeas;
  let ideas = data.ideas;

  if (!nextIdeas || !ideas) {
    console.log('No next ideas or ideas found');
    return;
  }

  const randomIndex = Math.floor(Math.random() * nextIdeas.length);
  const newNextIdea = ideas[randomIndex];

  ideas = ideas.splice(randomIndex, 1); // Remove the idea from the list
  if (!newNextIdea) {
    console.log('No new next idea found');
    return;
  }
  // If there are no ideas left, get 100 new ideas
  if (ideas.length === 0) {
    console.log('No ideas left, getting 100 new ideas');
    const newIdeas = await get100Ideas(mission, targetAudience);
    await dbAdmin.doc(`${clientId}/info`).update({ ideas: newIdeas });
  }

  nextIdeas = nextIdeas.shift(); // Remove the first element (the one that was just used)
  nextIdeas = nextIdeas.push({ title: newNextIdea, date: new Date(), new: true }); //TODO: check with Oli for Date attribute
  await dbAdmin.doc(`${clientId}/info`).update({ nextIdeas });

  const cronjobsRef = dbAdmin.collection('cronjobs').doc('nextIdeas');
  const cronjobs = await cronjobsRef.get();

  await cronjobsRef.update({ [clientId]: { date: new Date() } });
};
