import {PepperMintException} from '../../exceptions/exception';
import {LexerPosition} from '../position';

export class PepperMintString {
  private data: string;
  private pos: LexerPosition;

  private startPos: number;
  /**
   * @constructor
   *
   * @param data The data inside of the file
   * @param pos The position of the lexer in the data
   */

  constructor(data: string, pos: LexerPosition) {
    this.data = data;
    this.pos = pos;
    this.startPos = this.pos.position;
  }

  /**
   * @public
   *
   * @returns a javascript object of the string data
   * along with the position for the lexer to continue
   * tokenising
   */
  public createString = (): any => {
    let character: string | null = this.pos.curentCharacter(this.data);
    let string: string = '';
    let quotationCount = 0;

    while (character != null) {
      // check for a second quotation and if
      // the count of quotations is qual to two(2)
      // break the loop and return the formed string
      if (character == '"') {
        quotationCount += 1;
        if (quotationCount == 2) {
          break;
        }
      }

      string += character.toString();
      this.pos.increment(1);
      character = this.pos.curentCharacter(this.data);
    }

    return {
      data: string.toString().slice(1, string.length),
      pos: this.pos.position,
      start: this.startPos,
      quotation: quotationCount,
    };
  };
}
