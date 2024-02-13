import winston, { format, addColors, transports } from 'winston';

export const logInFile = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'info.log', level: 'info' })],
});

/** Create a regular format to add in the custom looggers
 * @param {boolean} wantColor, turn it to true allows to colorize all corresponding messages but careful to unit test
 */
const regularFormat = (wantColor: boolean) =>
  winston.format.combine(
    winston.format.colorize(wantColor ? { all: false } : {}),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf(
      info =>
        `${info.timestamp} [${info.level}]: ${info.message}${
          info.splat !== undefined ? `${info.splat}` : ' '
        }`,
    ),
  );

addColors({
  info: 'green',
  debug: 'green',
  warn: 'yellow',
  error: 'bold red',
});

export const logger = winston.createLogger({
  level: 'info',
  format: regularFormat(false),
  transports: [
    new transports.Console({
      format: winston.format.combine(winston.format.colorize()),
    }),
  ],
});

export const errorLogger = winston.createLogger({
  level: 'error',
  format: regularFormat(true),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize()),
    }),
  ],
});
