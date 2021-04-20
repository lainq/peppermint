import { PepperMintCli } from "../cli/cli";

const args:PepperMintCli = new PepperMintCli(process.argv.slice(2))
args.parseCommandArguments()
