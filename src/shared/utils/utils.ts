import { config } from '@app/shared/config';

/**
 * Handle the normalization of the port
 * @returns {number}
 */
export const getPort = (): number => {
  const port: number = process.env.PORT || config.server.port;
  if (!Number.isNaN(Number(port)) && port >= 0) {
    return port;
  }
  return 3000;
};

/**
 * Get current UTC date and time
 * @returns {string}
 */
export const getCurrentUTCDateTime = () => {
  const currentUTC = new Date().toISOString();
  return currentUTC;
};
