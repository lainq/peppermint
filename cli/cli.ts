import { argv } from "process";

export class PepperMintCli {
    private readonly arguments:Array<string>;
    private readonly length:number;

    private position:number = 0;

    constructor(args?:Array<string>) {
        this.arguments = args == undefined ? argv : args
        this.length = this.arguments.length
    }

    public parseCommandArguments = ():void | null => {
        let current:string | null = this.currentArgument()
        while(current != null){
            if(current == "new"){
                console.log(this.position)
            }
            this.position += 1
            current = this.currentArgument()
        }
    }

    private currentArgument = ():string | null => {
        if(this.length == this.position){
            return null
        } else {
            return this.arguments[this.position]
        }
    }
}