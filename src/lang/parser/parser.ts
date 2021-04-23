import { Tokens } from "../lexer";
import { LexerPosition } from "../position";

export class PepperMintParser {
    private tokens:Array<Tokens<any>>;
    private position:LexerPosition = new LexerPosition(0)

    private parserTokens:Array<any> = [];

    private currentToken:Tokens<any>

    constructor(tokens:Array<Tokens<any>>){
        this.tokens = tokens
        this.currentToken = this.position.currentCharacter(this.tokens)
    }

    public parse = () => {
        while(this.currentToken != null){
            console.log(this.currentToken)
            if(this.currentToken.type == "OPERATOR"){
                const nodes = this.performArithmeticOperations()
            }

            this.position.increment(1)
            this.currentToken = this.position.currentCharacter(this.tokens)
        }
    }

    private performArithmeticOperations = () => {
        this.position.decrement(1)
        const prev = this.position.currentCharacter(this.tokens)
        this.position.increment(2)
        const next = this.position.currentCharacter(this.tokens)
        console.log(prev, next)
    }
}