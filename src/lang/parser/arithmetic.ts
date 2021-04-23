import { Tokens } from "../lexer";

export class ArithmeticOperations {
    private nodes:Map<string, Tokens<any>>
    private operation:Tokens<string>

    constructor(nodes:Map<string, Tokens<any>>, operation:Tokens<any>){
        this.nodes = nodes
        this.operation = operation
    }
}