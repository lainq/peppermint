import {platform} from 'os';
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
  ['init', ['name', 'license', 'author']],
  ['list', []],
  ['run', ['file']],
  ['version', []],
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
  }
};
