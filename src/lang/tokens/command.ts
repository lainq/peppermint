import { colours, throwColoredText } from "../../../modules/colors"
import { LexerPosition } from "../position"

export const mentionCommands:Map<string, any> = new Map<string, any>([
    ["exit", (data:string | undefined) => {
        process.exit()
    }],
    ["filename", (filename:string | undefined) => {
    }]
])

export class PepperMintCommand {
    private data:string
    private position:LexerPosition
    private start:number

    private escapes:Array<string> = ["\n", "\r", " "]

    constructor(data:string, position:LexerPosition){
        this.data = data
        this.position = position
        this.start = this.position.position
    }

    public findCommand = () => {
        let character = this.position.curentCharacter(this.data)
        let command = ""
        while(character != null){
            if(this.escapes.includes(character)){
                break
            }

            command += character
            this.position.increment(1)
            character = this.position.curentCharacter(this.data)
        }

        return {
            command : command,
            position : this.position.position,
            start : this.start
        }
    }
}