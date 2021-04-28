import {platform} from 'os';
import {RunBfInterpreter} from '../bf/run';
import {throwColoredText, colours} from '../modules/colors';
import {PEPPERMINT_VERSION} from '../src/index';
import {PepperMintProject} from './project/init';
import {PepperMintProjectList} from './project/list';
import {PepperMintExecutor} from './run/run';

// the list of all the cli commands
// along with the list of flags associated
// with the command
export const commands: Map<string, Array<string>> = new Map<
  string,
  Array<string>
>([
  /**
   * name - The name of the project[required]
   * license - The project license[optional]
   * author - The author of the project[optional]
   */
  ['init', ['name', 'license', 'author']],
  ['list', []],
  /**
   * file - The file to run[optional]{default=Get the entry point file from
   * the current project}
   */
  ['run', ['file']],
  ['version', []],
  /**
   * file - The bf source file[required]
   * compiler - Whether to compile bf into long lang(
   * btw, long lang is an esoteric programming language
   * created by the @author @pranavbaburaj. The language is heavily
   * isnpired from bf
   * )
   */
  ['bf', ['file', 'compile']],
]);

/**
 * @param command The command to execute
 * @param params The params passed in
 */
export const performCommand = (
  command: string,
  params: Map<string, string>,
  cli: Array<string>
) => {
  if (command == 'init') {
    const project: PepperMintProject = new PepperMintProject(params);
  } else if (command == 'list') {
    const list: PepperMintProjectList = new PepperMintProjectList();
  } else if (command == 'run') {
    const run: PepperMintExecutor = new PepperMintExecutor(
      params.get('file'),
      cli
    );
  } else if (command == 'version') {
    console.log(
      throwColoredText(
        colours.fg.yellow,
        `Peppermint Version ${PEPPERMINT_VERSION}[${platform()}]`
      )
    );
  } else if (command == 'bf') {
    const bf = new RunBfInterpreter(params);
  }
};
