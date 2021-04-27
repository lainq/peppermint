import { mkdir, writeFile } from "fs"
import { join } from "path"
import { cwd } from "process"
import { PepperMintException } from "../src/exceptions/exception"
import { LexerPosition } from "../src/lang/position"
import { Instruction, parse } from "./bf"

interface Logs {
    currentValue : number;
}

interface CompilerOutput {
    filename? : Array<string>;
    compiled : string;
}

const createLongOutput = (output:CompilerOutput):void => {
    const filenames:Array<string> = output.filename ? output.filename : new Array("compiled")
    const directory = join(cwd(), "dist")
    mkdir(directory, (err:NodeJS.ErrnoException | null) => {
        if(err){
            const exception = new PepperMintException({
                message : `Cannot create dist folder in ${cwd()}`,
                suggestion : "Try deleting the dist directory",
            }).throwException(true)
        } 

        for(let index=0; index<filenames.length; index++){
            writeFile(join(
                directory, `${filenames[index]}.long`
            ), output.compiled, (error:NodeJS.ErrnoException | null) => {
                if(error){
                    const exception = new PepperMintException({
                        message : "Unable to write compiled file"
                    }).throwException(true)
                }
            })
        }
    })
}

export class BfLongCompiler {
    private source:string
    private tokens:Array<Instruction>
    private position:LexerPosition = new LexerPosition(0)

    private longTokens:Array<any> = new Array(1).fill(0);
    private longLogs:Array<Logs> = new Array()
    private longIndex:number = 0

    constructor(source:string){
        this.source = source
        this.tokens = parse(this.source)

        this.convertLong()
    }

    private convertLong = ():void | null => {
        let character:Instruction | null = this.position.currentCharacter(this.tokens)
        while(character != null){
            const command = this.createTokens(character)
            
            this.position.increment(1)
            character = this.position.currentCharacter(this.tokens)
        }

        createLongOutput({
            filename : ['test'],
            compiled : this.createCompiledString(this.longLogs)
        })
    } 

    private createCompiledString = (logs:Array<Logs>):string => {
        let compiled:string = ""
        let value = 0;
        for(let logIndex=0; logIndex<logs.length; logIndex++){
            const current = logs[logIndex]
            const difference = current.currentValue - value
            value = current.currentValue
            
            if(difference < 0){
                compiled += `${Math.abs(difference)}-`
            } else {
                compiled += `${difference}+`
            }
        }

        return compiled
    }

    private createTokens = (character:Instruction | null):void => {
        if(character == "+"){
            this.longTokens[this.longIndex] += 1
        } else if(character == "-"){
            this.longTokens[this.longIndex] -= 1
        } else if(character == "<"){
            if(this.longIndex != 0){
                this.longIndex -= 1
            }
        } else if(character == ">"){
            this.longIndex += 1
            if(!this.longTokens[this.longIndex]){
                this.longTokens[this.longIndex] = 0
            }
        } else if(character == "."){
            this.longLogs.push({
                currentValue : this.longTokens[this.longIndex],
            })
        }
    }
}