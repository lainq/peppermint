import { LexerPosition } from "../position"

export class PepperMintIdentifier {
    private data:string
    private position:LexerPosition

    private start:number

    constructor(data:string, position:LexerPosition){
        this.data = data
        this.position = position
        this.start = this.position.position
    }

    public findIdentifier = () => {
        
    } 
}