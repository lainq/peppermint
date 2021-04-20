import { existsSync, readdirSync, statSync } from "fs"
import { join } from "path"
import { cwd } from "process"
import { PepperMintException } from "../../src/exceptions/exception"

export interface ProjecConfig {
    name? : string
    license? : string
    author? : string
    path? : string
}

export class GenerateProject {
    private config:ProjecConfig
    
    constructor(config:ProjecConfig) {
        this.config = config

        if(!this.config.name){
            const exception = new PepperMintException({
                message : "--name is a required flag for init"
            }).throwException(true)
        }

        this.config.path = this.findProjectPath(this.config.name)
        if(this.config.path){
            console.log(this.verifyProjectFolder(this.config.path))
        }
    }

    private findProjectPath = (name:string | undefined):string | undefined => {
        if(name){
            if(name == "."){
                return cwd()
            } else {
                return join(cwd(), name)
            }
        } else {
            return name
        }
    }

    private verifyProjectFolder = (path:string):boolean => {
        if(this.fileExists(path)){
            if(statSync(path).isDirectory()){
                const files = readdirSync(path)
                return files.length == 0
            }
        }

        return true
    }

    private fileExists = (name:string):boolean => {
        try {
            return existsSync(name)
        } catch(exception) {
            return false
        }
    }
}