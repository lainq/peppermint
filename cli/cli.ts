import { argv } from "process";
import { PepperMintException } from "../src/exceptions/exception";

export class PepperMintCli {
    private readonly arguments:Array<string>;
    private readonly length:number;
    private command:string;

    private position:number = 0;

    /**
     * @constructor
     * @param {Array<string> | undefined} args The list of command arguments
     */
    constructor(args?:Array<string>) {
        this.arguments = args == undefined ? argv : args
        this.length = this.arguments.length

        if(this.length > 0){
            this.command = this.arguments[0]
            this.arguments = this.arguments.slice(1)
            this.length = this.arguments.length

            this.parseCommandArguments()
        } else {
            process.exit()
        }
    }

    /**
     * @public
     * 
     * parse all the command arguments and 
     * gather all the params by parsing through
     * the flags and values
     */
    public parseCommandArguments = ():void | null => {
        let current:string | null = this.currentArgument()
        let commandParams:Map<string, string> = new Map<string, string>();
        while(current != null){
            if(!current.startsWith("--")){
                const exception = new PepperMintException({
                    message : `Invalid flag - ${current} ❎`,
                    suggestion : "User -- in the beginning of the option"
                }).throwException(true)
            }

            const commandArguments = current.split("=")
            if(commandArguments.length != 2){
                const exception = new PepperMintException({
                    message : "Expected assignment 😦",
                    suggestion : "Try assigning values : --<flag>=<value>"
                }).throwException(true)
            }

            commandArguments[0] = commandArguments[0].slice(2)
            commandParams.set(commandArguments[0], commandArguments[1])
            this.position += 1
            current = this.currentArgument()
        }
        console.log(commandParams)
    }

    /**
     * @private
     * 
     * Get the current character or return null
     * if reached the end of the array
     * 
     * @returns {string | null} Current character or null
     */
    private currentArgument = ():string | null => {
        if(this.length == this.position){
            return null
        } else {
            return this.arguments[this.position]
        }
    }
}