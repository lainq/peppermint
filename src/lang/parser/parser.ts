import { Tokens } from "../lexer";
import { LexerPosition } from "../position";
import { ArithmeticOperations } from "./arithmetic";

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
                const nodes:Map<string, Tokens<any>> = this.performArithmeticOperations()
                const arithmetic = new ArithmeticOperations(nodes, this.currentToken).createResult()

                console.log(arithmetic)
            }

            this.position.increment(1)
            this.currentToken = this.position.currentCharacter(this.tokens)
        }
    }

    private performArithmeticOperations = ():Map<string, Tokens<any>> => {
        this.position.decrement(1)
        const prev = this.position.currentCharacter(this.tokens)
        this.position.increment(2)
        const next = this.position.currentCharacter(this.tokens)
        this.position.decrement(1)
        return new Map<string, Tokens<any>>([
            ["prev", prev],
            ["next", next]
        ])
    }
}