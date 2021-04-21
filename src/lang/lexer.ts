import { PepperMintException } from '../exceptions/exception';
import {LexerPosition} from './position';
import { PepperMintString } from './tokens/string';

interface TokenPosition {
  // the start of the token value
  start: number;

  // the end of the token value
  end?: number;
}

export interface Tokens<TokenType> {
  // the value of the token
  token: TokenType;
  // the type of the token
  type: string;
  // the position of the token
  // -start, -end?
  position: TokenPosition;
}

export class PepperMintLexer {
  private tokens: Array<Tokens<any>> = new Array();
  private position: LexerPosition = new LexerPosition(0);

  private data: string;
  private filename: string;
  private lineNumber: number = 1;

  /**
   * @constructor
   * @param {string} source The source code
   * @param {string} filename The name of the file
   */
  constructor(source: string, filename: string) {
    this.data = source;
    this.filename = filename;
  }

  /**
   * @public
   *
   * Generate the tokens until the position
   * reaches the end of the file
   *
   * @returns {Array<Tokens<any>>} The array of tokens
   * */
  public generateTokens = (): Array<Tokens<any>> => {
    let character: string | null = this.position.curentCharacter(this.data);
    while (character != null) {
      if (character == '\n') {
        this.tokens.push({
          token: character,
          type: 'NEWLINE',
          position: {start: this.position.position},
        });
        this.lineNumber += 1;
      } else if (character == ' ') {
        this.tokens.push({
          token: character,
          type: 'SPACE',
          position: {start: this.position.position},
        });
      } else if(character == '"'){
        const string = new PepperMintString(this.data, this.position).createString()
        if(string.quotation == 2){
          this.tokens.push({
            token : string.data,
            type : 'STRING',
            position : {
              start : string.start,
              end :string.pos
            }
          })
        } else {
          const exception = new PepperMintException({
            message : "String not closed",
            file : this.filename,
            line : this.lineNumber
          }).throwException(true)
        }
      } 

      this.position.increment(1);
      character = this.position.curentCharacter(this.data);
    }

    return this.tokens;
  };
}
