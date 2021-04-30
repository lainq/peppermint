import { colours, throwColoredText } from "../../modules/colors";

export class PepperMintRuntimeError {
    private readonly message:string;

    constructor(readonly msg:string) {
        this.message = msg;
    }

    public raiseException(file:string, line:number){
        console.log(throwColoredText(colours.fg.red, this.message))
        console.log(throwColoredText(colours.fg.red, `In ${file} at line ${line}`))

        process.exit()
    }
}