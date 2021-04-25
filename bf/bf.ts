import * as readline from "readline";
import { instructions } from "./constants";

type Instruction = "+" | "-" | ">" | "<" | "[" | "]" | "." | ",";

export interface Bf {
  cells: Uint8Array;
  pointers: {
    instructions: number;
    data: number;
  };
  program: Instruction[];
  jumps: Jumps;
  output: string;
  done: boolean;
}

interface Jumps {
  [jump: number]: number;
}


function mapJumps(program: Instruction[]): Jumps {
  const jumps: Jumps = {};
  const brackets: number[] = [];

  program.forEach((instruction:Instruction, address:number) => {
    if (instruction === "[") {
        brackets.push(address);
      } else if (instruction === "]") {
        const start = brackets.pop();
        if (start !== undefined) {
          jumps[start] = address;
          jumps[address] = start;
        }
      }
  })
    
  return jumps;
}

function parse(program: string): Instruction[] {
  return program
    .split("")
    .filter(token => /[\[\].,<>+-]/.test(token)) as Instruction[];
}

export function load(source: string): Bf {
  const program = parse(source);
  const jumps = mapJumps(program);
  return {
    cells: new Uint8Array(30_000),
    program,
    pointers: {
      data: 0,
      instructions: 0
    },
    jumps,
    output: "",
    done: false
  };
}

export const step = (system: Bf): any => {
  if (system.pointers.instructions >= system.program.length) {
    system.done = true;
    return;
  }
  const instruction = system.program[system.pointers.instructions];
  const func:Function | undefined = instructions.get(instruction)
  if(func){
      func(system)
  }
}

export class BfInterpreter {
    static execute = (source:string) => {
        const system:Bf = load(source)
        while(!system.done) {
            step(system)
        }

        console.log(system.output)
    }
}

