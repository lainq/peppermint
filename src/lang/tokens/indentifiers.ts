import { TokenPosition } from "../lexer"
import { LexerPosition } from "../position"

export const upper = [...Array(26)].map((_, y) => String.fromCharCode(y+65))
export const lower = upper.map((value:string) => {
    return value.toLowerCase()
})
export const alpha = Array.prototype.concat(upper, lower)
const numbers = Array.from(Array(10).keys()).map((number) => {
    return String(number)
})
export const LETTERS_DIGITS = Array.prototype.concat(alpha, numbers, ["_"])

export interface Identifier {
    identifierName : string
    isKeyword? : boolean
    position : TokenPosition
}

export class PepperMintIdentifier {
    private data:string
    private position:LexerPosition

    private start:number

    constructor(data:string, position:LexerPosition){
        this.data = data
        this.position = position
        this.start = this.position.position
    }

    public findIdentifier = ():Identifier => {
        let character:string | null = this.position.curentCharacter(this.data)
        let identifier = ""

        while(character != null && LETTERS_DIGITS.includes(character)){
            identifier += character

            this.position.increment(1)
            character = this.position.curentCharacter(this.data)
        }

        return {
            identifierName : identifier,
            position : {start:this.start, end:this.position.position}
        }
    } 
}