import {PepperMintCli} from '../cli/cli';

export const PEPPERMINT_VERSION = "0.0.1"
export const keywords: Array<string> = ['let'];

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
