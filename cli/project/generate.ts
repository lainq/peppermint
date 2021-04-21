import {existsSync, mkdirSync, readdirSync, statSync, writeFile} from 'fs';
import {join} from 'path';
import {cwd} from 'process';
import {PepperMintException} from '../../src/exceptions/exception';
import { PepperMintProjectStore } from './store';

export interface ProjectConfig {
  name?: string;
  license?: string;
  author?: string;
  path?: string;
}

export interface ProjectFiles {
  files : Map<string, string>;
  folders : Array<string>
} 

export class GenerateProject {
  private config: ProjectConfig;
  private files:ProjectFiles

  /**
   * @constructor
   * @param {ProjectConfig} config The project configuration information
   */
  constructor(config: ProjectConfig, files:ProjectFiles) {
    this.config = config;
    this.files = files

    if (!this.config.name) {
      const exception = new PepperMintException({
        message: '--name is a required flag for init',
      }).throwException(true);
    }

    this.config.path = this.findProjectPath(this.config.name);
    if (this.config.path) {
     if(this.verifyProjectFolder(this.config.path)){
       this.generateProjectFiles()
     } else {
       const exception = new PepperMintException({
         message : "Folder not suitable for a project",
         suggestion : "Try again with a different project name"
       }).throwException(true)
     }
    }
  }

  /**
   * @private
   * 
   * Generate all the directories and files
   * based on the constructor parameters
   * 
   * @returns {void | null}
   */
  private generateProjectFiles = ():void | null => {
    if(!this.config.path){
      return null
    }

    mkdirSync(this.config.path)
    this.files.folders.forEach((folder:string) => {
      if(!this.config.path){
        return null
      }
      mkdirSync(join(this.config.path, folder))
    })

    this.files.files.set(`.peppermint`, this.generateConfigFiles(this.config))
    Array.from(this.files.files.keys()).forEach((key:string) => {
      if(this.config.path){
        const data = this.files.files.get(key) || " "
        writeFile(join(this.config.path, key), data, (error:NodeJS.ErrnoException | null) => {
          if(error){
            const exception = new PepperMintException({
              message : error.message
            }).throwException(true)
          }
        })
      }
    })

    if(this.config.name && this.config.path){
      const store = new PepperMintProjectStore(
        this.config.name,
        this.config.path
      ).storeProjectInformation()
    }
  }

  private generateConfigFiles = (data:ProjectConfig):string => {
    return JSON.stringify({
      name : data.name,
      path : data.path,
      author : data.author || "",
      license : data.license || "",
      main : data.path ? join(data.path, "app.ppm") : ""
    }, undefined, 4)
  }

  /**
   * @private
   *
   * Find the path of the project
   * based on the name of the project
   *
   * @param name The name of the project
   * @returns {string  | undefined}
   */
  private findProjectPath = (name: string | undefined): string | undefined => {
    if (name) {
      if (name == '.') {
        return cwd();
      } else {
        return join(cwd(), name);
      }
    } else {
      return name;
    }
  };

  /**
   * @private
   *
   * Check if the path exists and the path is a directory
   * if yes, proceed to check the length of the file content
   * return true if the directory is empty, else false
   *
   * @param path The path to verify
   * @returns {boolean} Whether the directory is a valid directory
   * to create the new project or not
   */
  private verifyProjectFolder = (path: string): boolean => {
    if (this.fileExists(path)) {
      if (statSync(path).isDirectory()) {
        const files = readdirSync(path);
        return files.length == 0;
      }
    }

    return true;
  };

  /**
   * @private
   *
   * Check if a path exists or not
   *
   * @param name The path to check
   * @returns {boolean} The path exists or not
   */
  private fileExists = (name: string): boolean => {
    try {
      return existsSync(name);
    } catch (exception) {
      return false;
    }
  };
}
