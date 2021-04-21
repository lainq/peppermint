import { LexerPosition } from "./position";


interface Tokens<TokenType> {
    token : TokenType
    type : string;
}

export class PepperMintLexer {
    private tokens:Array<Tokens<any>> = new Array();
    private position:LexerPosition = new LexerPosition(0)

    private data:string

    constructor(source:string) {
        this.data = source

        console.log(this.data)
    }
}