import { PepperMintException } from "../../exceptions/exception";
import { Tokens } from "../lexer";

// the parser result interface which is returnred
// from specific functiobs related to the parses
export interface ParserResult {
    result? : any;
    token : Array<any>,
    error? : string 
}