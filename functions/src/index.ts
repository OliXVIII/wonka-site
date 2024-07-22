import moduleAlias from 'module-alias';
moduleAlias.addAliases({
  '@': `${__dirname}`,
});

import * as functions from 'firebase-functions';
import app from './app';

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: '1GB' as const,
};

exports.app = functions.runWith(runtimeOpts).https.onRequest(app);
