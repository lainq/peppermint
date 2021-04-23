import { Tokens } from "../lexer";

// the parser result interface which is returnred
// from specific functiobs related to the parses
export interface ParserResult {
    result : any;
    token : Tokens<any>
}