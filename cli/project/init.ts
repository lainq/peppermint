import { commands } from "../constants";
import { GenerateProject } from "./generate";
import { PepperMintPrompt } from "./prompt";

export class PepperMintProject {
    private params:Map<string, string>;
    private requiredParams:Array<string> | undefined = commands.get("init")
    // private config:ProjectConfig

    constructor(params:Map<string, string>){
        this.params = params

        if(this.requiredParams){
            const project = new GenerateProject({
                name : this.params.get("name"),
                author : this.params.get("author"),
                license : this.params.get("license")
            })
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