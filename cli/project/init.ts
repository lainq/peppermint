import {commands} from '../constants';
import {GenerateProject} from './generate';
import {PepperMintPrompt} from './prompt';

export class PepperMintProject {
  private params: Map<string, string>;
  private requiredParams: Array<string> | undefined = commands.get('init');
  // private config:ProjectConfig

  /**
   * @constructor
   * @param {Map<string, string} params The map of parameters
   */
  constructor(params: Map<string, string>) {
    this.params = params;

    if (this.requiredParams) {
      const project = new GenerateProject({
        name: this.params.get('name'),
        author: this.params.get('author'),
        license: this.params.get('license'),
      });
    }
  }

  /**
   * @public
   * @static
   *
   * Subtracting a smaller array from a larger array
   * by removing the elements in the smaller array
   * from the larger array
   *
   * @param {Array<any>} array The array of content
   * @param {Array<any>} remove The array of elements to be removed
   * @returns {Array<any>} The new array
   */
  public static reduceFromArray = (array: Array<any>, remove: Array<any>) => {
    let returnValue: Array<any> = new Array();
    for (let idx = 0; idx < array.length; idx++) {
      if (!remove.includes(array[idx])) {
        returnValue.push(array[idx]);
      }
    }

    return returnValue;
  };
}
