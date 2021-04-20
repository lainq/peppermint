import { stdin, stdout } from "process";
import { createInterface, Interface } from "readline";
import { colours, throwColoredText } from "../../modules/colors";

const readline:Interface = createInterface({
    input : stdin,
    output : stdout
})

export class PepperMintPrompt {
    private promptOptions:Array<string>

    constructor(options:Array<string>) {
        this.promptOptions = options
    }

    public createConsolePrompt = () => {
        let solutions:Map<string, string> = new Map<string, string>();
        for(let index=0; index<this.promptOptions.length; index++){
            const query:string = this.promptOptions[index]
            readline.question(throwColoredText(colours.fg.cyan, `${query} [?]`), (answer:string) => {
                solutions.set(query, answer)

                readline.close()
            })
        }
    }
}