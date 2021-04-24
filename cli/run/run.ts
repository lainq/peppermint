import {readdirSync, readFile, readFileSync} from 'fs';
import {join} from 'path';
import {cwd} from 'process';
import {PepperMintException} from '../../src/exceptions/exception';
import {PepperMintLexer, Tokens} from '../../src/lang/lexer';
import {PepperMintParser} from '../../src/lang/parser/parser';

/**
 * Run a peppermin source
 * @param {string} file The file to run
 */
export const run = (file: string, cli:Array<string>) => {
  readFile(file, (error: NodeJS.ErrnoException | null, data: Buffer) => {
    if (error) {
      const exception = new PepperMintException({
        message: error.message,
      }).throwException(true);
    } else {
      const tokens: Array<Tokens<any>> = new PepperMintLexer(
        data.toString(),
        file
      ).generateTokens();
      console.log(tokens);
      const parser = new PepperMintParser(tokens, cli).parse();
      console.log(parser);
    }
  });
};

export class PepperMintExecutor {
  private source: string | undefined;

  /**
   * @constructor
   * @param {string | undefined} source The source parameter passed along
   * with the command in the command line
   */
  constructor(source: string | undefined, cli:Array<string>) {
    this.source = source ? source : this.findProjectMain();
    if (this.source) {
      // if source files exists
      // run the source file
      run(this.source, cli);
    }
  }

  /**
   * @private
   *
   * Check the directory for peppermint config files(.peppermint)
   * if the file does not exist, throw an exception
   * else, read the file and try to convert it to json
   *
   * Get the entry point from the json file and
   * return the filename
   *
   * @returns {string | undefined} The path of the entry point or
   * undefined
   */
  private findProjectMain = (): string | undefined => {
    // Check if the peppermint config files exists
    // in the current working directory(cwd)
    const peppermint = readdirSync(cwd()).includes('.peppermint');
    if (peppermint) {
      // if the peppermint file exists
      // read the file and try to convert
      // it into json data
      const data: Buffer = readFileSync(join(cwd(), '.peppermint'));
      try {
        const config = JSON.parse(data.toString());
        if (!config.main) {
          const exception = new PepperMintException({
            message: 'Cannot find entry point',
            suggestion:
              'Try filling out the main field in peppermint file with the source file',
          }).throwException(false);
          return undefined;
        }

        // return the entry point field from the
        // json data
        return String(config.main);
      } catch (exception) {
        console.log(exception);
        const error = new PepperMintException({
          message: '.peppermint not a valid config file',
          suggestion: 'Try creating a project using the peppermint cli',
        }).throwException(false);
        return undefined;
      }
    } else {
      const exception = new PepperMintException({
        message: 'Cannot find peppermint config files',
      }).throwException(false);
      return undefined;
    }
    return undefined;
  };
}
