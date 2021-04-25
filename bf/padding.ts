class OutputPadding {
    static paddingLine = (string:string, size:number, side:string):string => {
        for(let index=0; index<size; index++){
            if(side == "left"){
                string = " " + string
            } else {
                string = string + " "
            }
        }
        return string
    }

    static paddingNumber = (number:string, size:number) => {
        let string:string = number + "";
        while(string.length < size) {
            string = "0" + string
        }
        return string
    }

    /**
     * 
     * Function for multiplying symbols. 
     * Helps when we have multiple inc/dec 
     * Brainfuck commands and use ADD/SUB 
     * rather than INC/DEC op-codes.
     * 
     * @param character 
     * @param num 
     * @returns 
     */
    static createMultipleCharacters = (character:string, num:number) => {
        let string:string = '';
        for (let i = 0; i < num; i++) string += character;
        return string;
    }
}



// 
// 
