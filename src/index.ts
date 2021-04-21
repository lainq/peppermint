import { readFile } from 'fs';
import {PepperMintCli} from '../cli/cli';
import { PepperMintException } from './exceptions/exception';
import { PepperMintLexer } from './lang/lexer';

// initialize the peppermint cli arg parser
// to parse the command line arguments passed
// in along with the application

// The first two elements are sliced from the
// list of arguments
// The first argument after the executable name
// is considered to be the command and the rest of them
// are considered to be the flags
// Example : <executable> run --flag-1=flag-value --flag-2=value
const args: PepperMintCli = new PepperMintCli(process.argv.slice(2));


export const run = (file:string) => {
    readFile(file, (error:NodeJS.ErrnoException | null, data:Buffer) => {
        if(error) {
            const exception = new PepperMintException({
                message : error.message
            }).throwException(true)
        } else {
            const tokens = new PepperMintLexer(data.toString())
        }
    })
}