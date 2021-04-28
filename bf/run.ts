import {existsSync, readFile, statSync} from 'fs';
import {PepperMintException} from '../src/exceptions/exception';
import {BfInterpreter} from './bf';
import {BfLongCompiler} from './compiler';

export class RunBfInterpreter {
  private filename: string | undefined;
  private compiler: boolean;

  /**
   * @constructor
   * @param {Map<string, string} params The parameters passed in along with
   * the command in the cli
   */
  constructor(params: Map<string, string>) {
    this.filename = params.get('file');
    this.compiler = ['true', 'True', 'TRUE'].includes(
      String(params.get('compile'))
    )
      ? true
      : false;

    this.runBfSource();
  }

  /**
   * @private
   *
   * Run the bf source after checking certain conditions
   * and making sure everything will work well
   *
   * @returns {void}
   */
  private runBfSource = (): void => {
    // Check if the file exists and also
    // check if the path is an actual file and
    // not a directory. If all conditions are
    // passed the file is read and executed
    if (!this.checkFileExistence(this.filename)) {
      const exception = new PepperMintException({
        message: `${this.filename} - File not found`,
      }).throwException(true);
    }

    // If filename exists, read the file and execute the
    // bf source using the bf interpreter
    if (this.filename) {
      readFile(
        this.filename,
        (error: NodeJS.ErrnoException | null, data: Buffer) => {
          if (error) {
            const exception = new PepperMintException({
              message: error.message,
            }).throwException(true);
          }

          let source = data.toString();
          const compiler: BfLongCompiler | null = this.compiler
            ? new BfLongCompiler(source)
            : null;
          const interpreter: any = BfInterpreter.execute(source);
        }
      );
    }
  };

  /**
   * @private
   *
   * Check if a path exists and also check if the path
   * is actually a file and not a directory
   *
   * @param {string | undefined} filename The path to check the existence
   * @returns {boolean} Returns a boolean whether the path exists and
   * that the path is actually a file
   */
  private checkFileExistence = (filename: string | undefined): boolean => {
    if (!filename) {
      return false;
    }

    try {
      const exists = existsSync(filename);
      if (filename) {
        return statSync(filename).isFile();
      } else {
        return exists;
      }
    } catch (exception: any) {
      return false;
    }
  };
}
