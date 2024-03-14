import { BoardConfig } from '@app/components/party/DAL/models/party-config';
import { Board, Line, Square } from '@app/components/party/DAL/models/index';
import { Constants } from '@app/shared/utils/constants/constants';

export class BoardHandler {
  /**
   * Initializes a game board with the specified configurations.
   *
   * @param {BoardConfig} boardConfig - The board configuration settings.
   * @returns {Board} - The initialized game board.
   */
  initializedBoard(boardConfig: BoardConfig): Board {
    // Create an array of letters based on the specified number of lines in the configurations.
    const stringLinesArray: string[] = Constants.ALPHABET.slice(0, boardConfig.lines);

    // Map each letter to create the lines of the game board.
    return stringLinesArray.map((lineLetter: string) =>
      this.createLineIterations(lineLetter, boardConfig.columns),
    );
  }

  /**
   * Creates a line of squares for the game board based on the line letter and the specified number of columns.
   *
   * @param {string} lineLetter - The line letter.
   * @param {number} columnsNumb - The number of columns.
   * @returns {Line} - The created line of squares.
   */
  createLineIterations(lineLetter: string, columnsNumb: number): Line {
    // Initialize an empty line.
    const completeLine: Line = [];

    // Iterate through each column to create a square with the specified properties.
    for (let i = 0; i < columnsNumb; i++) {
      const square: Square = {
        name: `${lineLetter + (i + 1)}`,
        visible: false,
        occupied: false,
        onFight: false,
        selectable: true,
      };

      // Add the square to the line.
      completeLine.push(square);
    }
    return completeLine;
  }
}
