
export class LexerPosition {
    public position:number

    /**
     * @constructor
     * @param {number | undefined} position The position
     */
    constructor(position?:number){
        this.position = position ? position : 0
    }

    /**
     * @public
     * 
     * Increment the current position by the
     * parameter value
     * 
     * @param {number} incrementValue The value to add to the currebnt position
     */
    public increment = (incrementValue:number):void => {
        this.position += incrementValue
    }

    /**
     * @public
     * 
     * Decrement the current position by
     * incrementing the position by the 
     * negative of the parameter value
     * 
     * @param {number} decrementValue The value to decrement 
     */
    public decrement = (decrementValue:number):void => {
        this.increment(-decrementValue)
    }

    /**
     * @public
     * 
     * If the position is the end of the string
     * return null . Else, return the character of
     * the string at the current index
     * 
     * @param {string} data The data string
     * @returns {string | null} The current character or null
     */
    public curentCharacter = (data:string):string | null => {
        if(data.length == this.position){
            return null
        } else {
            return data[this.position]
        }
    }
}