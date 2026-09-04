import app from './app.js';
import { requiredEnv } from './utils/env.js';
import { logger } from './common/logger.js';

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
    logger.info({ port: PORT }, 'server started');
});
