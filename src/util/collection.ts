import { TokenPosition, Tokens } from '../lang/lexer'
import { PepperMintRuntimeError } from '../exceptions/runtime'

interface FileData {
    filename : string;
    lineNumber : number
}

interface VariableCollectionOptions {
    variableName : string,
    variableType : string;
    variableValue : any;
    position : TokenPosition
    file:FileData
}

export class VariableCollection {
    private collection:Map<string, VariableCollectionOptions> = new Map<string, VariableCollectionOptions>([]);
    private length:number = 0

    public createNewAssignment = (name, variable:Tokens<any>, file:FileData) => {
        const data:VariableCollectionOptions = {
            variableName : name,
            variableType : variable.type,
            variableValue : variable.token,
            position : variable.position,
            file : file
        }
        const exists = this.collection.get(data.variableName) == undefined
        if(exists) {
            const error = new PepperMintRuntimeError(`${name} already exists`).raiseException(
                file.filename, file.lineNumber
            )

        }

        this.collection.set(name, data)
    }

    public getVariableValue(name:string, file:FileData){
        const data = this.collection.get(name)
        if(!data){
            const exception = new PepperMintRuntimeError(
                `${name} not defined`
            ).raiseException(file.filename, file.lineNumber)
        }
        return data
    }
}