import { PepperMintProject } from "./project/init"

export const commands:Map<string, Array<string>> = new Map<string, Array<string>>([
    ["init", ["name", "config", "license", "author"]]
])


export const performCommand = (command:string, params:Map<string, string>) => {
    if(command == "init"){
        const project:PepperMintProject = new PepperMintProject(params)
    }
}