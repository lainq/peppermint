import { existsSync, readFile, statSync } from "fs";
import { PepperMintException } from "../src/exceptions/exception";
import { BfInterpreter } from "./bf";
import { BfLongCompiler } from "./compiler";

export class RunBfInterpreter {
    private filename:string | undefined;
    private compiler:boolean;

    constructor(params:Map<string, string>){
        this.filename = params.get("file")
        this.compiler = ["true", "True", "TRUE"].includes(String(params.get("compile"))) ? true : false

        this.runBfSource()
    }

    private runBfSource = ():void | null => {
        if(!this.checkFileExistence(this.filename)){
            const exception = new PepperMintException({
                message : `${this.filename} - File not found`
            }).throwException(true)
        }

        if(this.filename) {
            readFile(this.filename, (error:NodeJS.ErrnoException | null, data:Buffer) => {
                if(error){
                    const exception = new PepperMintException({
                        message : error.message
                    }).throwException(true)
                }

                let source = data.toString()
                const compiler:BfLongCompiler | null = this.compiler ? new BfLongCompiler(source) : null
                const interpreter:any = BfInterpreter.execute(source)
            })
        }
    }

    private checkFileExistence = (filename:string | undefined):boolean => {
        if(!filename){
            return false
        }

        try {
            const exists = existsSync(filename)
            if(filename){
                return statSync(filename).isFile()
            } else {
                return exists
            }
        } catch(exception:any){
            return false
        }
    }
}