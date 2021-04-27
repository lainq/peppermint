import { LexerPosition } from "../src/lang/position"
import { Instruction, parse } from "./bf"

export class BfLongCompiler {
    private source:string
    private tokens:Array<Instruction>
    private position:LexerPosition = new LexerPosition(0)

    private longTokens:Array<any> = new Array(1).fill(0);
    private longIndex:number = 0

    constructor(source:string){
        this.source = source
        this.tokens = parse(this.source)

        this.convertLong()
    }

    private convertLong = ():void | null => {
        let character:Instruction | null = this.position.currentCharacter(this.tokens)
        while(character != null){
            const command = this.createTokens()
            
            this.position.increment(1)
            character = this.position.currentCharacter(this.tokens)
        }

        console.log(this.longTokens)
    } 

    private createTokens = (character:Instruction | null):void => {
        if(character == "+"){
            this.longTokens[this.longIndex] += 1
        } else if(character == "-"){
            this.longTokens[this.longIndex] -= 1
        } else if(character == "<"){
            if(this.longIndex != 0){
                this.longIndex -= 1
            }
        } else if(character == ">"){
            this.longIndex += 1
            if(!this.longTokens[this.longIndex]){
                this.longTokens[this.longIndex] = 0
            }
        } 
    }
}