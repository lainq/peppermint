import { LexerPosition } from "./position";

interface TokenPosition {
    start : number;
    stop? : number;
}

export interface Tokens<TokenType> {
    token : TokenType
    type : string
    position : TokenPosition
}

export class PepperMintLexer {
    private tokens:Array<Tokens<any>> = new Array();
    private position:LexerPosition = new LexerPosition(0)

    private data:string
    private filename:string
    private lineNumber:number = 1

    constructor(source:string, filename:string) {
        this.data = source
        this.filename = filename
    }

    public generateTokens = () => {
        let character:string | null = this.position.curentCharacter(this.data)
        while(character != null) {
            if(character == "\n"){
                this.tokens.push({
                    token : character,
                    type : "NEWLINE",
                    position : {start:this.position.position}
                })
                this.lineNumber += 1
            } else if(character == " "){
                this.tokens.push({
                    token : character,
                    type : "SPACE",
                    position : {start:this.position.position}
                })
            }

            this.position.increment(1)
            character = this.position.curentCharacter(this.data)
        }

        return this.tokens
    }
}