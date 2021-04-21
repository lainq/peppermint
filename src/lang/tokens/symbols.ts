// the operators allowed in the language
export const symbols: Array<string> = new Array('+', '-', '/', '*', '%');

// aqll the brackets will be mentioned here
export const brackets: Map<string, string> = new Map<string, string>([
  ['(', 'opening'],
  [')', 'closing'],
]);
