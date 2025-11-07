import { PinoLogger } from '@mastra/loggers';
import { Mastra } from '@mastra/core/mastra';

import { geminiChatAgent } from './agents';

export const mastra = new Mastra({
  agents: { geminiChatAgent },
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
