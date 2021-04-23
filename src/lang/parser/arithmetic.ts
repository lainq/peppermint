import { Tokens } from "../lexer";

export class ArithmeticOperations {
    private nodes:Map<string, Tokens<any>>
    private operation:Tokens<string>

    constructor(nodes:Map<string, Tokens<any>>, operation:Tokens<any>){
        this.nodes = nodes
        this.operation = operation
    }

    public createResult = ():any => {
        let evaluateString:string = ""
        const prev = this.nodes.get("prev")
        const next = this.nodes.get("next")

        if(!prev?.identifier){
            evaluateString += prev?.token
        } 

        evaluateString += this.operation.token

        if(!next?.identifier){
            evaluateString += next?.token
        }

        try {
            const result = eval(evaluateString)
            console.log(result)
        } catch(mathException:any){
            console.log(mathException.stack)
        }
    
        return evaluateString
    }
}