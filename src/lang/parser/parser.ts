import { Tokens } from "../lexer";
import { LexerPosition } from "../position";

export class PepperMintParser {
    private tokens:Array<Tokens<any>>;
    private position:LexerPosition = new LexerPosition(0)

    private currentToken:string | null

    constructor(tokens:Array<Tokens<any>>){
        this.tokens = tokens
        this.currentToken = this.position.curentCharacter(this.tokens)
    }
}