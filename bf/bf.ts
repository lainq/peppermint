/**
 *
 * @author @pranavbaburaj and @coocos
 * @version 1.0.0
 * @description This file contains the modified version of brainf**k interpreter
 * written by @coocos
 *
 */

import {instructions} from './constants';

// the instructions in the bf language
type Instruction = '+' | '-' | '>' | '<' | '[' | ']' | '.' | ',';

export interface Bf {
  // the memory cells
  cells: Uint8Array;
  // contaisn the memory index and
  // the data
  pointers: {
    instructions: number;
    data: number;
  };

  // contains the array of tokens(Instructions)
  // from the source code
  program: Instruction[];
  jumps: Jumps;

  // the string to output to the screen
  output: string;

  // a boolean if the process is
  // finished or not(Checks if the program
  // reached the end of the file)
  done: boolean;
}

interface Jumps {
  [jump: number]: number;
}

function mapJumps(program: Instruction[]): Jumps {
  const jumps: Jumps = {};
  const brackets: number[] = [];

  program.forEach((instruction: Instruction, address: number) => {
    if (instruction === '[') {
      brackets.push(address);
    } else if (instruction === ']') {
      const start = brackets.pop();
      if (start !== undefined) {
        jumps[start] = address;
        jumps[address] = start;
      }
    }
  });

  return jumps;
}

/**
 * The parse functions takes in the source code
 * and splits it into an array of bf tokens
 *
 * @param program The source code in the form of string
 * @returns {Instruction[]} The source code tokenised into
 * an array of istructions
 */
function parse(program: string): Instruction[] {
  return program
    .split('')
    .filter((token) => /[\[\].,<>+-]/.test(token)) as Instruction[];
}

/**
 * Creates a Bf object out of the string source code
 *
 * @param source The source code
 * @returns {Bf}
 */
export function load(source: string): Bf {
  const program = parse(source);
  const jumps = mapJumps(program);
  return {
    cells: new Uint8Array(30_000),
    program,
    pointers: {
      data: 0,
      instructions: 0,
    },
    jumps,
    output: '',
    done: false,
  };
}

export const step = (system: Bf): any => {
  if (system.pointers.instructions >= system.program.length) {
    system.done = true;
    return;
  }
  const instruction = system.program[system.pointers.instructions];
  const func: Function | undefined = instructions.get(instruction);
  if (func) {
    func(system);
  }
};

export class BfInterpreter {
  /**
   * @public
   * @static
   *
   * Execute the source code
   *
   * @param {string} source The source code
   */
  public static execute = (source: string) => {
    const system: Bf = load(source);
    while (!system.done) {
      step(system);
    }

    console.log(system.output);
  };
}
