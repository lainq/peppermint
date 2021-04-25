import { stdin } from "node:process";
import { stdout } from "process";
import { createInterface, Interface } from "readline";
import { colours, throwColoredText } from "../modules/colors";

const readlineInterface:Interface = createInterface({
    input : stdin,
    output : stdout
})


export class BfInterpreter {
    private memory:Array<number> = new Array(30000);
    private cell:number = 1000;

    private position:number = 0;
    private output:string = "";
    private loopStack:Array<any> = new Array();

    private data:string;

    constructor(data:string){
        this.data = data
        this.memory.fill(0)
    }

    public interpret = () => {
        while(this.position < this.data.length){
            switch(this.data[this.position]){
                case "+" :
                    this.memory[this.cell] += 1
                    break
                case "-":
                    this.memory[this.cell] -= 1
                    break
                case ">":
                    this.cell += 1
                    break
                case "<":
                    this.cell -= 1
                    break
                case ".":
                if(![10, 13].includes(this.memory[this.cell])){
                    this.output += String.fromCharCode(this.memory[this.cell])
                } else {
                    stdout.write(this.output)
                    this.output = ""
                }
                break
                case ',':
                    readlineInterface.question(throwColoredText(colours.fg.yellow, ">"), (answer) => {
                        if(answer.length == 0){
                            process.exit()
                        } else {
                            this.memory[this.cell] = answer.charCodeAt(0)
                        }
                        readlineInterface.close()
                    })
                    break
                case '[':
                    if (this.memory[this.cell]) {
                            this.loopStack.push(this.position);
                    } else {
                        for (let k = this.position, j = 0; k < this.data.length; k++) {
                                this.data[k] == '[' && j++;
                                opcode[k] == ']' && j--;
                                if (j == 0) break;
                            }
                            if (j == 0) ip = k;
                            else {
                                puts("Unmatched loop");
                                return false;
                            }
                        }
                        break;
                    case ']':
                        ip = loopstack.pop() - 1;
                        break;
                    default:
                        break;
            }
            this.position += 1
        }
    }
}