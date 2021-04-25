import {PepperMintException} from '../../exceptions/exception';
import {Tokens} from '../lexer';
import { PepperMintNull } from '../none';
import {LexerPosition} from '../position';
import {ArithmeticOperations} from './arithmetic';
import {ParserResult} from './result';

export class PepperMintParser {
  private tokens: Array<Tokens<any>>;
  private position: LexerPosition = new LexerPosition(0);

  private parserTokens: Array<Tokens<any>> = [];

  private currentToken: Tokens<any>;
  private lineNumber: number = 1;
  private cli: Array<string>;

  /**
   * @constructor
   * @param tokens The array of tokens tokenised
   * by peppermint lexer
   */
  constructor(tokens: Array<Tokens<any>>, cli: Array<string>) {
    this.cli = cli;
    this.tokens = tokens;
    this.currentToken = this.position.currentCharacter(this.tokens);
  }

  /**
   * @public
   *
   * Initializes the parsing of tokens
   *
   * @returns The parser results
   */
  public parse = (): Array<Tokens<any>> => {
    while (this.currentToken != null) {
      if (this.currentToken.type == 'OPERATOR') {
        const nodes: Map<
          string,
          Tokens<any>
        > = this.performArithmeticOperations();
        const arithmetic: ParserResult = new ArithmeticOperations(
          nodes,
          this.currentToken
        ).createResult();

        if (arithmetic.error) {
          const exception = new PepperMintException({
            message: arithmetic.error,
            line: this.lineNumber,
          });
        }

        this.parserTokens.push({
          token: arithmetic.token,
          type: String(typeof arithmetic.result).toUpperCase(),
          position: {start: this.currentToken.position.start - 1},
        });
      } else if (this.currentToken.type == 'NEWLINE') {
        this.parserTokens.push(this.currentToken);
        this.lineNumber += 1;
      } else if (this.currentToken.type == 'builtin') {
        this.executeBuiltins(this.currentToken);
      }

      this.position.increment(1);
      this.currentToken = this.position.currentCharacter(this.tokens);
    }

    return this.parserTokens;
  };

  private performArithmeticOperations = (): Map<string, Tokens<any>> => {
    this.position.decrement(1);
    const prev = this.position.currentCharacter(this.tokens);
    this.position.increment(2);
    const next = this.position.currentCharacter(this.tokens);
    this.position.decrement(1);
    return new Map<string, Tokens<any>>([
      ['prev', prev],
      ['next', next],
    ]);
  };

  private executeBuiltins = (functionName: Tokens<any>): void => {
    const func = String(functionName.token).split(':');
    if (func[0] == 'exit') {
      // process.exit()
    } else if (func[0] == 'env') {
      const key = func[1];
      let element: NodeJS.ProcessEnv | string | undefined = process.env;
      if (key) {
        element = process.env[key];
      }
      element = element ? element : 'None';
      console.log(element);
    } else if (func[0] == "argv") {
      let element:Array<string> | string | undefined | PepperMintNull = undefined
      if(func[1]){
        element = parseInt(func[1])!= NaN ? this.cli[parseInt(func[1])] : this.cli
      } else {
        element = this.cli
      }
      element = element ? element : new PepperMintNull()
      console.log(element)
    }
    console.log(func)
  };
}
