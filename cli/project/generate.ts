import {existsSync, readdirSync, statSync} from 'fs';
import {join} from 'path';
import {cwd} from 'process';
import {PepperMintException} from '../../src/exceptions/exception';

export interface ProjecConfig {
  name?: string;
  license?: string;
  author?: string;
  path?: string;
}

export class GenerateProject {
  private config: ProjecConfig;

  /**
   * @constructor
   * @param {ProjecConfig} config The project configuration information
   */
  constructor(config: ProjecConfig) {
    this.config = config;

    if (!this.config.name) {
      const exception = new PepperMintException({
        message: '--name is a required flag for init',
      }).throwException(true);
    }

    this.config.path = this.findProjectPath(this.config.name);
    if (this.config.path) {
      console.log(this.verifyProjectFolder(this.config.path));
    }
  }

  /**
   * @private
   *
   * Find the path of the project
   * based on the name of the project
   *
   * @param name The name of the project
   * @returns {string  | undefined}
   */
  private findProjectPath = (name: string | undefined): string | undefined => {
    if (name) {
      if (name == '.') {
        return cwd();
      } else {
        return join(cwd(), name);
      }
    } else {
      return name;
    }
  };

  /**
   * @private
   *
   * Check if the path exists and the path is a directory
   * if yes, proceed to check the length of the file content
   * return true if the directory is empty, else false
   *
   * @param path The path to verify
   * @returns {boolean} Whether the directory is a valid directory
   * to create the new project or not
   */
  private verifyProjectFolder = (path: string): boolean => {
    if (this.fileExists(path)) {
      if (statSync(path).isDirectory()) {
        const files = readdirSync(path);
        return files.length == 0;
      }
    }

    return true;
  };

  /**
   * @private
   *
   * Check if a path exists or not
   *
   * @param name The path to check
   * @returns {boolean} The path exists or not
   */
  private fileExists = (name: string): boolean => {
    try {
      return existsSync(name);
    } catch (exception) {
      return false;
    }
  };
}
