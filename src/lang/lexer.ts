import {PepperMintException} from '../exceptions/exception';
import {LexerPosition} from './position';
import {mentionCommands, PepperMintCommand} from './tokens/command';
import {PepperMintComment} from './tokens/comments';
import {PepperMintNumber} from './tokens/number';
import {PepperMintString} from './tokens/string';
import {brackets, symbols} from './tokens/symbols';

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
      } else if (character == '"') {
        const string = new PepperMintString(
          this.data,
          this.position
        ).createString();
        if (string.quotation == 2) {
          this.tokens.push({
            token: string.data,
            type: 'STRING',
            position: {
              start: string.start,
              end: string.pos,
            },
          });
        } else {
          const exception = new PepperMintException({
            message: 'String not closed',
            file: this.filename,
            line: this.lineNumber,
          }).throwException(true);
        }
      } else if (Number.isInteger(parseInt(character))) {
        const number = new PepperMintNumber(
          this.data,
          this.position
        ).createNumberToken();

        if (number.dots > 1) {
          const exception = new PepperMintException({
            message: `Invalid Syntax: ${number.number}`,
            suggestion: 'Numbers can only contain two decimal points',
            line: this.lineNumber,
            file: this.filename,
          }).throwException(true);
        } else {
          this.tokens.push({
            token: number.number,
            type: PepperMintNumber.createTokenType(number.number),
            position: {
              start: number.start,
              end: number.position,
            },
          });
        }
      } else if (symbols.includes(character)) {
        this.tokens.push({
          token: character,
          type: 'OPERATOR',
          position: {start: this.position.position},
        });
      } else if (Array.from(brackets.keys()).includes(character)) {
        this.tokens.push({
          token: character,
          type: String(brackets.get(character)).toUpperCase(),
          position: {start: this.position.position},
        });
      } else if (character == '#') {
        const comment = new PepperMintComment(
          this.data,
          this.position
        ).createComment();
        this.position.position = comment;
      } else if (character == '@') {
        const command = new PepperMintCommand(
          this.data,
          this.position
        ).findCommand();
        command.command = command.command.slice(1);
        // if(!Array.from(mentionCommands.keys()).includes(command.command)) {
        //   const exception = new PepperMintException({
        //     message : `@${command.command} is not a ready function`,
        //     line : this.lineNumber,
        //     file : this.filename
        //   }).throwException(true)
        // }

        this.tokens.push({
          token: command.command,
          type: 'builtin',
          position: {start: command.start, end: command.position},
        });

        this.position.position = command.position;
      }

      this.position.increment(1);
      character = this.position.curentCharacter(this.data);
    }

    return this.tokens;
  };
}
