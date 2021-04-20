import { colours, throwColoredText } from "../../modules/colors";

export interface PepperMintErrorParams {
    message :string;
    suggestion? :string;
    file? : string;
    line? : number;
}

export class PepperMintException {
    private readonly message:string;
    private readonly suggestion:string | undefined ;
    private file:string | undefined;
    private line:string | undefined;

    constructor(params:PepperMintErrorParams){
        this.message = params.message;
        this.suggestion = params.suggestion;
        this.file = (params.file == undefined) ? "" : `in ${params.file}`
        this.line = (params.line == undefined) ? "" : `at line ${params.line}`
    }

    public throwException(fatal:boolean){
        console.log(throwColoredText(colours.fg.red, this.message))
        if(this.file){
            console.log(throwColoredText(colours.fg.red, `${this.file} ${this.line}`))
        }
        if (this.suggestion){
            console.log(throwColoredText(colours.fg.green, this.suggestion))
        }

        if(fatal){
            process.exit()
        }
    }
}