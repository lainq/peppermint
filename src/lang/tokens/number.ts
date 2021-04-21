import {LexerPosition} from '../position';

export class PepperMintNumber {
  private position: LexerPosition;
  private data: string;

  private start: number;

  /**
   * @constructor
   * @param token The Token interface with the position and the
   * data inside of the file
   */
  constructor(data: string, pos: LexerPosition) {
    this.position = pos;
    this.data = data;

    this.start = this.position.position;
  }

  /**
   * @public
   *
   * keeps in track of the end of the file and also ,
   * keep in  trackof numbers and decimal points
   * to create a number object(either an integer or a float)
   *
   * @returns An object with the line data and the new position
   */
  public createNumberToken = () => {
    let character = this.position.curentCharacter(this.data);
    let numberString = '';
    let dotCount = 0;

    while (
      character != null &&
      (Number.isInteger(parseInt(character)) || character == '.')
    ) {
      if (character == '.') {
        dotCount += 1;
      }

      if (character) {
        numberString += character.toString();
      }

      this.position.increment(1);
      character = this.position.curentCharacter(this.data);
    }
    return {
      number: numberString,
      position: this.position.position,
      start: this.start,
      dots: dotCount,
    };
  };

  /**
   * @public @static
   *
   * Returns float if the string contains a decimal
   * point, else, returns Integer
   *
   * @param {String} data The data to check if it is an integer
   * or a float
   *
   * @returns {String} Integer or float
   */
  public static createTokenType = (data: string): string => {
    return String(data.includes('.') ? 'float' : 'integer').toUpperCase();
  };
}
