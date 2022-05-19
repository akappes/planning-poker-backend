import 'reflect-metadata';
import './config/module-alias';

import { env } from '@main/config/env';
import { logger } from '@main/config/logger';
import { server } from '@main/config/server';

server.listen(env.port, () => logger.info(`🔥 Server Listen in: ${env.port}`));
