import { commands } from "../constants";

export interface ProjectConfig {
    projectName : string
    directory : string
    license? : string
    author? : string
    entryPoint : string
}

export class PepperMintProject {
    private params:Map<string, string>;
    private requiredParams:Array<string> | undefined = commands.get("init")
    // private config:ProjectConfig

    constructor(params:Map<string, string>){
        this.params = params

        if(this.requiredParams){
            const promptQueries = PepperMintProject.reduceFromArray(
                this.requiredParams, Array.from(this.params.keys())
            )
            console.log(promptQueries)
        } else {
            process.exit()
        }
    }

    public static reduceFromArray = (array:Array<any>, remove:Array<any>) => {
        let returnValue:Array<any> = new Array()
        for(let idx=0; idx<array.length; idx++){
            if(!remove.includes(array[idx])){
                returnValue.push(array[idx])
            }
        }

        return returnValue
    }
}