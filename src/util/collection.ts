import { Tokens } from '../lang/lexer'

export class VariableCollection {
    private collection:Map<string, Tokens<any>> = new Map<string, Tokens<any>>([]);
    private length:number = 0

}