import {PepperMintException} from '../../exceptions/exception';
import {Tokens} from '../lexer';

// the parser result interface which is returnred
// from specific functiobs related to the parses
export interface ParserResult {
  // the token result
  result?: any;

  // the token array
  token: Array<any>;

  // the errors while evaluating the input
  error?: string;
}
