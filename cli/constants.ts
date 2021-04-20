import { PepperMintProject } from "./project/init"

// the list of all the cli commands
// along with the list of flags associated
// with the command
export const commands:Map<string, Array<string>> = new Map<string, Array<string>>([
    ["init", ["name", "license", "author"]]
])

/**
 * @param command The command to execute
 * @param params The params passed in
 */
export const performCommand = (command:string, params:Map<string, string>) => {
    if(command == "init"){
        const project:PepperMintProject = new PepperMintProject(params)
    }
}