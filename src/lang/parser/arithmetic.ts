import {PepperMintException} from '../../exceptions/exception';
import {Tokens} from '../lexer';
import {ParserResult} from './result';

export class ArithmeticOperations {
  private nodes: Map<string, Tokens<any>>;
  private operation: Tokens<string>;

  constructor(nodes: Map<string, Tokens<any>>, operation: Tokens<any>) {
    this.nodes = nodes;
    this.operation = operation;
  }

  public createResult = (): ParserResult => {
    let evaluateString: string = '';
    const prev = this.nodes.get('prev');
    const next = this.nodes.get('next');

    if (!prev?.identifier) {
      evaluateString += prev?.token;
    }

    evaluateString += this.operation.token;

    if (!next?.identifier) {
      evaluateString += next?.token;
    }

    let result: ParserResult = {token: []};

    try {
      const evalResult = eval(evaluateString);
      result.result = evalResult;
      result.token = [result.result];
    } catch (mathException: any) {
      result.error = mathException.message;
    }

    return result;
  };
}
