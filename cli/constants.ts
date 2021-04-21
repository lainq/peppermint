import {PepperMintProject} from './project/init';
import { PepperMintProjectList } from './project/list';
import { PepperMintExecutor } from './run/run';

// the list of all the cli commands
// along with the list of flags associated
// with the command
export const commands: Map<string, Array<string>> = new Map<
  string,
  Array<string>
>([
  ['init', ['name', 'license', 'author']],
  ["list", []],
  ["run", ["file"]]
]);

/**
 * @param command The command to execute
 * @param params The params passed in
 */
export const performCommand = (
  command: string,
  params: Map<string, string>
) => {
  if (command == 'init') {
    const project: PepperMintProject = new PepperMintProject(params);
  } else if(command == "list"){
    const list: PepperMintProjectList = new PepperMintProjectList()
  } else if(command == "run"){
    const run:PepperMintExecutor = new PepperMintExecutor(params.get("file"))
  }
};
