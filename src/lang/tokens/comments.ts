import { LexerPosition } from "../position"

export class PepperMintComment {
    private data:string
    private position:LexerPosition

    constructor(data:string, pos:LexerPosition){
        this.data = data
        this.position = pos
    }

    public createComment = ():number => {
        let character = this.position.curentCharacter(this.data)
        let hashes = 0
        while(character != null){
            if(character == "#"){
                hashes += 1
            }

            if(hashes == 2){
                break
            }

            this.position.increment(1)
            character = this.position.curentCharacter(this.data)
        }

        return this.position.position
    }
}