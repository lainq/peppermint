import {stdin, stdout} from 'process';
import {createInterface, Interface} from 'readline';
import {colours, throwColoredText} from '../modules/colors';
import {Bf} from './bf';

// all the instructions corresponding to the command
export const instructions: Map<string, Function> = new Map<string, Function>([
  [
    '+',
    (system: Bf) => {
      system.cells[system.pointers.data]++;
      system.pointers.instructions++;
    },
  ],
  [
    '-',
    (system: Bf) => {
      system.cells[system.pointers.data]--;
      system.pointers.instructions++;
    },
  ],
  [
    '>',
    (system: Bf) => {
      system.pointers.data++;
      system.pointers.instructions++;
    },
  ],
  [
    '<',
    (system: Bf) => {
      system.pointers.data--;
      system.pointers.instructions++;
    },
  ],
  [
    '.',
    (system: Bf) => {
      system.output += String.fromCharCode(system.cells[system.pointers.data]);
      system.pointers.instructions++;
    },
  ],
  [
    '[',
    (system: Bf) => {
      if (system.cells[system.pointers.data] === 0) {
        system.pointers.instructions =
          system.jumps[system.pointers.instructions];
      }
      system.pointers.instructions++;
    },
  ],
  [
    ']',
    (system: Bf) => {
      if (system.cells[system.pointers.data] !== 0) {
        system.pointers.instructions =
          system.jumps[system.pointers.instructions];
      }
      system.pointers.instructions++;
    },
  ],
  [
    ',',
    (system: Bf) => {
      const rl: Interface = createInterface({
        input: stdin,
        output: stdout,
      });
      return new Promise<void>((resolve) => {
        rl.question(throwColoredText(colours.fg.yellow, '> '), (input) => {
          system.cells[system.pointers.data] = input.charCodeAt(0);
          system.pointers.instructions++;
          rl.close();
          resolve();
        });
      });
    },
  ],
]);
