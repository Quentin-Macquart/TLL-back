import exec from 'child_process';
import { logger, errorLogger } from '@app/shared/utils/logger';

const { argv } = process;

/** Function which run a command shell
 *
 * @param {string} command the command
 * @param {string} semanticValue the indicator of bumping (minor, major, patch, or the version number)
 */
const runNpmCommand = (command, semanticValue) => {
  if (semanticValue) {
    try {
      exec(`${command} ${semanticValue}`, (error, stdout) => {
        if (error) {
          logger('Error while executing this command :', error);
          return;
        }
        logger(
          `Package has been bumped with one ${argv[2]} version, the current version is now : ${stdout}. Don't forget to push the updates`,
        );
      });
    } catch (e) {
      errorLogger(e);
    }
  } else {
    logger('Bumping version has not been etablished due to missing parameter in the script');
  }
};

runNpmCommand('npm version', argv[2]);
