import { LoggerContract } from '@domain/contracts';
import winston from 'winston';

const config = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    alert: 3,
    error: 4,
    json: 5,
  },
  colors: {
    debug: 'grey',
    info: 'green',
    warn: 'yellow',
    alert: 'cyan',
    error: 'red',
    json: 'blue',
  },
};

const loggerPrint = winston.createLogger({
  level: process.env.DEBUG_LEVEL || 'info',
  levels: config.levels,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.printf((info: winston.Logform.TransformableInfo) => {
          return `[${info.level}] :${info.message}`;
        }),
      ),
    }),
  ],
}) as winston.Logger &
  Record<keyof typeof config['levels'], winston.LeveledLogMethod>;

winston.addColors(config.colors);

const loggerWinston = (...args: unknown[]): void => {
  const parseArgs = args.map((arg) => {
    try {
      return JSON.stringify(arg);
    } catch (err) {
      return 'Could not convert content from to the log';
    }
  });
  loggerPrint.info(parseArgs);
};

export class Logger implements LoggerContract {
  info(message: string): void {
    loggerWinston(message);
  }
  error(message: string, stack: unknown): void {
    loggerWinston(message, stack);
  }
}

export const logger = new Logger();
