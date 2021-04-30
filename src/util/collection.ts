import { TokenPosition, Tokens } from '../lang/lexer'


interface VariableCollectionOptions {
    variableName : string,
    variableType : string;
    variableValue : any;
    position : TokenPosition
}

export class VariableCollection {
    private collection:Map<string, VariableCollectionOptions> = new Map<string, VariableCollectionOptions>([]);
    private length:number = 0

    public createNewAssignment = (name, variable:Tokens<any>) => {
        const data:VariableCollectionOptions = {
            variableName : name,
            variableType : variable.type,
            variableValue : variable.token,
            position : variable.position
        }
        const exists = this.collection.get(data.variableName) == undefined
    }
}