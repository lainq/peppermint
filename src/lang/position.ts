
export class LexerPosition {
    public position:number

    constructor(position?:number){
        this.position = position ? position : 0
    }

    public increment = (incrementValue:number):void => {
        this.position += incrementValue
    }

    public decrement = (decrementValue:number):void => {
        this.increment(-decrementValue)
    }

    public curentCharacter = (data:string):string | null => {
        if(data.length == this.position){
            return null
        } else {
            return data[this.position]
        }
    }
}