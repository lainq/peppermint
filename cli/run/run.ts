import { readdirSync, readFile, readFileSync } from "fs";
import { exception } from "node:console";
import { join } from "path";
import { cwd } from "process";
import { PepperMintException } from "../../src/exceptions/exception";

export const run = (file:string) => {
    readFile(file, (error:NodeJS.ErrnoException | null, data:Buffer) => {
        if(error) {
            const exception = new PepperMintException({
                message : error.message
            }).throwException(true)
        } else {
            // const tokens = new PepperMintLexer(data.toString())
            console.log(data.toString())
        }
    })
}

export class PepperMintExecutor {
    private source:string | undefined;

    constructor(source:string | undefined){
        this.source = source ? source : this.findProjectMain()
        console.log(this.source)
    }

    private findProjectMain = ():string | undefined => {
        const peppermint = readdirSync(cwd()).includes(".peppermint")
        if(peppermint){
            const data:Buffer = readFileSync(join(cwd(), ".peppermint"))
            try {
                const config = JSON.parse(data.toString())
                if(!config.main){
                    const exception = new PepperMintException({
                        message : "Cannot find entry point",
                        suggestion : "Try filling out the main field in peppermint file with the source file"
                    }).throwException(false)
                    return undefined
                }

                return String(config.main)
            } catch(exception){
                console.log(exception)
                const error = new PepperMintException({
                    message : ".peppermint not a valid config file",
                    suggestion : "Try creating a project using the peppermint cli"
                }).throwException(false)
                return undefined
            }
        } else {
            const exception = new PepperMintException({
                message : "Cannot find peppermint config files"
            }).throwException(false)
            return undefined
        }
        return undefined
    }
}